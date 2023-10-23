import fetchBalance, { TopupCard } from '../routes/checkSafariBalance.js';

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
	},
	Mutation: {
		addBalance: async (_, args) => {
			const data = await TopupCard(args.input);
			return data;
		},
	},
};

export default resolvers;
