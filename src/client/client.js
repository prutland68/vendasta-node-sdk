"use strict";
var grpc = require("grpc");
var protos_1 = require('../protos/protos');
var ListingService = protos_1.listingProto.datariver.ListingService;
var ReviewService = protos_1.reviewProto.datariver.ReviewService;
(function (Environment) {
    Environment[Environment["TEST"] = 1] = "TEST";
    Environment[Environment["PRODUCTION"] = 2] = "PRODUCTION";
})(exports.Environment || (exports.Environment = {}));
var Environment = exports.Environment;
var Client = (function () {
    function Client(environment, token, listingService, reviewService) {
        var _this = this;
        if (listingService === void 0) { listingService = undefined; }
        if (reviewService === void 0) { reviewService = undefined; }
        this.environment = environment;
        this.token = token;
        this.metaData = new grpc.Metadata();
        this.getListingService = function (metadata, address) {
            //const creds = grpc.credentials.createSsl();
            //const callCreds = grpc.credentials.createFromMetadataGenerator(
            //    (serviceUrl:string, callback:any) => {
            //        callback(null, metadata)
            //    }
            //);
            //const combinedCreds = grpc.credentials.combineChannelCredentials(creds, callCreds);
            var combinedCreds = grpc.credentials.createInsecure();
            return new ListingService(address, combinedCreds);
        };
        this.getReviewService = function (metadata, address) {
            //const creds = grpc.credentials.createSsl();
            //
            //const callCreds = grpc.credentials.createFromMetadataGenerator(
            //    (serviceUrl:string, callback:any) => {
            //        callback(null, metadata)
            //    }
            //);
            //const combinedCreds = grpc.credentials.combineChannelCredentials(creds, callCreds);
            var combinedCreds = grpc.credentials.createInsecure();
            return new ReviewService(address, combinedCreds);
        };
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
        //private getReviewService = (metadata: any, address: string) => {
        //    const creds = grpc.credentials.createSsl();
        //
        //    const callCreds = grpc.credentials.createFromMetadataGenerator(
        //        (serviceUrl:string, callback:any) => {
        //            callback(null, metadata)
        //        }
        //    );
        //    const combinedCreds = grpc.credentials.combineChannelCredentials(creds, callCreds);
        //    return new ReviewService(address, combinedCreds);
        //};
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
        if (environment == Environment.PRODUCTION) {
            throw new Error("Production not available yet.");
        }
        else {
            this.address = "localhost:9090";
        }
        this.metaData.add('token', token);
        this.listingService = this.getListingService(this.metaData, this.address);
        this.reviewService = reviewService || this.getReviewService(this.metaData, this.address);
    }
    return Client;
}());
exports.Client = Client;
;
//# sourceMappingURL=client.js.map