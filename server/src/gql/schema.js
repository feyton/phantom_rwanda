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
		transaction_id: Int!
		account_id: Int!
		account_type_id: Int!
		account_number: String!
		tx_type: String!
		amount: Float!
		balance_before: Float!
		balance_after: Float!
		status: String!
		tx_date: String!
		tx_time: Time!
		created_at: String!
		updated_at: String!
		name: String!
	}

	scalar Date
	scalar Time
	scalar DateTime

	type Road {
		id: ID!
		code: String!
		name: String!
		park1: BusPark!
		park2: BusPark!
		stops: [BusStop]
		buses: [Bus]
		fare: Int
		details: String
	}

	type BusStop {
		id: ID!
		name: String!
		roads: [Road]
		location: Point
		details: String
		pictures: [String]
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
		details: String
		pictures: [String]
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
		details: String
		pictures: [String]
	}

	input RoadInput {
		code: String!
		name: String!
		park1: ID!
		park2: ID!
		busStopIds: [ID]
		fare: Int
	}

	input BusStopInput {
		name: String!
		location: PointInput!
		details: String
		pictures: [String]
	}

	input PointInput {
		latitude: Float!
		longitude: Float!
	}

	type Mutation {
		addBalance(input: LoadBalanceInput!): BalancePayment
	}
	input GetTransactionsInput {
		account_number: String
		card_number: String
	}
	type Query {
		getBusParks: [BusPark]
		getRoads: [Road]
		getBusStops: [BusStop]
		getCardProfile(cardNumber: String!): CardProfile!
		getCardTransactions(input: GetTransactionsInput!): [Transaction]
		getRoad(id: ID!): Road!
		getUserCards: [BusCard]
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

	type BusCard {
		name: String
		number: String!
		account_number: String
		id: ID!
		user: User
		phone: String!
		email: String
		balance: Int
		transactions: [Transaction]
	}

	type User {
		name: String!
		email: String!
		phone: String
		role: String!
		photo: String!
		active: String
		cards: [BusCard]
		last_login: String
		id: ID!
	}
	type Login {
		token: String!
		user: User!
	}

	input LoginInput {
		email: String!
		id: String!
		photo: String!
		familyName: String!
		givenName: String!
		name: String!
		serverAuthCode: String!
	}
	input AddCard {
		number: String!
		phone: String!
		email: String!
	}

	type Mutation {
		loginUser(input: LoginInput!): Login!
		addCard(input: AddCard!): BusCard!
	}
`;

export default schema;
