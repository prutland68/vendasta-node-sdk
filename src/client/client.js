"use strict";
/// <reference path="../protos/datariver.d.ts" />
var grpc = require("grpc");
var protos_1 = require('../protos/protos');
var DatariverService = protos_1.datariverProto.datariver.DataRiver;
(function (Environment) {
    Environment[Environment["TEST"] = 1] = "TEST";
    Environment[Environment["PRODUCTION"] = 2] = "PRODUCTION";
})(exports.Environment || (exports.Environment = {}));
var Environment = exports.Environment;
var Client = (function () {
    function Client(environment, token, service) {
        var _this = this;
        if (service === void 0) { service = null; }
        this.environment = environment;
        this.token = token;
        this.metaData = new grpc.Metadata();
        this.getDatariverService = function (metadata, address) {
            var creds = grpc.credentials.createSsl();
            var callCreds = grpc.credentials.createFromMetadataGenerator(function (serviceUrl, callback) {
                callback(null, metadata);
            });
            var combinedCreds = grpc.credentials.combineChannelCredentials(creds, callCreds);
            return new DatariverService(address, combinedCreds);
        };
        this.getListing = function (listingId, callback) {
            return _this.datariverService.getListing(listingId, function (error, listingResponse) {
                if (!error) {
                    error = listingResponse.error || null;
                }
                if (callback) {
                    callback(error, listingResponse.listing);
                }
            });
        };
        this.deleteListing = function (listingId, callback) {
            return _this.datariverService.deleteListing(listingId, function (error, listingResponse) {
                if (!error) {
                    error = listingResponse.error || null;
                }
                if (callback) {
                    callback(error, listingResponse.listing);
                }
            });
        };
        this.putListing = function (listing, callback) {
            return _this.datariverService.putListing(listing, function (error, listingResponse) {
                if (!error) {
                    error = listingResponse.error || null;
                }
                if (callback) {
                    callback(error, listingResponse.listing);
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
        this.datariverService = service || this.getDatariverService(this.metaData, this.address);
    }
    return Client;
}());
exports.Client = Client;
//# sourceMappingURL=client.js.map