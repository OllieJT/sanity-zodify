import fs from 'fs';
import { schemaToModel } from './lib/handle-models.js';

/**
 * @typedef {import('./lib/models.js').SanitySchema} SanitySchema
 */

/**
 * @param  {string} str
 * @returns string
 */
const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

/**
 * @param  {{schemas: SanitySchema[], outputPath:string}} props
 * @returns string
 */
export function handleSchemas(props) {
	const items = props.schemas.map((schema) => {
		const model = schemaToModel(schema, props.schemas);
		return `const ${capitalize(schema.name)}Model = ${model};`;
	});

	const res = `import { z } from 'zod';\n\n` + items.join('\n\n');

	fs.writeFileSync(props.outputPath, res, { encoding: 'utf-8' });

	console.log(`Wrote ${items.length} models to ${props.outputPath}`);

	return res;
}
