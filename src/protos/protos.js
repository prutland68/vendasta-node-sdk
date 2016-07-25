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
exports.Empty = exports.reviewProto.google.protobuf.Empty;
exports.ListingService = exports.listingProto.datariver.ListingService;
exports.Listing = exports.listingProto.datariver.Listing;
exports.ListReviewsResponse = exports.reviewProto.datariver.ListReviewsResponse;
exports.ReviewService = exports.reviewProto.datariver.ReviewService;
exports.ListReviewsResponse = exports.reviewProto.datariver.ListReviewsResponse;
exports.Review = exports.reviewProto.datariver.Review;
exports.Geo = exports.listingProto.datariver.Geo;
//# sourceMappingURL=protos.js.map