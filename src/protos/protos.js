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
exports.ListingService = exports.listingProto.datariver.ListingService;
exports.Listing = exports.listingProto.datariver.Listing;
exports.ListReviewsResponse = exports.reviewProto.datariver.ListReviewsResponse;
exports.Geo = exports.listingProto.datariver.Geo;
exports.ReviewService = exports.reviewProto.datariver.ReviewService;
exports.Review = exports.reviewProto.datariver.Review;
exports.ListReviewsRequest = exports.reviewProto.datariver.ListReviewsRequest;
//# sourceMappingURL=protos.js.map