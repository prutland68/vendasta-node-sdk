/// <reference path="./listing.d.ts" />
/// <reference path="./review.d.ts" />

import datariver = Proto2TypeScript.datariver;
import protobuf = Proto2TypeScript.google.protobuf;

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

export interface Empty extends protobuf.Empty {
    constructor:{ new():Empty };
}

export interface ListReviewsResponse extends datariver.ListReviewsResponse {
    constructor:{ new():ListReviewsResponse };
}

export interface Timestamp extends protobuf.Timestamp {
    constructor:{ new():Timestamp };
}

export const Timestamp = reviewProto.google.protobuf.Timestamp;
export const Empty = reviewProto.google.protobuf.Empty;

export const ListingService = listingProto.datariver.ListingService;
export const Listing = listingProto.datariver.Listing;
export const GetListingRequest = listingProto.datariver.GetListingRequest;
export const DeleteListingRequest = listingProto.datariver.DeleteListingRequest;
export const Geo = listingProto.datariver.Geo;


export const ReviewService = reviewProto.datariver.ReviewService;
export const Review = reviewProto.datariver.Review;
export const GetReviewRequest = reviewProto.datariver.GetReviewRequest;
export const DeleteReviewRequest = reviewProto.datariver.DeleteReviewRequest;
export const ListReviewsRequest = reviewProto.datariver.ListReviewsRequest;
export const ListReviewsResponse = reviewProto.datariver.ListReviewsResponse;



