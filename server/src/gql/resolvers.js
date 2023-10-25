import { ApolloError } from 'apollo-server-express';
import 'dotenv/config';
import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';
import fetchBalance, {
	TopupCard,
	getCardProfileAsync,
	getCardTransactionsAsync,
} from '../routes/checkSafariBalance.js';
import { BusCard, BusPark, BusStop, Road, User } from './models/index.js';

const SECRET = process.env.ACCESS_TOKEN_SECRET;
const client = new OAuth2Client();

const resolvers = {
	Query: {
		getBalance: async (_, args) => {
			const { cardNumber } = args;
			const data = await fetchBalance(cardNumber);
			return {
				cardNumber,
				balance: data?.current_balance,
			};
		},
		getCardProfile: async (_, args) => {
			try {
				const data = await getCardProfileAsync(args.cardNumber);
				return data;
			} catch (error) {
				console.log(error);
			}
		},
		getClosestBusStop: async (_, { userLocation, destinationBusParkId }) => {
			// Find the destination BusPark to determine the roads that lead there

			// Find the closest BusStop using geospatial query
			const closestBusStop = await BusStop.findOne({
				location: {
					$nearSphere: {
						$geometry: {
							type: 'Point',
							coordinates: [userLocation.longitude, userLocation.latitude],
						},
					},
				},
			});

			if (!closestBusStop) {
				throw new Error('No nearby bus stops found.');
			}
			// console.log(closestBusStop);

			// Determine the roads that pass through the closest bus stop
			const roads = await Road.find({
				$or: [{ park1: destinationBusParkId }, { park2: destinationBusParkId }],
			});
			console.log({
				...closestBusStop._doc,
				location: {
					latitude: closestBusStop.location.coordinates[0],
					longitude: closestBusStop.location.coordinates[1],
				},
			});

			return {
				closestBusStop: {
					...closestBusStop._doc,
					location: {
						latitude: closestBusStop.location.coordinates[1],
						longitude: closestBusStop.location.coordinates[0],
					},
					id: closestBusStop._id,
				},
				roads,
			};
		},
		getBusParks: async () => {
			try {
				const busParks = await BusPark.find();
				return busParks;
			} catch (error) {
				throw new Error('Error fetching BusParks: ' + error.message);
			}
		},
		getRoad: async (_, args) => {
			const road = await Road.findById(args.id).populate([
				'park1',
				'park2',
				'stops',
			]);
			if (!road) throw new ApolloError('Not Found', '404');
			return road;
		},

		getRoads: async () => {
			try {
				const roads = await Road.find({}).populate(['park1', 'park2', 'stops']);

				return roads;
			} catch (error) {
				throw new Error('Error fetching Roads: ' + error.message);
			}
		},

		getBusStops: async () => {
			try {
				const busStops = await BusStop.find();
				return busStops;
			} catch (error) {
				throw new Error('Error fetching BusStops: ' + error.message);
			}
		},
		getCardTransactions: async (_, args, context) => {
			const transactions = await getCardTransactionsAsync({
				account_number: args?.input?.account_number,
				card_number: args?.input?.card_number,
			});
			return transactions?.reverse();
		},
	},
	Mutation: {
		addBalance: async (_, args) => {
			const data = await TopupCard(args.input);
			return data;
		},
		createBusPark: async (_, { input }) => {
			const newBusPark = new BusPark({
				name: input.name,
				location: {
					type: 'Point',
					coordinates: [input.location.latitude, input.location.longitude],
				},
				details: input?.details,
				pictures: input?.pictures,
			});
			const existingStops = await BusPark.find({
				location: {
					$nearSphere: {
						$geometry: {
							type: 'Point',
							coordinates: [input.location.latitude, input.location.longitude],
						},
						$maxDistance: 500, // Maximum distance in meters
					},
				},
			});
			if (existingStops.length > 0)
				throw new ApolloError('A park exists nearby', 400);

			try {
				const savedBusPark = await newBusPark.save();
				return savedBusPark;
			} catch (error) {
				throw new Error('Error creating BusPark: ' + error.message);
			}
		},

		createRoad: async (_, { input }) => {
			const newRoad = new Road({
				code: input.code,
				name: input.name,
				park1: input.park1,
				park2: input.park2,
				stops: input.busStopIds,
				fare: input.fare,
			});

			try {
				const savedRoad = await newRoad.save();
				await BusStop.updateMany(
					{ _id: { $in: input.busStopIds } },
					{ $push: { roads: savedRoad._id } }
				);
				return savedRoad;
			} catch (error) {
				throw new Error('Error creating Road: ' + error.message);
			}
		},

		createBusStop: async (_, { input }) => {
			const newBusStop = new BusStop({
				name: input.name,
				location: {
					type: 'Point',
					coordinates: [input.location.latitude, input.location.longitude],
				},
				details: input?.details,
				pictures: input?.pictures,
			});
			const existingStops = await BusStop.find({
				location: {
					$nearSphere: {
						$geometry: {
							type: 'Point',
							coordinates: [input.location.latitude, input.location.longitude],
						},
						$maxDistance: 50, // Maximum distance in meters
					},
				},
			});
			if (existingStops.length > 0)
				throw new ApolloError('A stop exists nearby', 400);

			try {
				const savedBusStop = await newBusStop.save();
				return savedBusStop;
			} catch (error) {
				throw new Error('Error creating BusStop: ' + error.message);
			}
		},
		updateRoad: async (_, { input }) => {
			const { roadId, addBusStops, removeBusStops } = input;

			try {
				// Find the Road to be updated
				const road = await Road.findById(roadId);

				if (!road) {
					throw new Error('Road not found.');
				}

				if (addBusStops) {
					// Add new BusStops to the Road
					await Road.updateOne(
						{ _id: roadId },
						{ $addToSet: { stops: { $each: addBusStops } } }
					);

					// Update the BusStops to reference the Road
					await BusStop.updateMany(
						{ _id: { $in: addBusStops } },
						{ $addToSet: { roads: roadId } }
					);
				}

				if (removeBusStops) {
					// Remove BusStops from the Road
					await Road.updateOne(
						{ _id: roadId },
						{ $pull: { stops: { $in: removeBusStops } } }
					);

					// Update the BusStops to remove the reference to the Road
					await BusStop.updateMany(
						{ _id: { $in: removeBusStops } },
						{ $pull: { roads: roadId } }
					);
				}

				// Fetch and return the updated Road
				const updatedRoad = await Road.findById(roadId);
				return updatedRoad;
			} catch (error) {
				throw new Error('Error updating Road: ' + error.message);
			}
		},
		loginUser: async (_, args, context) => {
			const { input } = args;
			const { email, photo, familyName, givenName, name, id } = input;
			console.log(args);
			if (!email && !id) throw new ApolloError('WRONG_CRED', '400');
			if (id) {
				try {
					// @ts-ignore
					const res = await User.findOneAndUpdate(
						{
							email: email,
							googleId: id,
						},
						{
							name: name,
							last_login: new Date(),
							givenName,
							familyName,
							photo,
						},
						{
							upsert: true,
							new: true,
							rawResult: true,
						}
					);
					const user = res.value;
					if (user?.active === false)
						throw new ApolloError('Account not active', 'INACTIVE');

					const accessToken = jwt.sign(
						{
							userId: user?.id,
							role: user?.role,
						},
						// @ts-ignore
						SECRET,
						{ expiresIn: '14d' }
					);

					return {
						token: accessToken,
						user: user?.toJSON(),
					};
				} catch (error) {
					console.log(error);
					throw new Error(error.message);
				}
			}

			throw new ApolloError('Only Google Login Now');
		},
		addCard: async (_, args, { userId }) => {
			const { input } = args;
			const response = await getCardProfileAsync(args.input.number);
			if (!response) throw new ApolloError('Card Does Not Exists');
			const user = await User.findById(userId);
			if (user) {
				const cardInfo = await BusCard.create({
					...args.input,
					...response,
					phone: input.phone,
					email: user.email,
				});
				return cardInfo;
			}
			return {
				...response,
				number: input.number,
				phone: input.phone,
				email: input.email,
			};
		},
	},
};

export default resolvers;
