/// <reference path="./listing.d.ts" />
/// <reference path="./review.d.ts" />
"use strict";
var grpc = require("grpc");
exports.listingProto = grpc.load({
    root: __dirname,
    file: "listing.proto"
});
exports.reviewProto = grpc.load({
    root: __dirname,
    file: "review.proto"
});
exports.Timestamp = exports.reviewProto.google.protobuf.Timestamp;
exports.Empty = exports.reviewProto.google.protobuf.Empty;
exports.ListingService = exports.listingProto.vendasta.listings.ListingService;
exports.Listing = exports.listingProto.vendasta.listings.Listing;
exports.GetListingRequest = exports.listingProto.vendasta.listings.GetListingRequest;
exports.DeleteListingRequest = exports.listingProto.vendasta.listings.DeleteListingRequest;
exports.Geo = exports.listingProto.vendasta.listings.Geo;
exports.ReviewService = exports.reviewProto.vendasta.listings.ReviewService;
exports.Review = exports.reviewProto.vendasta.listings.Review;
exports.GetReviewRequest = exports.reviewProto.vendasta.listings.GetReviewRequest;
exports.DeleteReviewRequest = exports.reviewProto.vendasta.listings.DeleteReviewRequest;
exports.ListReviewsRequest = exports.reviewProto.vendasta.listings.ListReviewsRequest;
exports.ListReviewsResponse = exports.reviewProto.vendasta.listings.ListReviewsResponse;
//# sourceMappingURL=protos.js.map