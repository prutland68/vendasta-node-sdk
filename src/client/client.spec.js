"use strict";
var _this = this;
/// <reference path="../protos/datariver.d.ts" />
var client_1 = require("./client");
var client_2 = require("./client");
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
    describe("getListing tests", function () {
        beforeEach(function () {
            _this.mockedService = new mockedDatariverService();
            _this.mockedClient = new client_1.Client(client_2.Environment.TEST, "fake-token", _this.mockedService);
            _this.callbackOwner = {
                callback: jasmine.createSpy('callback spy'),
            };
        });
        it('Should call my callback method with the returned listing.', function () {
            _this.mockedClient.getListing("fake listing id", _this.callbackOwner.callback);
            expect(_this.callbackOwner.callback.wasCalled).toBeTruthy();
        });
        it('Should pass the main error into the callback if the main error exists.', function () {
            _this.mockedService.error = "Error!";
            _this.mockedClient.getListing("fake listing id", _this.callbackOwner.callback);
            expect(_this.callbackOwner.callback).toHaveBeenCalledWith('Error!', undefined);
        });
        it("Should pass the listingResponse's error into the callback if the main error doesn't exist.", function () {
            _this.mockedService.listingResponse.error = "ListingResponse error!";
            _this.mockedClient.getListing("fake listing id", _this.callbackOwner.callback);
            expect(_this.callbackOwner.callback).toHaveBeenCalledWith('ListingResponse error!', undefined);
        });
    });
});
//# sourceMappingURL=client.spec.js.map