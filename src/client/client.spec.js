"use strict";
var _this = this;
/// <reference path="../protos/datariver.d.ts" />
var client_1 = require("./client");
var client_2 = require("./client");
var index_1 = require('../index');
var mockedDatariverService = (function () {
    function mockedDatariverService() {
        var _this = this;
        this.error = null;
        this.listingResponse = {};
        this.getListing = function (listingId, callback) {
            callback(_this.error, _this.listingResponse);
        };
        this.deleteListing = function (listingId, callback) {
            callback(_this.error, _this.listingResponse);
        };
        this.putListing = function (listing, callback) {
            callback(_this.error, _this.listingResponse);
        };
    }
    return mockedDatariverService;
}());
describe('Client tests', function () {
    beforeEach(function () {
        _this.mockedService = new mockedDatariverService();
        _this.client = new client_1.Client(client_2.Environment.TEST, "fake-token", _this.mockedService);
        _this.callbackOwner = {
            callback: jasmine.createSpy('callback spy'),
        };
    });
    describe("getListing tests", function () {
        it('Should call my callback method with the returned listing.', function () {
            _this.client.getListing("fake listing id", _this.callbackOwner.callback);
            expect(_this.callbackOwner.callback.wasCalled).toBeTruthy();
        });
        it('Should pass the main error into the callback if the main error exists.', function () {
            _this.mockedService.error = "Error!";
            _this.client.getListing("fake listing id", _this.callbackOwner.callback);
            expect(_this.callbackOwner.callback).toHaveBeenCalledWith('Error!', undefined);
        });
        it("Should pass the listingResponse's error into the callback if the main error doesn't exist.", function () {
            _this.mockedService.listingResponse.error = "ListingResponse error!";
            _this.client.getListing("fake listing id", _this.callbackOwner.callback);
            expect(_this.callbackOwner.callback).toHaveBeenCalledWith('ListingResponse error!', undefined);
        });
        it("Should pass the listing from the ListingResponse to the callback", function () {
            var fakeListing = new index_1.Listing();
            _this.mockedService.listingResponse.listing = fakeListing;
            _this.client.getListing("fake listing id", _this.callbackOwner.callback);
            expect(_this.callbackOwner.callback).toHaveBeenCalledWith(null, fakeListing);
        });
        it("should not crash if callback is null", function () {
            expect(_this.client.getListing).not.toThrow(Error);
            _this.client.getListing("fake listing id", _this.callbackOwner.callback);
        });
    });
    describe("deleteListing tests.", function () {
        it('Should call my callback method with the returned listing.', function () {
            _this.client.deleteListing("fake listing id", _this.callbackOwner.callback);
            expect(_this.callbackOwner.callback.wasCalled).toBeTruthy();
        });
        it('Should pass the main error into the callback if the main error exists.', function () {
            _this.mockedService.error = "Error!";
            _this.client.deleteListing("fake listing id", _this.callbackOwner.callback);
            expect(_this.callbackOwner.callback).toHaveBeenCalledWith('Error!', undefined);
        });
        it("Should pass the listingResponse's error into the callback if the main error doesn't exist.", function () {
            _this.mockedService.listingResponse.error = "ListingResponse error!";
            _this.client.deleteListing("fake listing id", _this.callbackOwner.callback);
            expect(_this.callbackOwner.callback).toHaveBeenCalledWith('ListingResponse error!', undefined);
        });
        it("Should pass the listing from the ListingResponse to the callback", function () {
            var fakeListing = new index_1.Listing();
            _this.mockedService.listingResponse.listing = fakeListing;
            _this.client.deleteListing("fake listing id", _this.callbackOwner.callback);
            expect(_this.callbackOwner.callback).toHaveBeenCalledWith(null, fakeListing);
        });
        it("should not crash if callback is null", function () {
            expect(_this.client.deleteListing).not.toThrow(Error);
            _this.client.deleteListing("fake listing id", _this.callbackOwner.callback);
        });
    });
    describe("putListing tests.", function () {
        beforeEach(function () {
            _this.fakeListing = new index_1.Listing();
        });
        it('Should call my callback method with the returned listing.', function () {
            _this.client.putListing(_this.fakeListing, _this.callbackOwner.callback);
            expect(_this.callbackOwner.callback.wasCalled).toBeTruthy();
        });
        it('Should pass the main error into the callback if the main error exists.', function () {
            _this.mockedService.error = "Error!";
            _this.client.putListing(_this.fakeListing, _this.callbackOwner.callback);
            expect(_this.callbackOwner.callback).toHaveBeenCalledWith('Error!', undefined);
        });
        it("Should pass the listingResponse's error into the callback if the main error doesn't exist.", function () {
            _this.mockedService.listingResponse.error = "ListingResponse error!";
            _this.client.putListing(_this.fakeListing, _this.callbackOwner.callback);
            expect(_this.callbackOwner.callback).toHaveBeenCalledWith('ListingResponse error!', undefined);
        });
        it("Should pass the listing from the ListingResponse to the callback", function () {
            _this.mockedService.listingResponse.listing = _this.fakeListing;
            _this.client.putListing(_this.fakeListing, _this.callbackOwner.callback);
            expect(_this.callbackOwner.callback).toHaveBeenCalledWith(null, _this.fakeListing);
        });
        it("should not crash if callback is null", function () {
            expect(_this.client.putListing).not.toThrow(Error);
            _this.client.putListing(_this.fakeListing, _this.callbackOwner.callback);
        });
    });
});
//# sourceMappingURL=client.spec.js.map