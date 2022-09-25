import { schemaToModel } from './handle-models.js';

/**
 * @typedef {import('sanity').Schema.BooleanDefinition} Schema
 * @typedef {import('sanity').Schema.BooleanDefinition} BooleanDefinition
 * @typedef {import('sanity').Schema.DateDefinition} DateDefinition
 * @typedef {import('sanity').Schema.DatetimeDefinition} DatetimeDefinition
 * @typedef {import('sanity').Schema.NumberDefinition} NumberDefinition
 * @typedef {import('sanity').Schema.StringDefinition} StringDefinition
 * @typedef {import('sanity').Schema.TextDefinition} TextDefinition
 * @typedef {import('sanity').Schema.UrlDefinition} UrlDefinition
 * @typedef {import('sanity').Schema.ReferenceDefinition} ReferenceDefinition
 * @typedef {import('sanity').Schema.SlugDefinition} SlugDefinition
 * @typedef {import('sanity').Schema.GeopointDefinition} GeopointDefinition
 * @typedef {import('sanity').Schema.ImageDefinition} ImageDefinition
 * @typedef {import('sanity').Schema.FileDefinition} FileDefinition
 * @typedef {import('sanity').Schema.BlockDefinition} BlockDefinition
 * @typedef {import('sanity').Schema.ArrayDefinition} ArrayDefinition
 * @typedef {import('sanity').Schema.ObjectDefinition} ObjectDefinition
 * @typedef {import('sanity').Schema.DocumentDefinition} DocumentDefinition
 * @typedef {import('sanity').Schema.IntrinsicTypeDefinition} SanitySchema
 */

const withReference = `z.object({ _type: z.literal('reference'), _ref: z.string() })`;

/**
 * @param  {BooleanDefinition} schema
 * @returns string
 */
export function boolean(schema) {
	return `z.boolean()`;
}

/**
 * @param  {DateDefinition} _schema
 * @returns string
 */
export function date(_schema) {
	return `z.string().transform((v) => (v?.length ? new Date(v) : undefined))`;
}

/**
 * @param  {DatetimeDefinition} _schema
 * @returns string
 */
export function datetime(_schema) {
	return `z.string().transform((v) => (v?.length ? new Date(v) : undefined))`;
}

/**
 * @param  {NumberDefinition} _schema
 * @returns string
 */
export function number(_schema) {
	return `z.number()`;
}

/**
 * @param  {StringDefinition} _schema
 * @returns string
 */
export function string(_schema) {
	return `z.string()`;
}

/**
 * @param  {TextDefinition} _schema
 * @returns string
 */
export function text(_schema) {
	return `z.string()`;
}

/**
 * @param  {UrlDefinition} _schema
 * @returns string
 */
export function url(_schema) {
	return `z.string().url().transform((value) => new URL(value))`;
}

/**
 * @param  {ReferenceDefinition} _schema
 * @returns string
 */
export function reference(_schema) {
	return withReference;
}

/**
 * @param  {SlugDefinition} _schema
 * @returns string
 */
export function slug(_schema) {
	return `z.object({ _type: z.literal('slug'), current: z.string() })`;
}

/**
 * @param  {GeopointDefinition} _schema
 * @returns string
 */
export function geopoint(_schema) {
	return `z.object({_type: z.literal('geopoint'),alt: z.number(),lat: z.number(),lng: z.number()})`;
}

/**
 * @param  {ImageDefinition} _schema
 * @returns string
 */
export function image(_schema) {
	return `z.object({ _type: z.literal('image'), asset: ${withReference} })`;
}

/**
 * @param  {FileDefinition} _schema
 * @returns string
 */
export function file(_schema) {
	return `z.object({ _type: z.literal('file'), asset: ${withReference} })`;
}

/**
 * @param  {BlockDefinition} _schema
 * @returns string
 */
export function block(_schema) {
	return `z.array(z.any())`;
}

/**
 * @param  {ArrayDefinition} schema
 * @param  {SanitySchema[]} schemas
 * @returns string
 */
export function array(schema, schemas) {
	/** @type { string[] } */
	const items = schema.of.map((subSchema) => {
		// @ts-expect-error - we know this is safe for our use case
		const subModel = schemaToModel(subSchema, schemas);
		return subModel;
	}, []);

	const value = items.length > 1 ? `z.union([\n\t${items.join(',\n\t')}\n])` : items[0];

	return `z.array(${value})`;
}

/**
 * @param  {(ObjectDefinition | DocumentDefinition)} schema
 * @param  {SanitySchema[]} schemas
 * @returns string
 */
export function object(schema, schemas) {
	/** @type { string[] } */
	const items = schema.fields.map((subSchema) => {
		// @ts-expect-error - we know this is safe for our use case
		const subModel = schemaToModel(subSchema, schemas);
		return `${subSchema.name}: ${subModel}`;
	});

	const fields = items.join(',\n\t');

	if (schema.type === 'document') {
		return `z.object({\n\t_id: z.string(),\n\t_rev: z.string(),\n\t_type: z.string(),\n\t_createdAt: Datetime,\n\t_updatedAt: Datetime\n}).extend({\n\t${fields}\n})`;
	} else return `z.object({\n\t${fields}\n})`;
}
