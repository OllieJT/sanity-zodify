import type { Schema } from 'sanity';
import { ZodFirstPartySchemaTypes, ZodType } from 'zod';
import {
	Block,
	Boolean,
	Date,
	Datetime,
	File,
	Geopoint,
	Image,
	Number,
	Reference,
	Slug,
	String,
	Text,
	Url,
} from '../models/sanity-models';

// type ValidateType = (s: Schema.IntrinsicTypeDefinition) => ZodFirstPartySchemaTypes;

/* const handleDocument: ValidateType = (s) => {
	if (s.type != 'document') throw new Error('handleDocument called with non-document type');

	let zodFields = {};

	s.fields.forEach((field) => {
		zodFields = {
			...zodFields,
			[field.name]: validate[field.type](field),
		};
	});

	return Document.extend(zodFields);
}; */

/* const validate: Record<Schema.Type, null | ValidateType> = {
	boolean: () => Boolean,
	date: () => Date,
	datetime: () => Datetime,
	number: () => Number,
	string: () => String,
	text: () => Text,
	url: () => Url,
	reference: () => Reference,

	slug: () => Slug,
	image: () => Image,
	file: () => File,
	geopoint: () => Geopoint,

	array: () => z.any(),
	document: () => z.any(),
	object: () => z.any(),

	block: null,
	crossDatasetReference: null,
	span: null,
}; */

const initialSchemas: [Schema.Type, ZodFirstPartySchemaTypes][] = [
	['boolean', Boolean],
	['date', Date],
	['datetime', Datetime],
	['number', Number],
	['string', String],
	['text', Text],
	['url', Url],
	['reference', Reference],
	['block', Block],

	/* Structured */

	['slug', Slug],
	['image', Image],
	['file', File],
	['geopoint', Geopoint],

	/* Compound */

	// ['document', Document],
	// ['array', z.array(z.unknown())],
	// ['object', z.record(z.unknown())],
];

export const sanitySchemas = new Map<string, ZodType>(initialSchemas);
