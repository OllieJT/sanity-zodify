import fs from 'fs';
import { schemaToModel } from './lib/handle-models';
import { SanitySchema } from './lib/models';

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

interface Props {
	schemas: SanitySchema[];
	outputPath: string;
}

export function handleSchemas({ outputPath, schemas }: Props) {
	const items = schemas.map((schema) => {
		const model = schemaToModel(schema, schemas);
		return `const ${capitalize(schema.name)}Model = ${model};`;
	});

	const res = `import { z } from 'zod';\n\n` + items.join('\n\n');

	fs.writeFileSync(outputPath, res, { encoding: 'utf-8' });

	console.log(`Wrote ${items.length} models to ${outputPath}`);

	return res;
}
