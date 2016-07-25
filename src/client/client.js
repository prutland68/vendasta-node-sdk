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
            return _this.listingService.getListing(listingId, function (error, listingResponse) {
                if (!error) {
                    error = listingResponse.error || null;
                }
                if (callback) {
                    callback(error, listingResponse.listing);
                }
            });
        };
        this.deleteListing = function (listingId, callback) {
            return _this.listingService.deleteListing(listingId, function (error, listingResponse) {
                if (!error) {
                    error = listingResponse.error || null;
                }
                if (callback) {
                    callback(error, listingResponse.listing);
                }
            });
        };
        this.putListing = function (listing, callback) {
            return _this.listingService.putListing(listing, function (error, listingResponse) {
                if (!error) {
                    error = listingResponse.error || null;
                }
                if (callback) {
                    callback(error, listingResponse.listing);
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
        this.getReview = function (reviewId, listingId, callback) {
            return _this.reviewService.get(reviewId, listingId, function (error, review) {
                // TODO: is this the right context, that we set with GRPC?
                // if (!error) {
                //     error = context.error || null;
                // }
                if (callback) {
                    callback(error, review);
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