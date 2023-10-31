import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import handleResponse from '../controllers/handleResponse.js';

dotenv.config();
const SECRET = process.env.ACCESS_TOKEN_SECRET;

const verifyToken = (req, res, next) => {
	const authHeader = req.headers.authorization;
	const token = authHeader && authHeader.split(' ')[1];
	if (!token)
		return handleResponse(res, 401, res.__('Unauthorized with token'));

	jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
		if (err)
			return handleResponse(res, 401, res.__('Invalid or expired token'));
		req.user = user;
		next();
	});
};

export const jwtMiddleWare = (req, res, next) => {
	const authHeader = req.headers.authorization;
	const token = authHeader && authHeader.split(' ')[1];
	if (!token) {
		req.user = { userId: null, role: null };
		return next();
	}

	jwt.verify(token, SECRET, (err, user) => {
		if (err) req.token = { error: true, message: err.message };
		if (user) req.user = JSON.parse(user?.user);
		// console.log(err);
		return next();
	});
};

export default verifyToken;
