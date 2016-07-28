declare module datariver {
	interface ProtoBufModel {
		toArrayBuffer(): ArrayBuffer;
		//toBuffer(): NodeBuffer;
		//encode(): ByteBuffer;
		toBase64(): string;
		toString(): string;
	}
	export interface Geo extends ProtoBufModel {
		latitude?: number;
		longitude?: number;
	}

	export interface Empty extends ProtoBufModel {

	}

	export interface Listing extends ProtoBufModel {
		listing_id?: string;
		external_id?: string;
		url?: string;
		company_name?: string;
		address?: string;
		city?: string;
		state?: string;
		country?: string;
		zip_code?: string;
		location?: Geo;
		phone?: string;
		additional_phone_numbers: string[];
		website?: string;
		number_of_reviews?: number;
		average_review_rating?: number;
		business_categories: string[];

	}

	export interface GetListingRequest extends ProtoBufModel {
		listing_id?: string;

	}

	export interface DeleteListingRequest extends ProtoBufModel {
		listing_id?: string;

	}
}
