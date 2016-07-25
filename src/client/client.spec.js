"use strict";
var _this = this;
var client_1 = require("./client");
var protos_1 = require('../protos/protos');
var mockedListingService = (function () {
    function mockedListingService() {
        var _this = this;
        this.error = null;
        this.listingResponse = {};
        this.get = function (listingId, callback) {
            callback(_this.error, _this.listingResponse);
        };
        this.delete = function (listingId, callback) {
            callback(_this.error, _this.listingResponse);
        };
        this.put = function (listing, callback) {
            callback(_this.error, _this.listingResponse);
        };
    }
    return mockedListingService;
}());
var mockedReviewService = (function () {
    function mockedReviewService() {
        var _this = this;
        this.error = null;
        this.listingResponse = {};
        this.get = function (reviewId, listingId, callback) {
            callback(_this.error, _this.listingResponse);
        };
    }
    return mockedReviewService;
}());
describe('Client tests', function () {
    beforeEach(function () {
        _this.mockedListingService = new mockedListingService();
        _this.mockedReviewService = new mockedReviewService();
        _this.client = new client_1.Client(client_1.Environment.TEST, "fake-token", _this.mockedListingService, _this.mockedReviewService);
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
            _this.mockedListingService.error = "Error!";
            _this.client.getListing("fake listing id", _this.callbackOwner.callback);
            expect(_this.callbackOwner.callback).toHaveBeenCalledWith('Error!', undefined);
        });
        it("Should pass the listingResponse's error into the callback if the main error doesn't exist.", function () {
            _this.mockedListingService.listingResponse.error = "ListingResponse error!";
            _this.client.getListing("fake listing id", _this.callbackOwner.callback);
            expect(_this.callbackOwner.callback).toHaveBeenCalledWith('ListingResponse error!', undefined);
        });
        it("Should pass the listing from the ListingResponse to the callback", function () {
            var fakeListing = new protos_1.Listing();
            _this.mockedListingService.listingResponse.listing = fakeListing;
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
            _this.mockedListingService.error = "Error!";
            _this.client.deleteListing("fake listing id", _this.callbackOwner.callback);
            expect(_this.callbackOwner.callback).toHaveBeenCalledWith('Error!', undefined);
        });
        it("Should pass the listingResponse's error into the callback if the main error doesn't exist.", function () {
            _this.mockedListingService.listingResponse.error = "ListingResponse error!";
            _this.client.deleteListing("fake listing id", _this.callbackOwner.callback);
            expect(_this.callbackOwner.callback).toHaveBeenCalledWith('ListingResponse error!', undefined);
        });
        it("Should pass the listing from the ListingResponse to the callback", function () {
            var fakeListing = new protos_1.Listing();
            _this.mockedListingService.listingResponse.listing = fakeListing;
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
            _this.fakeListing = new protos_1.Listing();
        });
        it('Should call my callback method with the returned listing.', function () {
            _this.client.putListing(_this.fakeListing, _this.callbackOwner.callback);
            expect(_this.callbackOwner.callback.wasCalled).toBeTruthy();
        });
        it('Should pass the main error into the callback if the main error exists.', function () {
            _this.mockedListingService.error = "Error!";
            _this.client.putListing(_this.fakeListing, _this.callbackOwner.callback);
            expect(_this.callbackOwner.callback).toHaveBeenCalledWith('Error!', undefined);
        });
        it("Should pass the listingResponse's error into the callback if the main error doesn't exist.", function () {
            _this.mockedListingService.listingResponse.error = "ListingResponse error!";
            _this.client.putListing(_this.fakeListing, _this.callbackOwner.callback);
            expect(_this.callbackOwner.callback).toHaveBeenCalledWith('ListingResponse error!', undefined);
        });
        it("Should pass the listing from the ListingResponse to the callback", function () {
            _this.mockedListingService.listingResponse.listing = _this.fakeListing;
            _this.client.putListing(_this.fakeListing, _this.callbackOwner.callback);
            expect(_this.callbackOwner.callback).toHaveBeenCalledWith(null, _this.fakeListing);
        });
        it("should not crash if callback is null", function () {
            expect(_this.client.putListing).not.toThrow(Error);
            _this.client.putListing(_this.fakeListing, _this.callbackOwner.callback);
        });
    });
    describe("getReview tests", function () {
        it('Should call my callback method with the returned review.', function () {
            _this.client.getReview("review-id", "listing-id", _this.callbackOwner.callback);
            expect(_this.callbackOwner.callback.wasCalled).toBeTruthy();
        });
        // it('Should pass the main error into the callback if the main error exists.', () => {
        //     this.mockedReviewService.error = "Error!";
        //     this.client.getListing("fake listing id", this.callbackOwner.callback);
        //     expect(this.callbackOwner.callback).toHaveBeenCalledWith('Error!', undefined);
        // });
        // it("Should pass the listingResponse's error into the callback if the main error doesn't exist.", () => {
        //     this.mockedReviewService.listingResponse.error = "ListingResponse error!";
        //     this.client.getListing("fake listing id", this.callbackOwner.callback);
        //     expect(this.callbackOwner.callback).toHaveBeenCalledWith('ListingResponse error!', undefined);
        // });
        // it("Should pass the listing from the ListingResponse to the callback", () => {
        //     let fakeListing = <Listing> new Listing();
        //     this.mockedReviewService.listingResponse.listing = fakeListing;
        //     this.client.getListing("fake listing id", this.callbackOwner.callback);
        //     expect(this.callbackOwner.callback).toHaveBeenCalledWith(null, fakeListing);
        // });
        // it("should not crash if callback is null",() => {
        //     expect(this.client.getListing).not.toThrow(Error);
        //     this.client.getListing("fake listing id", this.callbackOwner.callback);
        // });
    });
});
//# sourceMappingURL=client.spec.js.map