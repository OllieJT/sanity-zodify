import { z } from 'zod';

export const stringToDate = z.string().transform((v) => (v?.length ? new Date(v) : undefined));

export const stringToUrl = z
	.string()
	.url()
	.transform((value) => new URL(value));
