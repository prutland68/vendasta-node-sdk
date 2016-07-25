/// <reference path="listing.d.ts" />
/// <reference path="review.d.ts" />
import datariver = Proto2TypeScript.datariver;
import protobuf = Proto2TypeScript.google.protobuf;
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
export interface Empty extends protobuf.Empty {
    constructor: {
        new (): Empty;
    };
}
export interface ListReviewsResponse extends datariver.ListReviewsResponse {
    constructor: {
        new (): ListReviewsResponse;
    };
}
export declare const Empty: any;
export declare const ListingService: any;
export declare const Listing: any;
export declare const ListReviewsResponse: any;
export declare const ReviewService: any;
export declare const Review: any;
export declare const Geo: any;
