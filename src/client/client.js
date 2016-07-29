"use strict";
var grpc = require("grpc");
var protos_1 = require('../protos/protos');
(function (Environment) {
    Environment[Environment["TEST"] = 1] = "TEST";
    Environment[Environment["PRODUCTION"] = 2] = "PRODUCTION";
})(exports.Environment || (exports.Environment = {}));
var Environment = exports.Environment;
var Client = (function () {
    /**
     *
     * @param environment: Environment.TEST or Environment.PRODUCTION. (Production not implemented yet).
     * @param token: Token provided by us.
     */
    function Client(environment, token, listingService, reviewService) {
        var _this = this;
        if (listingService === void 0) { listingService = null; }
        if (reviewService === void 0) { reviewService = null; }
        this.environment = environment;
        this.token = token;
        this.metaData = new grpc.Metadata();
        /** Get a listing by listingId
         * @param listingId: The listingId of the listing.
         * @param callback: Callback is called when the listing is retrieved.
         *                  Should be of the form function(error: string, listing: Listing)
         */
        this.getListing = function (listingId, callback) {
            var request = new protos_1.GetListingRequest();
            request.listing_id = listingId;
            return _this.listingService.get(listingId, function (error, listing) {
                if (callback) {
                    if (error)
                        error = error.toString();
                    callback(error, listing);
                }
            });
        };
        /** Delete the listing with the given listingId
         * @param listingId: The listingId of the listing to delete.
         * @param callback: Callback is called when the listing is retrieved.
         *                  Should be of the form function(error: string, empty: Empty)
         */
        this.deleteListing = function (listingId, callback) {
            var request = new protos_1.DeleteListingRequest();
            request.listing_id = listingId;
            return _this.listingService.delete(request, function (error, emptyResponse) {
                if (callback) {
                    if (error)
                        error = error.toString();
                    callback(error, emptyResponse);
                }
            });
        };
        /** Save the listing.
         * @param listing: A Listing object. (url, external_id are required).
         * @param callback Callback is called when the listing is retrieved.
         *                 Should be of the form function(error: string, listing: Listing)
         */
        this.putListing = function (listing, callback) {
            return _this.listingService.put(listing, function (error, listing) {
                if (callback) {
                    if (error)
                        error = error.toString();
                    callback(error, listing);
                }
            });
        };
        /** Get the review with the given reviewId
         * @param reviewId: reviewId of the review to retrieve.
         * @param callback: Callback is called when the listing is retrieved.
         *                  Should be of the form function(error: string, review: Review)
         */
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
        /** Delete the review with the given reviewId
         *
         * @param reviewId: reviewId of the review to retrieve.
         * @param callback Callback is called when the listing is retrieved.
         *                 Should be of the form function(error: string, listing: Listing)
         */
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
        /** Save the review.
         * @param review: The Review object to save.
         * @param callback: Callback is called when the listing is retrieved.
         *                  Should be of the form function(error: string, listing: Listing)
         */
        this.putReview = function (review, callback) {
            return _this.reviewService.put(review, function (error, review) {
                if (callback) {
                    if (error)
                        error = error.toString();
                    callback(error, review);
                }
            });
        };
        /** Retrieve the reviews from the given listingId. These should be paged through via offset and page_size.
         * If iterating over all of the reviews, you should call the offset incremented by the page_size on every call.
         * @param listingId: the listingId tied to the review.
         * @param page_size: The number of reviews to return.
         * @param offset: The offset at which to start searching.
         * @param callback: Callback is called when the listing is retrieved.
         *                  Should be of the form function(error: string, listing: Listing)
         */
        this.listReviews = function (listingId, listingExternalId, page_size, offset, callback) {
            var request = new protos_1.ListReviewsRequest();
            if (listingId) {
                request.listing_id = listingId;
            }
            if (listingExternalId) {
                request.listing_external_id = listingExternalId;
            }
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