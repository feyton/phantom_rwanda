import dotenv from 'dotenv';

dotenv.config();

export const context = ({ req }) => {
	if (req.token)
		return {
			userId: null,
			role: null,
			error: req.token.error,
			message: req.token.message,
		};
	return req.user;
};
