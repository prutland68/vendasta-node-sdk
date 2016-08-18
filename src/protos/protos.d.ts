/// <reference path="listing.d.ts" />
/// <reference path="review.d.ts" />
export declare const listingProto: any;
export declare const reviewProto: any;
export interface Listing extends vendasta.listings.Listing {
    constructor: {
        new (): Listing;
    };
}
export interface Review extends vendasta.listings.Review {
    constructor: {
        new (): Review;
    };
}
export interface Geo extends vendasta.listings.Geo {
    constructor: {
        new (): Geo;
    };
}
export interface Empty extends vendasta.listings.Empty {
    constructor: {
        new (): Empty;
    };
}
export interface Timestamp extends vendasta.listings.Timestamp {
    constructor: {
        new (): Timestamp;
    };
}
export interface ListReviewsResponse extends vendasta.listings.ListReviewsResponse {
    constructor: {
        new (): ListReviewsResponse;
    };
}
export interface ListReviewsRequest extends vendasta.listings.ListReviewsRequest {
    constructor: {
        new (): ListReviewsRequest;
    };
}
export interface GetListingRequest extends vendasta.listings.GetListingRequest {
    constructor: {
        new (): GetListingRequest;
    };
}
export interface DeleteListingRequest extends vendasta.listings.DeleteListingRequest {
    constructor: {
        new (): DeleteListingRequest;
    };
}
export interface GetReviewRequest extends vendasta.listings.GetReviewRequest {
    constructor: {
        new (): GetReviewRequest;
    };
}
export interface DeleteReviewRequest extends vendasta.listings.DeleteReviewRequest {
    constructor: {
        new (): DeleteReviewRequest;
    };
}
export interface ListingService extends vendasta.listings.ListingService {
    constructor: {
        new (): ListingService;
    };
}
export interface ReviewService extends vendasta.listings.ReviewService {
    constructor: {
        new (): ReviewService;
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
