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
        this.getListing = function (listingId, callback) {
            return _this.listingService.get(listingId, function (error, listing) {
                // error.toString() returns just the error message.
                if (callback) {
                    if (error)
                        error = error.toString();
                    callback(error, listing);
                }
            });
        };
        this.deleteListing = function (listingId, callback) {
            return _this.listingService.delete(listingId, function (error, emptyResponse) {
                // error.toString() returns just the error message.
                if (callback) {
                    if (error)
                        error = error.toString();
                    callback(error, emptyResponse);
                }
            });
        };
        this.putListing = function (listing, callback) {
            return _this.listingService.put(listing, function (error, listing) {
                // error.toString() returns just the error message.
                if (callback) {
                    if (error)
                        error = error.toString();
                    callback(error, listing);
                }
            });
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
            this.address = "localhost:9090";
        }
        this.metaData.add('token', token);
        var callCredentials = this.getCallCredentials(this.metaData);
        this.listingService = listingService || new protos_1.ListingService(this.address, callCredentials);
        this.reviewService = reviewService || new protos_1.ReviewService(this.address, callCredentials);
    }
    Client.prototype.getCallCredentials = function (metadata) {
        var creds = grpc.credentials.createSsl();
        var callCreds = grpc.credentials.createFromMetadataGenerator(function (serviceUrl, callback) {
            callback(null, metadata);
        });
        return grpc.credentials.combineChannelCredentials(creds, callCreds);
    };
    return Client;
}());
exports.Client = Client;
//# sourceMappingURL=client.js.map