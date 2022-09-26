// #!/usr/bin/env node

const path = require('path');
const { handleSchemas } = require('../dist/main.cjs');
const demoSchemaTypes = require('./utility/demo-schema.json');

/** @typedef {import("sanity").Schema.IntrinsicTypeDefinition} SanitySchema */

/** @type SanitySchema[] **/
const schemaTypes = demoSchemaTypes;

const res = handleSchemas({
	schemas: schemaTypes,
	directory: process.cwd(),
	fileName: 'thing',
});

console.log('res', res);
