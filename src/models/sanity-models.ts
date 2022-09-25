import { z } from 'zod';
import { stringDate } from './utility-models';

export const SanityBoolean = z.boolean();
export const SanityDate = stringDate;
export const SanityDatetime = stringDate;
export const SanityNumber = z.number();
export const SanityString = z.string();
export const SanityText = z.string();
export const SanityUrl = z
	.string()
	.url()
	.transform((value) => new URL(value));

export const SanityReference = z.object({ _type: z.literal('reference'), _ref: z.string() });
export const SanityDocument = z.object({
	_id: z.string(),
	_rev: z.string(),
	_type: z.string(),
	_createdAt: SanityDatetime,
	_updatedAt: SanityDatetime,
});

export const SanitySlug = z.object({ _type: z.literal('slug'), current: z.string() });
export const SanityGeopoint = z.object({
	_type: z.literal('geopoint'),
	alt: z.number(),
	lat: z.number(),
	lng: z.number(),
});

export const SanityImage = z.object({ _type: z.literal('image'), asset: SanityReference });
const SanityImageAssetMetadataPalette = z.object({
	_type: z.literal('sanity.imagePaletteSwatch'),
	background: z.string(),
	foreground: z.string(),
	population: z.number(),
	title: z.string(),
});
export const SanityImageAsset = SanityDocument.extend({
	_type: z.literal('sanity.imageAsset'),
	assetId: z.string(),
	extension: z.string(),
	mimeType: z.string(),
	originalFilename: z.string(),
	path: z.string(),
	sha1hash: z.string(),
	size: z.number(),
	uploadId: z.string(),
	url: z.string().url(),
	metadata: z.object({
		_type: z.literal('sanity.imageMetadata'),
		blurHash: z.string(),
		hasAlpha: z.boolean(),
		isOpaque: z.boolean(),
		lqip: z.string(),
		dimensions: z.object({
			_type: z.literal('sanity.imageDimensions'),
			aspectRatio: z.number(),
			height: z.number(),
			width: z.number(),
		}),
		palette: z.object({
			_type: z.literal('sanity.imagePalette'),
			darkMuted: SanityImageAssetMetadataPalette,
			darkVibrant: SanityImageAssetMetadataPalette,
			dominant: SanityImageAssetMetadataPalette,
			lightMuted: SanityImageAssetMetadataPalette,
			lightVibrant: SanityImageAssetMetadataPalette,
			muted: SanityImageAssetMetadataPalette,
			vibrant: SanityImageAssetMetadataPalette,
		}),
	}),
});

export const SanityFile = z.object({ _type: z.literal('file'), asset: SanityReference });
export const SanityFileAsset = SanityDocument.extend({
	_type: z.literal('sanity.fileAsset'),
	assetId: z.string(),
	extension: z.string(),
	mimeType: z.string(),
	originalFilename: z.string(),
	path: z.string(),
	sha1hash: z.string(),
	size: z.number(),
	uploadId: z.string(),
	url: z.string().url(),
});

export const S = {
	boolean: SanityBoolean,
	date: SanityDate,
	datetime: SanityDatetime,
	number: SanityNumber,
	string: SanityString,
	text: SanityText,
	url: SanityUrl,
	reference: SanityReference,
	document: SanityDocument,
	slug: SanitySlug,
	geopoint: SanityGeopoint,
	image: SanityImage,
	imageAsset: SanityImageAsset,
	file: SanityFile,
	fileAsset: SanityFileAsset,
};
