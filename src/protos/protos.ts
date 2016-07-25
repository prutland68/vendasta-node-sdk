/// <reference path="./listing.d.ts" />
/// <reference path="./review.d.ts" />

import datariver = Proto2TypeScript.datariver;
const grpc = require("grpc");

export const listingProto = grpc.load({
    root: __dirname,
    file: "listing.proto"
});

export const reviewProto = grpc.load({
    root: __dirname,
    file: "review.proto"
});

export interface Listing extends datariver.Listing {
    constructor:{ new():Listing };
}
export interface Review extends datariver.Review {
    constructor:{ new():Review };
}
export interface Geo extends datariver.Geo {
    constructor:{ new():Geo };
}


export const ListingService = listingProto.datariver.ListingService;
export const ListingResponse = listingProto.datariver.ListingResponse;
export const Listing = listingProto.datariver.Listing;
export const ReviewResponse = reviewProto.datariver.ReviewResponse;
export const ReviewService = reviewProto.datariver.ReviewService;
export const ListReviewsResponse = reviewProto.datariver.ListReviewsResponse;
export const Review = reviewProto.datariver.Review;
export const Geo = listingProto.datariver.Geo;
