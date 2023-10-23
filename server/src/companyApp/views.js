import { AccessControl } from 'accesscontrol';
import handleResponse from '../controllers/handleResponse.js';
import { Company } from './models.js';

export const getCompanies = async (req, res) => {
	const companies = await Company.find({});
	return handleResponse(
		res,
		200,
		AccessControl.filter(companies, req.attributes)
	);
};

export const createCompany = async (req, res) => {
	const newCompany = await Company.createAndSave(req.body);
	return handleResponse(res, 201, newCompany);
};
