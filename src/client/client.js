"use strict";
var grpc = require("grpc");
var protos_1 = require('../protos/protos');
(function (Environment) {
    Environment[Environment["TEST"] = 1] = "TEST";
    Environment[Environment["PRODUCTION"] = 2] = "PRODUCTION";
})(exports.Environment || (exports.Environment = {}));
var Environment = exports.Environment;
var Client = (function () {
    function Client(environment, token, listingService, reviewService) {
        var _this = this;
        if (listingService === void 0) { listingService = null; }
        if (reviewService === void 0) { reviewService = null; }
        this.environment = environment;
        this.token = token;
        this.metaData = new grpc.Metadata();
        this.getListingService = function (metadata, address) {
            var creds = grpc.credentials.createSsl();
            var callCreds = grpc.credentials.createFromMetadataGenerator(function (serviceUrl, callback) {
                callback(null, metadata);
            });
            var combinedCreds = grpc.credentials.combineChannelCredentials(creds, callCreds);
            return new protos_1.ListingService(address, combinedCreds);
        };
        this.getListing = function (listingId, callback) {
            return _this.listingService.getListing(listingId, function (error, listing) {
                // if (!error) {
                //     error = listing.error || null;
                // }
                if (callback) {
                    callback(error, listing);
                }
            });
        };
        this.deleteListing = function (listingId, callback) {
            return _this.listingService.deleteListing(listingId, function (error, listing) {
                // if (!error) {
                //     error = listing.error || null;
                // }
                if (callback) {
                    callback(error, listing);
                }
            });
        };
        this.putListing = function (listing, callback) {
            return _this.listingService.putListing(listing, function (error, listing) {
                // if (!error) {
                //     error = listing.error || null;
                // }
                if (callback) {
                    callback(error, listing);
                }
            });
        };
        this.getReviewService = function (metadata, address) {
            var creds = grpc.credentials.createSsl();
            var callCreds = grpc.credentials.createFromMetadataGenerator(function (serviceUrl, callback) {
                callback(null, metadata);
            });
            var combinedCreds = grpc.credentials.combineChannelCredentials(creds, callCreds);
            return new protos_1.ReviewService(address, combinedCreds);
        };
        this.getReview = function (reviewId, callback) {
            return _this.reviewService.get(reviewId, function (error, review) {
                if (callback) {
                    if (error)
                        error = error.toString();
                    callback(error, review);
                }
            });
        };
        this.deleteReview = function (reviewId, callback) {
            return _this.reviewService.delete(reviewId, function (error, review) {
                if (callback) {
                    if (error)
                        error = error.toString();
                    callback(error, review);
                }
            });
        };
        this.putReview = function (review, callback) {
            return _this.reviewService.put(review, function (error, review) {
                if (callback) {
                    if (error)
                        error = error.toString();
                    callback(error, review);
                }
            });
        };
        this.listReviews = function (listingId, callback) {
            return _this.reviewService.list(listingId, function (error, reviews) {
                if (callback) {
                    if (error)
                        error = error.toString();
                    callback(error, reviews);
                }
            });
        };
        if (environment == Environment.PRODUCTION) {
            throw new Error("Production not available yet.");
        }
        else {
            this.address = "directory-sandbox.vendasta.com:23000"; // assume test
        }
        this.metaData.add('token', token);
        this.listingService = listingService || this.getListingService(this.metaData, this.address);
        this.reviewService = reviewService || this.getReviewService(this.metaData, this.address);
    }
    return Client;
}());
exports.Client = Client;
//# sourceMappingURL=client.js.map