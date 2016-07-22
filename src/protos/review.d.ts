// generated by Proto2Typescript. do not touch!

declare module datariver {
	interface ProtoBufModel {
		toArrayBuffer(): ArrayBuffer;
		//toBuffer(): NodeBuffer;
		//encode(): ByteBuffer;
		toBase64(): string;
		toString(): string;
	}

	export interface ProtoBufBuilder {
		Review: ReviewBuilder;
		ReviewResponse: ReviewResponseBuilder;
		MultiReviewResponse: MultiReviewResponseBuilder;
		GetReviewRequest: GetReviewRequestBuilder;
		DeleteReviewRequest: DeleteReviewRequestBuilder;
		ListReviewsRequest: ListReviewsRequestBuilder;
		
	}
}

declare module datariver {

	export interface Review extends ProtoBufModel {
		review_id?: string;
		listing_id?: string;
		url?: string;
		star_rating?: number;
		reviewer_name?: string;
		reviewer_email?: string;
		reviewer_url?: string;
		content?: string;
		published_date?: number;
		title?: string;
		
	}
	
	export interface ReviewBuilder {
		new(): Review;
		decode(buffer: ArrayBuffer) : Review;
		//decode(buffer: NodeBuffer) : Review;
		//decode(buffer: ByteArrayBuffer) : Review;
		decode64(buffer: string) : Review;
		
	}	
}

declare module datariver {

	export interface ReviewResponse extends ProtoBufModel {
		review_id?: string;
		listing_id?: string;
		status?: ReviewResponse.StatusCodes;
		error?: string;
		review?: Review;
		
	}
	
	export interface ReviewResponseBuilder {
		new(): ReviewResponse;
		decode(buffer: ArrayBuffer) : ReviewResponse;
		//decode(buffer: NodeBuffer) : ReviewResponse;
		//decode(buffer: ByteArrayBuffer) : ReviewResponse;
		decode64(buffer: string) : ReviewResponse;
		StatusCodes: ReviewResponse.StatusCodes;
		
	}	
}

declare module datariver.ReviewResponse {
	export const enum StatusCodes {
		UNUSED = 0,
		SUCCESS = 1,
		ERROR = 2,
		REJECTED = 3,
		NOT_FOUND = 4,
		
	}
}

declare module datariver {

	export interface MultiReviewResponse extends ProtoBufModel {
		listing_id?: string;
		listing_external_id?: string;
		status?: MultiReviewResponse.StatusCodes;
		error?: string;
		reviews: Review[];
		
	}
	
	export interface MultiReviewResponseBuilder {
		new(): MultiReviewResponse;
		decode(buffer: ArrayBuffer) : MultiReviewResponse;
		//decode(buffer: NodeBuffer) : MultiReviewResponse;
		//decode(buffer: ByteArrayBuffer) : MultiReviewResponse;
		decode64(buffer: string) : MultiReviewResponse;
		StatusCodes: MultiReviewResponse.StatusCodes;
		
	}	
}

declare module datariver.MultiReviewResponse {
	export const enum StatusCodes {
		UNUSED = 0,
		SUCCESS = 1,
		ERROR = 2,
		REJECTED = 3,
		NOT_FOUND = 4,
		
	}
}

declare module datariver {

	export interface GetReviewRequest extends ProtoBufModel {
		review_id?: string;
		
	}
	
	export interface GetReviewRequestBuilder {
		new(): GetReviewRequest;
		decode(buffer: ArrayBuffer) : GetReviewRequest;
		//decode(buffer: NodeBuffer) : GetReviewRequest;
		//decode(buffer: ByteArrayBuffer) : GetReviewRequest;
		decode64(buffer: string) : GetReviewRequest;
		
	}	
}

declare module datariver {

	export interface DeleteReviewRequest extends ProtoBufModel {
		review_id?: string;
		
	}
	
	export interface DeleteReviewRequestBuilder {
		new(): DeleteReviewRequest;
		decode(buffer: ArrayBuffer) : DeleteReviewRequest;
		//decode(buffer: NodeBuffer) : DeleteReviewRequest;
		//decode(buffer: ByteArrayBuffer) : DeleteReviewRequest;
		decode64(buffer: string) : DeleteReviewRequest;
		
	}	
}

declare module datariver {

	export interface ListReviewsRequest extends ProtoBufModel {
		listing_id?: string;
		listing_external_id?: string;
		offset?: number;
		page_size?: number;
		
	}
	
	export interface ListReviewsRequestBuilder {
		new(): ListReviewsRequest;
		decode(buffer: ArrayBuffer) : ListReviewsRequest;
		//decode(buffer: NodeBuffer) : ListReviewsRequest;
		//decode(buffer: ByteArrayBuffer) : ListReviewsRequest;
		decode64(buffer: string) : ListReviewsRequest;
		
	}	
}
