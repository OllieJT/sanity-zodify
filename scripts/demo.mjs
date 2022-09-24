// #!/usr/bin/env node

import { handleSchemas } from '../index.js';

/** @typedef {import("sanity").Schema.IntrinsicTypeDefinition} SanitySchema */

/** @type SanitySchema[] **/
const schemaTypes = [
	{
		title: 'Family',
		name: 'family',
		type: 'document',
		fields: [
			{
				title: 'Family Name',
				name: 'familyName',
				type: 'string',
			},

			{
				title: 'Members',
				name: 'myFriends',
				type: 'array',
				of: [{ type: 'connection' }],
			},
		],
	},
	{
		title: 'Person',
		name: 'person',
		type: 'document',
		fields: [
			{
				title: 'Full Name',
				name: 'fullName',
				type: 'string',
			},
			{ type: 'profile', name: 'personProfile' },
		],
	},

	{
		title: 'Friend',
		name: 'friend',
		type: 'reference',
		to: [{ type: 'person' }],
	},

	{
		title: 'My Friends',
		name: 'myFriends',
		type: 'array',
		of: [
			{
				type: 'reference',
				to: [{ type: 'person' }],
			},
		],
	},

	{
		title: 'Connection',
		name: 'connection',
		type: 'reference',
		to: [{ type: 'person' }, { type: 'family' }],
	},

	{
		title: 'Parent',
		name: 'isParent',
		type: 'boolean',
	},

	{
		title: 'Date of birth',
		name: 'dob',
		type: 'date',
	},

	{
		title: 'Next Meeting',
		name: 'datetime',
		type: 'datetime',
	},

	{
		title: 'Lucky Number',
		name: 'luckyNumber',
		type: 'number',
	},

	{
		title: 'Nationality',
		name: 'nationality',
		type: 'string',
	},

	{
		title: 'BIO',
		name: 'bio',
		type: 'text',
	},

	{
		title: 'Contact Details',
		name: 'contact',
		type: 'file',
	},

	{
		title: 'Current Location',
		name: 'currentLocation',
		type: 'geopoint',
	},

	{
		title: 'Photo',
		name: 'photo',
		type: 'image',
	},

	{
		title: 'Username',
		name: 'username',
		type: 'slug',
	},

	{
		title: 'Profile',
		name: 'profile',
		type: 'object',
		fields: [
			{ type: 'myFriends', name: 'profileMyFriends' },
			{ type: 'connection', name: 'profileConnection' },
			{ type: 'isParent', name: 'profileIsParent' },
			{ type: 'dob', name: 'profileDob' },
			{ type: 'datetime', name: 'profileDatetime' },
			{ type: 'luckyNumber', name: 'profileLuckyNumber' },
			{ type: 'nationality', name: 'profileNationality' },
			{ type: 'bio', name: 'profileBio' },
			{ type: 'contact', name: 'profileContact' },
			{ type: 'currentLocation', name: 'profileCurrentLocation' },
			{ type: 'photo', name: 'profilePhoto' },
			{ type: 'username', name: 'profileUsername' },
		],
	},
];

const res = handleSchemas(schemaTypes);

console.log(res);
