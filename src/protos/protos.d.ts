/// <reference path="listing.d.ts" />
/// <reference path="review.d.ts" />
export declare const listingProto: any;
export declare const reviewProto: any;
export interface Listing extends datariver.Listing {
    constructor: {
        new (): Listing;
    };
}
export interface Review extends datariver.Review {
    constructor: {
        new (): Review;
    };
}
export interface Geo extends datariver.Geo {
    constructor: {
        new (): Geo;
    };
}
export interface Empty extends datariver.Empty {
    constructor: {
        new (): Empty;
    };
}
export interface Timestamp extends datariver.Timestamp {
    constructor: {
        new (): Timestamp;
    };
}
export interface ListReviewsResponse extends datariver.ListReviewsResponse {
    constructor: {
        new (): ListReviewsResponse;
    };
}
export interface ListReviewsRequest extends datariver.ListReviewsRequest {
    constructor: {
        new (): ListReviewsRequest;
    };
}
export interface GetListingRequest extends datariver.GetListingRequest {
    constructor: {
        new (): GetListingRequest;
    };
}
export interface DeleteListingRequest extends datariver.DeleteListingRequest {
    constructor: {
        new (): DeleteListingRequest;
    };
}
export interface GetReviewRequest extends datariver.GetReviewRequest {
    constructor: {
        new (): GetReviewRequest;
    };
}
export interface DeleteReviewRequest extends datariver.DeleteReviewRequest {
    constructor: {
        new (): DeleteReviewRequest;
    };
}
export declare const Timestamp: any;
export declare const Empty: any;
export declare const ListingService: any;
export declare const Listing: any;
export declare const GetListingRequest: any;
export declare const DeleteListingRequest: any;
export declare const Geo: any;
export declare const ReviewService: any;
export declare const Review: any;
export declare const GetReviewRequest: any;
export declare const DeleteReviewRequest: any;
export declare const ListReviewsRequest: any;
export declare const ListReviewsResponse: any;
