/// <reference path="listing.d.ts" />
/// <reference path="review.d.ts" />
import datariver = Proto2TypeScript.datariver;
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
export declare const Listing: any;
export declare const Review: any;
export declare const Geo: any;
