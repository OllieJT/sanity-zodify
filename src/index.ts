export * from './models/utility-models';

import { customModels, referenceModels, sanityModels } from './lib/sanity-schemas';

import type { Schema } from 'sanity';
import { z, ZodType } from 'zod';
import { capitalize } from './lib/helper';
import { Url_Raw } from './models/sanity-models';

console.log(
	'Url_Raw: ',
	Url_Raw.toString(),
	// Boolean_Raw,
	// Datetime_Raw,
	// Date_Raw,
	// Document_Raw,
	// FileAsset_Raw,
	// File_Raw,
	// Geopoint_Raw,
	// ImageAsset_Raw,
	// Image_Raw,
	// Number_Raw,
	// Reference_Raw,
	// Slug_Raw,
	// String_Raw,
	// Text_Raw,
	// Url_Raw,
);

function addModel(name: string, model: string) {
	customModels.set(name, model);
	referenceModels.set(name, capitalize(name));
}

type SanitySchema = Schema.IntrinsicTypeDefinition;

function handleArray(schema: Schema.ArrayDefinition) {
	let arrayFields: string[] = [];
	schema.of.forEach((field) => {
		const exstingModel = referenceModels.get(field.type);
		if (exstingModel) arrayFields.push(exstingModel);
		else {
			console.error(`⛔️ cannot find model for ${field.type} (${field.name})`);
			// throw new Error(`⛔️ cannot find model for ${field.type} (${field.name})`);
		}
	});

	//@ts-expect-error - fields is readonly
	const arrayMultiField = z.union(arrayFields as unknown as ZodType[]);
	const arraySingleField = arrayFields[0] as unknown as ZodType;

	const model = z.array(arrayFields.length === 1 ? arraySingleField : arrayMultiField);
	addModel(schema.name, 'model');

	console.log([schema.type, schema.name, ': arrayFields :'].join(' '), arrayFields);
}

function handleObject(schema: Schema.DocumentDefinition | Schema.ObjectDefinition) {
	let objectFields: Record<string, string> = {};
	schema.fields.forEach((field) => {
		const exstingModel = referenceModels.get(field.type);
		if (exstingModel) {
			objectFields = { ...objectFields, [field.name]: exstingModel };
		} else {
			if (exstingModel) {
				objectFields = { ...objectFields, [field.name]: capitalize(field.name) };
			}
			console.warn(
				`🚧 Optimistially assigning ${field.name} model to ${capitalize(field.name)}`,
			);
		}
	});
	console.log([schema.type, schema.name, ' : objectFields : '].join(' '), objectFields);
}

export function handleSchemas(schemas: SanitySchema[]) {
	new Promise<SanitySchema[]>((resolve, _reject) => {
		let remainder: SanitySchema[] = [];

		for (const schema of schemas) {
			const aliasSchema = sanityModels.get(schema.type);
			if (aliasSchema) addModel(schema.name, 'aliasSchema');
			else remainder.push(schema);
		}

		resolve(remainder);
	}).then((schemas) => {
		let remainder: SanitySchema[] = [];

		for (const schema of schemas) {
			if (schema.type === 'array') handleArray(schema);
			else if (schema.type === 'object') handleObject(schema);
			else if (schema.type === 'document') handleObject(schema);
			else remainder.push(schema);
		}

		return remainder;
	});

	if (referenceModels.size != sanityModels.size + customModels.size) {
		throw new Error('⛔️ Reference models out of sync with models');
	} else {
		console.log('✅ Reference models in sync with models');
	}

	return [...customModels.entries()];
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
