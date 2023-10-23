import mongoose from 'mongoose';

const busSchema = new mongoose.Schema({
	plate: String,
});

const roadSchema = new mongoose.Schema({
	code: {
		type: String,
		unique: true,
		required: true,
	},
	name: String,
	park1: { type: mongoose.Schema.Types.ObjectId, ref: 'BusPark' },
	park2: { type: mongoose.Schema.Types.ObjectId, ref: 'BusPark' },
	stops: [{ type: mongoose.Schema.Types.ObjectId, ref: 'BusStop' }],
	buses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Bus' }],
});

const busStopSchema = new mongoose.Schema({
	name: {
		type: String,
		unique: true,
		required: true,
	},
	roads: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Road' }],
	location: {
		type: { type: String, enum: ['Point'], required: true },
		coordinates: {
			type: [Number],
			required: true,
		},
	},
});

busStopSchema.index({ location: '2dsphere' }); // Index for geospatial queries

const busParkSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true,
	},
	roads: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Road' }],
	location: {
		type: { type: String, enum: ['Point'], default: 'Point' },
		coordinates: {
			type: [Number],
			required: true,
		},
	},
});

busParkSchema.index({ location: '2dsphere' }); // Index for geospatial queries

export const Bus = mongoose.model('Bus', busSchema);
export const BusPark = mongoose.model('BusPark', busParkSchema);
export const BusStop = mongoose.model('BusStop', busStopSchema);
export const Road = mongoose.model('Road', roadSchema);
