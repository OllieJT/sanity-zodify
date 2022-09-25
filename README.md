# Sanity Zodify

A toolkit to maintain typesafety when working with data from Sanity - intended for use with groq, but not a requirement.

**Now**

This kit includes Zod models to help build your schema faster.

**Next**

I hope to generate models from your Sanity Schema to reduce the time to setup your queries.

## Installation

```bash
# npm
npm i -D sanity-zodify

# yarn
yarn add -D sanity-zodify

# pnpm
pnpm add -D sanity-zodify

```

## Usage

```js
import { z } from 'zod';
import { S } from './src';

const colors = z.union([z.literal('red'), z.literal('green'), z.literal('blue')]);

const Homepage = S.document.extend({
	title: S.string,
	subtitle: S.string.optional(),
	thumbnail: S.image,
	colors: z.union([z.literal('red'), z.literal('green'), z.literal('blue')]),
	authors: z.array(S.string),
	publishAt: S.datetime,
});

// raw_data is NOT type safe.
const awesome_data = Homepage.parse(raw_data);

// awesome_data IS type safe.
console.log(awesome_data.title);
```
