import { body } from 'express-validator';

const companyValidation = () => [
	body('name').notEmpty().withMessage('Name is required'),
	body('logo').isURL().withMessage('Add a link to your logo'),
	body('website')
		.toLowerCase()
		.isURL()
		.withMessage('A website should be a link'),
	body('address').notEmpty().withMessage('Company address is required'),
	body('twitter')
		.toLowerCase()
		.isLength({ min: 3 })
		.withMessage('A handle must be more than 3 characters'),
];

export default companyValidation;
