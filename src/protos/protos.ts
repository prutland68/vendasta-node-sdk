/// <reference path="./listing.d.ts" />
/// <reference path="./review.d.ts" />

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

export interface Empty extends datariver.Empty {
    constructor:{ new():Empty };
}

export interface Timestamp extends datariver.Timestamp {
    constructor:{ new():Timestamp };
}

export interface ListReviewsResponse extends datariver.ListReviewsResponse {
    constructor:{ new():ListReviewsResponse };
}

export interface ListReviewsRequest extends datariver.ListReviewsRequest {
    constructor:{ new():ListReviewsRequest}
}

export interface GetListingRequest extends datariver.GetListingRequest {
     constructor:{ new():GetListingRequest}
}

export interface DeleteListingRequest extends datariver.DeleteListingRequest {
     constructor:{ new():DeleteListingRequest}
}

export interface GetReviewRequest extends datariver.GetReviewRequest {
     constructor:{ new():GetReviewRequest}
}

export interface DeleteReviewRequest extends datariver.DeleteReviewRequest {
     constructor:{ new():DeleteReviewRequest}
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



