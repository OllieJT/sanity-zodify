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

const initialSanityModels: [Schema.Type, ZodFirstPartySchemaTypes][] = [
	['boolean', Boolean],
	['date', Date],
	['datetime', Datetime],
	['number', Number],
	['string', String],
	['text', Text],
	['url', Url],
	['reference', Reference],
	['block', Block],

	['slug', Slug],
	['image', Image],
	['file', File],
	['geopoint', Geopoint],

	// ['document', Document],
	// ['array', z.array(z.unknown())],
	// ['object', z.record(z.unknown())],
];

const initialReferenceModels: [Schema.Type, string][] = [
	['boolean', 'Boolean'],
	['date', 'Date'],
	['datetime', 'Datetime'],
	['number', 'Number'],
	['string', 'String'],
	['text', 'Text'],
	['url', 'Url'],
	['reference', 'Reference'],
	['block', 'Block'],

	['slug', 'Slug'],
	['image', 'Image'],
	['file', 'File'],
	['geopoint', 'Geopoint'],
];

export const sanityModels = new Map<string, ZodType>(initialSanityModels);
export const customModels = new Map<string, string>();
export const referenceModels = new Map<string, string>(initialReferenceModels);
