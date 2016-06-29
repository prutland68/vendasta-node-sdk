"use strict";
var _this = this;
/// <reference path="./protos/datariver.d.ts" />
var client_1 = require("./client");
var client_2 = require("./client");
var protos_1 = require('./protos/protos');
var datariver = protos_1.datariverProto.datariver.DataRiver;
describe('Client tests', function () {
    beforeEach(function () {
        _this.client = new client_1.Client(client_2.Environment.TEST, "fake-token");
    });
    describe("getListing tests", function () {
        it('Should call my callback method with the returned listing.', function () {
            var fakeListing = new datariver.Listing();
            datariver.getListing = jasmine.createSpy("getListing() spy").andReturn(fakeListing);
            _this.client.getListing("fake listing id", function () {
                console.log("I was called");
            });
        });
    });
});
//# sourceMappingURL=client.spec.js.map