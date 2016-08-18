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

export interface Listing extends vendasta.listings.Listing {
    constructor:{ new():Listing };
}
export interface Review extends vendasta.listings.Review {
    constructor:{ new():Review };
}
export interface Geo extends vendasta.listings.Geo {
    constructor:{ new():Geo };
}

export interface Empty extends vendasta.listings.Empty {
    constructor:{ new():Empty };
}

export interface Timestamp extends vendasta.listings.Timestamp {
    constructor:{ new():Timestamp };
}

export interface ListReviewsResponse extends vendasta.listings.ListReviewsResponse {
    constructor:{ new():ListReviewsResponse };
}

export interface ListReviewsRequest extends vendasta.listings.ListReviewsRequest {
    constructor:{ new():ListReviewsRequest}
}

export interface GetListingRequest extends vendasta.listings.GetListingRequest {
     constructor:{ new():GetListingRequest}
}

export interface DeleteListingRequest extends vendasta.listings.DeleteListingRequest {
     constructor:{ new():DeleteListingRequest}
}

export interface GetReviewRequest extends vendasta.listings.GetReviewRequest {
     constructor:{ new():GetReviewRequest}
}

export interface DeleteReviewRequest extends vendasta.listings.DeleteReviewRequest {
     constructor:{ new():DeleteReviewRequest}
}

export interface ListingService extends vendasta.listings.ListingService {
    constructor:{ new():ListingService}
}

export interface ReviewService extends vendasta.listings.ReviewService {
    constructor:{ new():ReviewService}
}

export const Timestamp = reviewProto.google.protobuf.Timestamp;
export const Empty = reviewProto.google.protobuf.Empty;

export const ListingService = listingProto.vendasta.listings.ListingService;
export const Listing = listingProto.vendasta.listings.Listing;
export const GetListingRequest = listingProto.vendasta.listings.GetListingRequest;
export const DeleteListingRequest = listingProto.vendasta.listings.DeleteListingRequest;
export const Geo = listingProto.vendasta.listings.Geo;


export const ReviewService = reviewProto.vendasta.listings.ReviewService;
export const Review = reviewProto.vendasta.listings.Review;
export const GetReviewRequest = reviewProto.vendasta.listings.GetReviewRequest;
export const DeleteReviewRequest = reviewProto.vendasta.listings.DeleteReviewRequest;
export const ListReviewsRequest = reviewProto.vendasta.listings.ListReviewsRequest;
export const ListReviewsResponse = reviewProto.vendasta.listings.ListReviewsResponse;



