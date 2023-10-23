import { Router } from 'express';
import verifyToken from '../middlewares/authJwt.js';
import CheckPermissionAny from '../middlewares/CheckPermission.js';
import asyncHandler from '../utils/asyncHandler.js';
import validate from '../utils/validateMiddleware.js';
import companyValidation from './validation.js';
import { getCompanies, createCompany } from './views.js';

const resource = 'company';
const companyRouter = Router();

companyRouter.get(
	'/',
	verifyToken,
	CheckPermissionAny(resource),
	asyncHandler(getCompanies)
);
companyRouter.post(
	'/',
	verifyToken,
	companyValidation(),
	validate,
	asyncHandler(createCompany)
);

export default companyRouter;
