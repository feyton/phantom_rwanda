import { gql } from 'apollo-server-express';

const schema = gql`
	enum CardType {
		safaribus
		tapandgo
	}

	type Card {
		number: String
		balance: Float
		user: String
		type: CardType
		account: String
	}
	type CardProfile {
		currency_code: String
		account_number: String
		account_name: String
		current_balance: String
		status: String
	}

	type CheckBalance {
		cardNumber: String
		balance: Float
	}

	type Transaction {
		id: ID!
		transaction_type_id: Int!
		transaction_id: String
		amount: String
		status: String
		payment_mode: String
		tx_type: String
		balance_before: String
		balance_after: String
		tx_date: String
		tx_time: String
		name: String
	}

	type Road {
		id: ID!
		code: String!
		name: String!
		park1: BusPark!
		park2: BusPark!
		stops: [BusStop]
		buses: [Bus]
	}

	type BusStop {
		id: ID!
		name: String!
		roads: [Road]
		location: Point
	}
	type Point {
		latitude: Float!
		longitude: Float!
	}

	type BusPark {
		id: ID!
		name: String!
		roads: [Road]
		location: Point
	}

	type Bus {
		id: ID!
		plate: String!
	}

	type Query {
		getBalance(cardNumber: String!): CheckBalance
		getRoads: [Road!]
	}

	input LoadBalanceInput {
		amount: Int
		consumer_email: String
		consumer_msisdn: String
		consumer_reference: String
		payment_mode: String
	}

	type BalancePayment {
		reply: String!
		url: String
		success: Int
		authkey: String
		tid: String
		refid: String
		retcode: Int
		token: String
	}

	type Activity {
		id: ID!
		type: ActivityType!
		amount: Float!
		timestamp: String!
	}

	enum ActivityType {
		BALANCE_LOADED
		TRAVELLED
		FARE_PAID
	}

	type Mutation {
		createBusPark(input: BusParkInput): BusPark
		createRoad(input: RoadInput): Road
		createBusStop(input: BusStopInput): BusStop
	}

	input BusParkInput {
		name: String!
		location: PointInput!
	}

	input RoadInput {
		code: String!
		name: String!
		park1: ID!
		park2: ID!
		busStopIds: [ID]
	}

	input BusStopInput {
		name: String!
		location: PointInput!
	}

	input PointInput {
		latitude: Float!
		longitude: Float!
	}

	type Mutation {
		addBalance(input: LoadBalanceInput!): BalancePayment
	}
	type Query {
		getBusParks: [BusPark]
		getRoads: [Road]
		getBusStops: [BusStop]
	}
	type Query {
		getClosestBusStop(
			userLocation: PointInput!
			destinationBusParkId: ID!
		): ClosestBusStopResult
	}

	type ClosestBusStopResult {
		closestBusStop: BusStop
		roads: [Road]
	}
	type Mutation {
		updateRoad(input: UpdateRoadInput): Road
	}

	input UpdateRoadInput {
		roadId: ID!
		addBusStops: [ID] # Array of BusStop IDs to add
		removeBusStops: [ID] # Array of BusStop IDs to remove
	}
`;

export default schema;
