export { S } from './models/sanity-models';
export * from './models/utility-models';

import { sanitySchemas } from './lib/sanity-schemas';

import type { Schema } from 'sanity';

function isCompilation(s: Schema.IntrinsicTypeDefinition) {
	return s.type === 'array' || s.type === 'object' || s.type === 'document';
}

export function handleSchemas(schemas: Schema.IntrinsicTypeDefinition[]) {
	for (const schema of schemas) {
		const aliasSchema = sanitySchemas.get(schema.type);
		if (aliasSchema) sanitySchemas.set(schema.name, aliasSchema);
		else {
			if (isCompilation(schema)) continue;

			console.error(`⛔️ Not handling models for ${schema.type} (${schema.name})`);
			// throw new Error(`⛔️ Unexpected schema type: ${schema.type} (${schema.name})`);
		}

		console.log('💠 Total Schemas:', sanitySchemas.size);

		// const label = handleTitle(schema.title)
		// const name = schema.name;
	}

	for (const schema of schemas) {
		if (!isCompilation(schema)) continue;
		console.error(`TODO: create model for ${schema.name} (${schema.type})`);

		// const label = handleTitle(schema.title)
		// const name = schema.name;
	}
	console.log([...sanitySchemas.entries()]);
}

/*


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
}


*/
