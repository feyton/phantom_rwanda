import { EntitySchema } from 'typeorm';
import CustomBaseEntity from '../../models/base.js';

export class Road extends CustomBaseEntity {
	code;

	id;

	name;

	final_bus_parks;

	stops;

	buses;
}


export const RoadSchema = new EntitySchema({
	name: 'Road',
	tableName: 'Road',
	target: Road,
	columns: {
		id: {
			primary: true,
			generated: true,
			type: 'int',
		},
		code: {
			type: 'varchar',
			required: true,
			unique: true,
		},
		name: {
			type: 'varchar',
			required: true,
		},
	},
	relations: {
		buspark: {
			target: 'BusPark',
			type: 'one-to-many',
			joinColumn: true,
			eager: true,
		},
	},
});
