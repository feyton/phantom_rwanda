import { EntitySchema } from 'typeorm';
import CustomBaseEntity from '../models/base.js';

export class Company extends CustomBaseEntity {
	name;

	address;

	logo;

	website;

	twitter;
}

export const CompanySchema = new EntitySchema({
	name: 'Company',
	tableName: 'Company',
	target: Company,
	columns: {
		id: {
			primary: true,
			generated: true,
			type: 'int',
		},
		address: {
			type: 'varchar',
		},
		userId: {
			nullable: true,
			type: 'int',
		},
		logo: {
			type: 'varchar',
		},
		website: {
			type: 'varchar',
		},
		twitter: {
			type: 'varchar',
		},
	},
	relations: {
		user: {
			target: 'User',
			type: 'one-to-one',
			cascade: true,
			joinColumn: true,
			eager: true,
			onDelete: 'CASCADE',
		},
	},
});
