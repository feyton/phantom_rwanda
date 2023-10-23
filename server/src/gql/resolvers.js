import fetchBalance, { TopupCard } from '../routes/checkSafariBalance.js';
import { BusPark, BusStop, Road } from './models/BusPark.js';

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
		getClosestBusStop: async (_, { userLocation, destinationBusParkId }) => {
			// Find the destination BusPark to determine the roads that lead there
			const destinationBusPark = await BusPark.findById(destinationBusParkId);

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

			// Determine the roads that pass through the closest bus stop
			const roads = await Road.find({
				$or: [{ park1: destinationBusParkId }, { park2: destinationBusParkId }],
			});

			return { closestBusStop, roads };
		},
		getBusParks: async () => {
			try {
				const busParks = await BusPark.find();
				return busParks;
			} catch (error) {
				throw new Error('Error fetching BusParks: ' + error.message);
			}
		},

		getRoads: async () => {
			try {
				const roads = await Road.find({}).populate('park1');

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
			});
			const existingStops = await BusStop.find({
				location: {
					$nearSphere: {
						$geometry: {
							type: 'Point',
							coordinates: [input.location.latitude, input.location.longitude],
						},
						$maxDistance: 100, // Maximum distance in meters
					},
				},
			});
			console.log(existingStops);

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
			});

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
	},
};

export default resolvers;
