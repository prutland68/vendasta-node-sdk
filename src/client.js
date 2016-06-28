"use strict";
/// <reference path="../typings/index.d.ts" />
var grpc = require("grpc");
var datariverProto = grpc.load({
    root: __dirname,
    file: "datariver.proto"
});
var DatariverService = datariverProto.datariver.DataRiver;
var Client = (function () {
    function Client(address, token) {
        var _this = this;
        this.address = address;
        this.token = token;
        this.metaData = new grpc.Metadata();
        this.getListing = function (listingId, callback) {
            _this.datariverService.getListing(listingId, callback);
        };
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