import fs from 'fs';
import type { Schema } from 'sanity';
import { schemaToModel } from './handle-models';

type SanitySchema = Schema.IntrinsicTypeDefinition;

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

interface Props {
	schemas: SanitySchema[];
	outputPath: string;
}

export function handleSchemas({ schemas, outputPath }: Props) {
	const items = schemas.map((schema) => {
		const model = schemaToModel(schema, schemas);
		return `const ${capitalize(schema.name)}Model = ${model};`;
	});

	const res = items.join('\n\n');

	fs.writeFileSync(outputPath, res, { encoding: 'utf-8' });

	console.log(`Wrote ${items.length} models to ${outputPath}`);

	return res;
}
