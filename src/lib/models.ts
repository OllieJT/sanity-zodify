import type { Schema } from 'sanity';
import { schemaToModel } from './handle-models';

export type SanitySchema = Schema.IntrinsicTypeDefinition;

const withReference = `z.object({ _type: z.literal('reference'), _ref: z.string() })`;
const withDate = `z.string().transform((v) => (v?.length ? new Date(v) : undefined))`;

export function boolean(_schema: Schema.BooleanDefinition): string {
	return `z.boolean()`;
}

export function date(_schema: Schema.DateDefinition): string {
	return withDate;
}

export function datetime(_schema: Schema.DatetimeDefinition): string {
	return withDate;
}

export function number(_schema: Schema.NumberDefinition): string {
	return `z.number()`;
}

export function string(_schema: Schema.StringDefinition): string {
	return `z.string()`;
}

export function text(_schema: Schema.TextDefinition): string {
	return `z.string()`;
}

export function url(_schema: Schema.UrlDefinition): string {
	return `z.string().url().transform((value) => new URL(value))`;
}

export function reference(_schema: Schema.ReferenceDefinition): string {
	return withReference;
}

export function slug(_schema: Schema.SlugDefinition): string {
	return `z.object({ _type: z.literal('slug'), current: z.string() })`;
}

export function geopoint(_schema: Schema.GeopointDefinition): string {
	return `z.object({_type: z.literal('geopoint'),alt: z.number(),lat: z.number(),lng: z.number()})`;
}

export function image(_schema: Schema.ImageDefinition): string {
	return `z.object({ _type: z.literal('image'), asset: ${withReference} })`;
}

export function file(_schema: Schema.FileDefinition): string {
	return `z.object({ _type: z.literal('file'), asset: ${withReference} })`;
}

export function block(_schema: Schema.BlockDefinition): string {
	return `z.array(z.any())`;
}

export function array(schema: Schema.ArrayDefinition, schemas: SanitySchema[]): string {
	/** @type { string[] } */
	const items: string[] = schema.of.map((subSchema) => {
		// @ts-expect-error - we know this is safe for our use case
		const subModel = schemaToModel(subSchema, schemas);
		return subModel;
	}, []);

	const value = items.length > 1 ? `z.union([\n\t${items.join(',\n\t')}\n])` : items[0];

	return `z.array(${value})`;
}

export function object(
	schema: Schema.ObjectDefinition | Schema.DocumentDefinition,
	schemas: SanitySchema[],
): string {
	/** @type { string[] } */
	const items: string[] = schema.fields.map((subSchema) => {
		// @ts-expect-error - we know this is safe for our use case
		const subModel = schemaToModel(subSchema, schemas);
		return `${subSchema.name}: ${subModel}`;
	});

	const fields = items.join(',\n\t');

	if (schema.type === 'document') {
		return `z.object({\n\t_id: z.string(),\n\t_rev: z.string(),\n\t_type: z.string(),\n\t_createdAt: ${withDate},\n\t_updatedAt: ${withDate}\n}).extend({\n\t${fields}\n})`;
	} else return `z.object({\n\t${fields}\n})`;
}
