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
	}

	type CheckBalance {
		cardNumber: String
		balance: Float
	}

	type Road {
		id: ID!
		code: String!
		name: String!
		final_bus_parks: [BusPark]!
		stops: [BusStop]!
		buses: [Bus]!
	}

	type BusStop {
		id: ID!
		name: String!
		roads: [Road]!
		location: Point
	}
	type Point {
		latitude: Float!
		longitude: Float!
	}

	type BusPark {
		id: ID!
		name: String!
		roads: [Road]!
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

	type AddBalance {
		balance: Int
		amount: Int
		method: String
	}

	input roadInput {
		code: String
		location: String
		busPark: String
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
		addRoad(road: roadInput!): Road!
		addBalance(input: LoadBalanceInput!): BalancePayment
	}
`;

export default schema;
