import mongoose from 'mongoose';

mongoose.set('toJSON', {
	virtuals: true,
	versionKey: false,
	transform: function (doc, ret) {
		delete ret._id;
	},
});

const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	phone: String,
	role: {
		type: String,
		required: true,
		default: 'user',
	},
	photo: {
		type: String,
		default:
			'https://res.cloudinary.com/feyton/image/upload/v1643272521/user_nophzu.png',
	},
	active: {
		type: Boolean,
		default: true,
	},
	last_login: Date,
	googleId: {
		required: true,
		type: String,
		unique: true,
	},
	givenName: String,
	familyName: String,
});

const busSchema = new mongoose.Schema({
	plate: String,
});

const roadSchema = new mongoose.Schema({
	code: {
		type: String,
		unique: true,
		required: true,
	},
	fare: Number,
	name: String,
	park1: { type: mongoose.Types.ObjectId, ref: 'BusPark' },
	park2: { type: mongoose.Types.ObjectId, ref: 'BusPark' },
	stops: [{ type: mongoose.Types.ObjectId, ref: 'BusStop' }],
	buses: [{ type: mongoose.Types.ObjectId, ref: 'Bus' }],
	details: String,
});

roadSchema.index({ park1: 1, park2: 1 }, { unique: true });

const BusCardSchema = new mongoose.Schema({
	number: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	phone: {
		type: String,
		required: true,
	},
	account_number: {
		type: String,
		required: true,
	},
	user: {
		type: mongoose.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	email: String,
});

BusCardSchema.index({ number: 1, user: 1 }, { unique: true });

const busStopSchema = new mongoose.Schema({
	name: {
		type: String,
		unique: true,
		required: true,
	},
	details: String,
	pictures: [String],
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

const busParkSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			unique: true,
		},
		details: String,
		pictures: [String],
		roads: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Road' }],
		location: {
			type: { type: String, enum: ['Point'], default: 'Point' },
			coordinates: {
				type: [Number],
				required: true,
			},
		},
	},
	{
		toJSON: {
			transform: function (doc, ret) {
				ret.location = {
					latitude: ret.location.coordinates[0],
					longitude: ret.location.coordinates[1],
				};
				delete ret._id;
			},
		},
		toObject: {
			transform: function (doc, ret) {
				
				delete ret._id;
			},
		},
	}
);

busParkSchema.index({ location: '2dsphere' }); // Index for geospatial queries

export const Bus = mongoose.model('Bus', busSchema);
export const BusPark = mongoose.model('BusPark', busParkSchema);
export const BusStop = mongoose.model('BusStop', busStopSchema);
export const Road = mongoose.model('Road', roadSchema);
export const User = mongoose.model('User', UserSchema);
export const BusCard = mongoose.model('BusCard', BusCardSchema);
