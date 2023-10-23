import { EntitySchema } from 'typeorm';
import CustomBaseEntity from '../models/base.js';

export class Operator extends CustomBaseEntity {
	mobileNumber;

	company;

	address;

	nationalID;
}

export const OperatorSchema = new EntitySchema({
	name: 'Operator',
	tableName: 'Operator',
	target: Operator,
	columns: {
		id: {
			primary: true,
			generated: true,
			type: 'int',
		},
		mobileNumber: {
			type: 'varchar',
		},
		address: {
			type: 'varchar',
		},
		nationalID: {
			type: 'varchar',
			unique: true,
		},
		company: {
			type: 'varchar',
		},
		userId: {
			nullable: true,
			type: 'int',
		},
		companyId: {
			nullable: true,
			type: 'int',
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
		company: {
			target: 'Company',
			type: 'one-to-many',
			cascade: true,
			onDelete: 'SET NULL',
			onUpdate: 'SET NULL',
			nullable: true,
			inverseSide: 'driver',
		},
	},
});

export default Operator;
