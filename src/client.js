"use strict";
/// <reference path="../typings/index.d.ts" />
/// <reference path="./protos/datariver.d.ts" />
var grpc = require("grpc");
var protos_1 = require('./protos/protos');
var DatariverService = protos_1.datariverProto.datariver.DataRiver;
(function (Environment) {
    Environment[Environment["TEST"] = 1] = "TEST";
    Environment[Environment["PRODUCTION"] = 2] = "PRODUCTION";
})(exports.Environment || (exports.Environment = {}));
var Environment = exports.Environment;
var Client = (function () {
    function Client(environment, token) {
        var _this = this;
        this.environment = environment;
        this.token = token;
        this.metaData = new grpc.Metadata();
        this.getListing = function (listingId, callback) {
            return _this.datariverService.getListing(listingId, function (error, listingResponse) {
                if (!error) {
                    error = listingResponse.error;
                }
                callback(error, listingResponse.listing);
            });
        };
        this.deleteListing = function (listingId, callback) {
            return _this.datariverService.deleteListing(listingId, function (error, listingResponse) {
                if (!error) {
                    error = listingResponse.error;
                }
                callback(error, listingResponse.listing);
            });
        };
        this.putListing = function (listing, callback) {
            return _this.datariverService.putListing(listing, function (error, listingResponse) {
                if (!error) {
                    error = listingResponse.error;
                }
                callback(error, listingResponse.listing);
            });
        };
        if (environment == Environment.PRODUCTION) {
            throw new Error("Production not available yet.");
        }
        else {
            this.address = "directory-sandbox.vendasta.com:23000"; // assume test
        }
        this.metaData.add('token', token);
        var creds = grpc.credentials.createSsl();
        var callCreds = grpc.credentials.createFromMetadataGenerator(function (serviceUrl, callback) {
            callback(null, _this.metaData);
        });
        var combinedCreds = grpc.credentials.combineChannelCredentials(creds, callCreds);
        this.datariverService = new DatariverService(this.address, combinedCreds);
    }
    return Client;
}());
exports.Client = Client;
//# sourceMappingURL=client.js.map