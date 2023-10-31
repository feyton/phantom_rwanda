import axios from 'axios';
import 'dotenv/config';
import https from 'https';

const token = process.env.SAFARI_BALANCE;

export const axiosBase = axios.create({
	baseURL: 'https://prod.safaribus.rw/nxfinance/api/v1/',
	headers: {
		'Content-Type': 'application/json',
		Authorization: token,
		timeout: 900000,
	},
	httpsAgent: new https.Agent({
		rejectUnauthorized: false, // Ignore SSL certificate verification
	}),
});

const fetchBalance = async (cardNumber) => {
	try {
		const response = await axiosBase.post(`checkCardBalance/${cardNumber}`);
		const { data } = response;

		return data?.data;
	} catch (error) {
		console.log(error);
		return { cardNumber: 'Card is not valid' };
	}
};

export const checkCardType = (cardNumber) => {
	if (cardNumber.replaceAll(' ', '').replaceAll('-', '').length === 16)
		return 'safaribus';
	return 'tapandgo';
};

export const TopupCard = async (input) => {
	if (checkCardType(input.consumer_reference) === 'safaribus') {
		try {
			const response = await axiosBase.post('requestPaymentUrubutoPay', {
				...input,
				service_name: 'CARD_TOPUP',
			});
			const { data } = response;

			return data?.data;
		} catch (e) {
			return null;
		}
	}
	return null;
};
const BearerToken = process.env.SAFARI_TOKEN;
export const getCardProfileAsync = async (number) => {
	try {
		const response = await axiosBase.get(
			'https://prod.safaribus.rw/nxfinance/api/v1/getCardProfile/' + number,
			{
				headers: { Authorization: BearerToken },
			}
		);
		const { data } = response.data;
		return data;
	} catch (error) {
		return null;
	}
};

export const getCardTransactionsAsync = async ({
	account_number,
	card_number,
}) => {
	if (card_number) {
		const cardProfile = await getCardProfileAsync(card_number);
		try {
			const response = await axiosBase.get(
				'https://prod.safaribus.rw/nxfinance/api/v1/getAccountTransactions?account_number=' +
					cardProfile.account_number,
				{
					headers: { Authorization: BearerToken },
				}
			);
			const { data } = response.data;
			return data;
		} catch (error) {
			// console.log(error);
			return null;
		}
	}
	try {
		const response = await axiosBase.get(
			'https://prod.safaribus.rw/nxfinance/api/v1/getAccountTransactions?account_number=' +
				account_number,
			{
				headers: { Authorization: BearerToken },
			}
		);
		const { data } = response.data;
		return data;
	} catch (error) {
		console.log(error);
		return null;
	}
};

export default fetchBalance;
