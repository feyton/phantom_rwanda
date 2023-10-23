import axios from 'axios';
import 'dotenv/config';
import https from 'https';

const token = process.env.SAFARI_BALANCE;

const axiosBase = axios.create({
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

export default fetchBalance;
