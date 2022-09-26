import fs from 'fs';
import path from 'path';
import { schemaToModel } from './lib/handle-models';
import { SanitySchema } from './lib/models';

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

interface Props {
	schemas: SanitySchema[];
	directory: string;
	fileName: string;
}

export function handleSchemas({ schemas, directory, fileName }: Props) {
	const items = schemas.map((schema) => {
		const model = schemaToModel(schema, schemas);
		return `const ${capitalize(schema.name)}Model = ${model};`;
	});

	const res = `import { z } from 'zod';\n\n` + items.join('\n\n');

	const outputPath = path.join(directory, fileName + '.ts');

	fs.writeFileSync(outputPath, res, { encoding: 'utf-8' });

	console.log(`Wrote ${items.length} models to ${outputPath}`);

	return res;
}
