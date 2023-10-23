import { EntitySchema } from 'typeorm';
import CustomBaseEntity from '../../models/base.js';

export class BusPark extends CustomBaseEntity {
	id;

	name;

	roads;

	location;
}

export const BusParkSchema = new EntitySchema({
	name: 'BusPark',
	tableName: 'BusPark',
	target: BusPark,
	columns: {
		name: {
			type: 'varchar',
		},
		location: {
			type: 'point',
			nullable: true,
			transformer: {
				from(value1) {
					if (value1?.x) {
						return `${value1.x}, ${value1.y}`;
					}
					return value1;
				},
				to(value1) {
					return value1;
				},
			},
		},
	},
});
