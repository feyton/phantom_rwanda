import { ApolloServer } from 'apollo-server-express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import path from 'path';
import { Server } from 'socket.io';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import corsOptions from './configs/cors.js';
import i18n from './configs/i18n.js';
import connect from './configs/mongo.js';
import reqLogger from './configs/reqLogger.js';
import options, { customizationOptions } from './configs/swagger.js';
import logger from './configs/winston.js';
import handleResponse from './controllers/handleResponse.js';
import { AppDataSource } from './data-source.js';
import { context } from './gql/context.js';
import resolvers from './gql/resolvers.js';
import typeDefs from './gql/schema.js';
import { jwtMiddleWare } from './middlewares/authJwt.js';
import apiRouter from './routes/apiRouter.js';
import { BusRepository } from './simulateApp/models.js';
import Trip from './tripApp/models.js';
import errLogger from './utils/errorLogger.js';

const swaggerSpec = swaggerJSDoc(options);
const __dirname = path.resolve();

/* c8 ignore start */
const PORT = process.env.PORT || 5000;
/* c8 ignore next stop */
const app = express();
app.use(express.json({ limit: '30mb', extended: true }));
app.use(cors(corsOptions));
app.use(reqLogger);
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.urlencoded({ extended: true }));
app.use(i18n.init);
app.use(jwtMiddleWare);

app.use('/api/v1', apiRouter);

app.use(
	'/docs',
	swaggerUi.serve,
	swaggerUi.setup(swaggerSpec, customizationOptions, { explorer: true })
);

app.get('*', (req, res) => {
	/* c8 ignore next 4 */
	if (req.accepts()[0] === 'text/html') {
		return res.sendFile(path.join(path.resolve(), 'dist/index.html'));
	}
	handleResponse(res, 200, res.__('welcome'));
});

app.use(errLogger);

const server = new ApolloServer({
	typeDefs,
	resolvers,
	introspection: true,
	cache: 'bounded',
	context,
});

const io = new Server(server, {
	cors: {
		origin: '*',
		methods: ['GET', 'POST'],
		transports: ['websocket', 'polling'],
		credentials: true,
	},
	allowEIO3: true,
});
const onlineClients = new Set();

io.on('connection', (socket) => {
	const sendSize = (room) => {
		const size = io.sockets.adapter.rooms.get(room)?.size;
		if (size) {
			socket.to(room).emit('waiting_users', {
				size,
			});
		}
	};
	onlineClients.add(socket.id);
	io.emit('active_users', { active: onlineClients.size });
	socket.on('message', (data) => {
		io.emit('send', data);
	});
	socket.on('disconnect', () => {
		onlineClients.delete(socket.id);
		io.emit('active_users', { active: onlineClients.size });
	});
	socket.on('location_update', async (data) => {
		if (!data.id) {
			return;
		}
		let bus = await BusRepository.fetch(data.id);
		if (bus) {
			bus.location = {
				latitude: data.location.lat,
				longitude: data.location.lng,
			};
			bus.locationUpdated = new Date();
			bus.num = data.num;
			await BusRepository.save(bus);
		} else {
			bus = data.bus;
			return;
		}
		socket.to(data.bus.route.code).emit(data.location);
		io.to(data.bus.route.code).emit('location_update', {
			data: data.location,
			bus,
			id: data.id,
		});
	});
	socket.on('bus_stop', async (data) => {
		const { history, ...other } = data;
		io.emit('bus_stop', other);
		try {
			Trip.createAndSave({
				path: JSON.stringify(history),
				info: JSON.stringify(other),
			});
		} catch (error) {
			logger.error(error.message);
		}
	});
	socket.on('bus_alert', async (data) => {
		if (!data.id) {
			return;
		}
		let bus = await BusRepository.fetch(data.id);
		if (bus) {
			let passengers =
				bus.passengers +
				parseInt(data.boarded, 10) -
				parseInt(data.alighted, 10);
			if (passengers < 0) {
				passengers = 0;
			}
			if (passengers > bus.seats) {
				passengers = bus.seats;
			}
			bus.passengers = passengers || 0;
			await BusRepository.save(bus);
		} else {
			bus = {};
		}
		io.emit('bus_alert', { bus, id: data.id });
	});
	socket.on('finished', async (data) => {
		await BusRepository.remove(data.id);
		io.emit('bus_finished', {
			time: new Date(),
			bus: data.bus,
			id: data.id,
		});
	});
	socket.on('join_room', (data) => {
		socket.join(data.code);
		sendSize(data.code);
	});
	socket.on('leave_room', (data) => {
		socket.leave(data.code);
		sendSize(data.code);
	});
});

// SETUP SOCKET
server.start().then(() => {
	server.applyMiddleware({ app });
});

// TODO REFACTORING
AppDataSource.initialize()
	.then(async () => {
		connect
			.then(() => {
				logger.info('Postgres database connected');
				app.listen({ port: PORT }, () => {
					app.emit('started');
					logger.info(`app is listening on port ${PORT}`);
				});
			})
			.catch((e) => {
				console.log('Unable to connect to mongo');
				console.log(e);
			});
	})
	.catch((_error) => {
		/* c8 ignore next 6 */
		// eslint-disable-next-line no-console
		console.log(_error);
		logger.error(
			"The server couldn't be started. The psql database is not connected"
		);
	});

export default server;
