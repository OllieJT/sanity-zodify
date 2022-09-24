export * from './models/sanity-models';
export * from './models/utility-models';

/* import type { Schema } from 'sanity';
import validate from './lib/handle-sanity-schema';
import { handleTitle } from './lib/helper';

interface PreZod {
	label: string;
	name: string;
	validation: any;
}

export function handleSchemas(schemas: Schema.IntrinsicTypeDefinition[]) {
	const preZod = schemas.reduce((prev, curr) => {
		if (!curr.title)
			throw new Error(`Schema ${curr.name} has no title. Resolve this and try again.`);

		// TODO: Handle required fields
		const handleValidate = validate[curr.type];

		if (handleValidate) {
			const preparedSchema: PreZod = {
				label: handleTitle(curr.title),
				name: curr.name,
				validation: handleValidate(curr),
			};
			return [...prev, preparedSchema];
		} else {
			throw new Error(
				`Schema ${curr.name} has an invalid type of ${curr.type}. Resolve this and try again.`,
			);
		}
	}, [] as PreZod[]);

	return preZod;
} */
