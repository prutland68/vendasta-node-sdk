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
            var request = new protos_1.GetListingRequest();
            request.listing_id = listingId;
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
            var request = new protos_1.DeleteListingRequest();
            request.listing_id = listingId;
            return _this.listingService.delete(request, function (error, emptyResponse) {
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
            var request = new protos_1.GetReviewRequest();
            request.review_id = reviewId;
            return _this.reviewService.get(request, function (error, review) {
                if (callback) {
                    if (error)
                        error = error.toString();
                    callback(error, review);
                }
            });
        };
        this.deleteReview = function (reviewId, callback) {
            var request = new protos_1.DeleteReviewRequest();
            request.review_id = reviewId;
            return _this.reviewService.delete(request, function (error, review) {
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
        this.listReviews = function (listingId, page_size, offset, callback) {
            var request = new protos_1.ListReviewsRequest();
            request.listing_id = listingId;
            request.page_size = page_size;
            request.offset = offset;
            return _this.reviewService.list(request, function (error, reviewResponse) {
                if (callback) {
                    if (error)
                        error = error.toString();
                    callback(error, reviewResponse.reviews);
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
        var callCredentials = grpc.credentials.createInsecure() || this.getCallCredentials(this.metaData);
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