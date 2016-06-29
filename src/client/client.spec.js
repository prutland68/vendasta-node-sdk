"use strict";
var _this = this;
/// <reference path="../protos/datariver.d.ts" />
var client_1 = require("./client");
var client_2 = require("./client");
var index_1 = require('../index');
var mockedDatariverService = (function () {
    function mockedDatariverService() {
        this.getListing = function (listingId, callback) {
            callback(null, {});
        };
        this.deleteListing = function (listingId, callback) {
            callback(null, {});
        };
        this.putListing = function (listing, callback) {
            callback(null, {});
        };
    }
    return mockedDatariverService;
}());
describe('Client tests', function () {
    beforeEach(function () {
        _this.client = new client_1.Client(client_2.Environment.TEST, "fake-token", new mockedDatariverService());
    });
    describe("getListing tests", function () {
        it('Should call my callback method with the returned listing.', function () {
            var fakeListing = new index_1.Listing();
            var callbackOwner = {
                callback: jasmine.createSpy('callback spy'),
            };
            _this.client.getListing("fake listing id", callbackOwner.callback);
            expect(callbackOwner.callback.wasCalled).toBeTruthy();
        });
        it('Should pass the main error into the callback if the main error exists.', function () {
            var fakeListing = new index_1.Listing();
            var callbackOwner = {
                callback: jasmine.createSpy('callback spy'),
            };
            spyOn(_this.client, 'getListing').andCallFake(function (listingId, callback) {
                callback('Error!', {});
            });
            _this.client.getListing("fake listing id", callbackOwner.callback);
            expect(callbackOwner.callback).toHaveBeenCalledWith('Error!', {});
        });
        it("Should pass the listingResponse's error into the callback if the main error doesn't exist.", function () {
            var fakeListing = new index_1.Listing();
            var callbackOwner = {
                callback: jasmine.createSpy('callback spy'),
            };
            spyOn(_this.client, 'getListing').andCallFake(function (listingId, callback) {
                callback(null, { error: 'ListingResponse error!' });
            });
            _this.client.getListing("fake listing id", callbackOwner.callback);
            expect(callbackOwner.callback).toHaveBeenCalledWith(null, 'ListingResponse error!');
            // TODO finish writing this properly, so it actually tests the right thing
        });
    });
});
//# sourceMappingURL=client.spec.js.map