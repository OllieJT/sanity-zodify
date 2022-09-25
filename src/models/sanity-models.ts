import { z } from 'zod';
import { stringToDate, stringToUrl } from './utility-models';

export const Block = z.any();
export const Boolean = z.boolean();
export const Date = stringToDate;
export const Datetime = stringToDate;
export const Number = z.number();
export const String = z.string();
export const Text = z.string();
export const Url = stringToUrl;

export const Reference = z.object({ _type: z.literal('reference'), _ref: z.string() });
export const Document = z.object({
	_id: z.string(),
	_rev: z.string(),
	_type: z.string(),
	_createdAt: Datetime,
	_updatedAt: Datetime,
	fields: z.array(z.unknown()),
});

export const Slug = z.object({ _type: z.literal('slug'), current: z.string() });
export const Geopoint = z.object({
	_type: z.literal('geopoint'),
	alt: z.number(),
	lat: z.number(),
	lng: z.number(),
});

export const Image = z.object({ _type: z.literal('image'), asset: Reference });
const ImageAssetMetadataPalette = z.object({
	_type: z.literal('sanity.imagePaletteSwatch'),
	background: z.string(),
	foreground: z.string(),
	population: z.number(),
	title: z.string(),
});
export const ImageAsset = Document.extend({
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
			darkMuted: ImageAssetMetadataPalette,
			darkVibrant: ImageAssetMetadataPalette,
			dominant: ImageAssetMetadataPalette,
			lightMuted: ImageAssetMetadataPalette,
			lightVibrant: ImageAssetMetadataPalette,
			muted: ImageAssetMetadataPalette,
			vibrant: ImageAssetMetadataPalette,
		}),
	}),
});

export const File = z.object({ _type: z.literal('file'), asset: Reference });
export const FileAsset = Document.extend({
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

export const Block_Raw = Block.toString();
export const Boolean_Raw = Boolean.toString();
export const Date_Raw = Date.toString();
export const Datetime_Raw = Datetime.toString();
export const Number_Raw = Number.toString();
export const String_Raw = String.toString();
export const Text_Raw = Text.toString();
export const Url_Raw = Url.toString();
export const Reference_Raw = Reference.toString();
export const Document_Raw = Document.toString();
export const Slug_Raw = Slug.toString();
export const Geopoint_Raw = Geopoint.toString();
export const Image_Raw = Image.toString();
export const ImageAsset_Raw = ImageAsset.toString();
export const File_Raw = File.toString();
export const FileAsset_Raw = FileAsset.toString();
