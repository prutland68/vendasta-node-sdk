"use strict";
var _this = this;
var client_1 = require("./client");
var protos_1 = require('../protos/protos');
var protos_2 = require("../protos/protos");
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
        this.review = {};
        this.listReviewsResponse = {};
        this.get = function (reviewId, callback) {
            callback(_this.error, _this.review);
        };
        this.delete = function (reviewId, callback) {
            callback(_this.error, _this.review);
        };
        this.put = function (review, callback) {
            callback(_this.error, _this.review);
        };
        this.list = function (listingId, callback) {
            console.log(_this.listReviewsResponse);
            callback(_this.error, _this.listReviewsResponse);
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
    // describe("getListing tests", () => {
    //     it('Should call my callback method with the returned listing.', () => {
    //         this.client.getListing("fake listing id", this.callbackOwner.callback);
    //         expect(this.callbackOwner.callback.wasCalled).toBeTruthy();
    //     });
    //     it('Should pass the main error into the callback if the main error exists.', () => {
    //         this.mockedListingService.error = "Error!";
    //         this.client.getListing("fake listing id", this.callbackOwner.callback);
    //         expect(this.callbackOwner.callback).toHaveBeenCalledWith('Error!', undefined);
    //     });
    //     it("Should pass the listingResponse's error into the callback if the main error doesn't exist.", () => {
    //         this.mockedListingService.listingResponse.error = "ListingResponse error!";
    //         this.client.getListing("fake listing id", this.callbackOwner.callback);
    //         expect(this.callbackOwner.callback).toHaveBeenCalledWith('ListingResponse error!', undefined);
    //     });
    //     it("Should pass the listing from the ListingResponse to the callback", () => {
    //         let fakeListing = <Listing> new Listing();
    //         this.mockedListingService.listingResponse.listing = fakeListing;
    //         this.client.getListing("fake listing id", this.callbackOwner.callback);
    //         expect(this.callbackOwner.callback).toHaveBeenCalledWith(null, fakeListing);
    //     });
    //     it("should not crash if callback is null",() => {
    //         expect(this.client.getListing).not.toThrow(Error);
    //         this.client.getListing("fake listing id", this.callbackOwner.callback);
    //     });
    // });
    // describe("deleteListing tests.", () => {
    //     it('Should call my callback method with the returned listing.', () => {
    //         this.client.deleteListing("fake listing id", this.callbackOwner.callback);
    //         expect(this.callbackOwner.callback.wasCalled).toBeTruthy();
    //     });
    //     it('Should pass the main error into the callback if the main error exists.', () => {
    //         this.mockedListingService.error = "Error!";
    //         this.client.deleteListing("fake listing id", this.callbackOwner.callback);
    //         expect(this.callbackOwner.callback).toHaveBeenCalledWith('Error!', undefined);
    //     });
    //     it("Should pass the listingResponse's error into the callback if the main error doesn't exist.", () => {
    //         this.mockedListingService.listingResponse.error = "ListingResponse error!";
    //         this.client.deleteListing("fake listing id", this.callbackOwner.callback);
    //         expect(this.callbackOwner.callback).toHaveBeenCalledWith('ListingResponse error!', undefined);
    //     });
    //     it("Should pass the listing from the ListingResponse to the callback", () => {
    //         let fakeListing = <Listing> new Listing();
    //         this.mockedListingService.listingResponse.listing = fakeListing;
    //         this.client.deleteListing("fake listing id", this.callbackOwner.callback);
    //         expect(this.callbackOwner.callback).toHaveBeenCalledWith(null, fakeListing);
    //     });
    //     it("should not crash if callback is null",() => {
    //         expect(this.client.deleteListing).not.toThrow(Error);
    //         this.client.deleteListing("fake listing id", this.callbackOwner.callback);
    //     });
    // });
    // describe("putListing tests.", () => {
    //     beforeEach(() => {
    //         this.fakeListing = <Listing> new Listing();
    //     });
    //     it('Should call my callback method with the returned listing.', () => {
    //         this.client.putListing(this.fakeListing, this.callbackOwner.callback);
    //         expect(this.callbackOwner.callback.wasCalled).toBeTruthy();
    //     });
    //     it('Should pass the main error into the callback if the main error exists.', () => {
    //         this.mockedListingService.error = "Error!";
    //         this.client.putListing(this.fakeListing, this.callbackOwner.callback);
    //         expect(this.callbackOwner.callback).toHaveBeenCalledWith('Error!', undefined);
    //     });
    //     it("Should pass the listingResponse's error into the callback if the main error doesn't exist.", () => {
    //         this.mockedListingService.listingResponse.error = "ListingResponse error!";
    //         this.client.putListing(this.fakeListing, this.callbackOwner.callback);
    //         expect(this.callbackOwner.callback).toHaveBeenCalledWith('ListingResponse error!', undefined);
    //     });
    //     it("Should pass the listing from the ListingResponse to the callback", () => {
    //         this.mockedListingService.listingResponse.listing = this.fakeListing;
    //         this.client.putListing(this.fakeListing, this.callbackOwner.callback);
    //         expect(this.callbackOwner.callback).toHaveBeenCalledWith(null, this.fakeListing);
    //     });
    //     it("should not crash if callback is null",() => {
    //         expect(this.client.putListing).not.toThrow(Error);
    //         this.client.putListing(this.fakeListing, this.callbackOwner.callback);
    //     });
    // });
    describe("getReview tests", function () {
        it('Should call my callback method.', function () {
            _this.client.getReview("review-id", _this.callbackOwner.callback);
            expect(_this.callbackOwner.callback.wasCalled).toBeTruthy();
        });
        it('Should pass the error into the callback if the error exists.', function () {
            _this.mockedReviewService.error = "Error!";
            _this.client.getReview(_this.fakeReview, _this.callbackOwner.callback);
            expect(_this.callbackOwner.callback).toHaveBeenCalledWith('Error!', jasmine.any(Object));
        });
        it("Should pass the review to the callback", function () {
            var fakeReview = new protos_1.Review();
            _this.mockedReviewService.review = fakeReview;
            _this.client.getReview("fake review id", _this.callbackOwner.callback);
            expect(_this.callbackOwner.callback).toHaveBeenCalledWith(null, fakeReview);
        });
        it("should not crash if callback is null", function () {
            _this.callbackOwner.callback = null;
            expect(_this.client.getReview).not.toThrow(Error);
            _this.client.getReview("fake review id", _this.callbackOwner.callback);
        });
    });
    describe("deleteReview tests.", function () {
        it('Should call my callback method.', function () {
            _this.client.deleteReview("fake review id", _this.callbackOwner.callback);
            expect(_this.callbackOwner.callback.wasCalled).toBeTruthy();
        });
        it('Should pass the error into the callback if the error exists.', function () {
            _this.mockedReviewService.error = "Error!";
            _this.client.deleteReview(_this.fakeReview, _this.callbackOwner.callback);
            expect(_this.callbackOwner.callback).toHaveBeenCalledWith('Error!', jasmine.any(Object));
        });
        it("Should pass the review to the callback", function () {
            var fakeReview = new protos_1.Review();
            _this.mockedReviewService.review = fakeReview;
            _this.client.deleteReview("fake review id", _this.callbackOwner.callback);
            expect(_this.callbackOwner.callback).toHaveBeenCalledWith(null, fakeReview);
        });
        it("should not crash if callback is null", function () {
            _this.callbackOwner.callback = null;
            expect(_this.client.deleteReview).not.toThrow(Error);
            _this.client.deleteReview("fake review id", _this.callbackOwner.callback);
        });
    });
    describe("putReview tests.", function () {
        beforeEach(function () {
            _this.fakeReview = new protos_1.Review();
        });
        it('Should call my callback method.', function () {
            _this.client.putReview(_this.fakeReview, _this.callbackOwner.callback);
            expect(_this.callbackOwner.callback.wasCalled).toBeTruthy();
        });
        it('Should pass the error into the callback if the error exists.', function () {
            _this.mockedReviewService.error = "Error!";
            _this.client.putReview(_this.fakeReview, _this.callbackOwner.callback);
            expect(_this.callbackOwner.callback).toHaveBeenCalledWith('Error!', jasmine.any(Object));
        });
        it("Should pass the review to the callback", function () {
            _this.mockedReviewService.review = _this.fakeReview;
            _this.client.putReview(_this.fakeReview, _this.callbackOwner.callback);
            expect(_this.callbackOwner.callback).toHaveBeenCalledWith(null, _this.fakeReview);
        });
        it("should not crash if callback is null", function () {
            _this.callbackOwner.callback = null;
            expect(_this.client.putReview).not.toThrow(Error);
            _this.client.putReview(_this.fakeReview, _this.callbackOwner.callback);
        });
    });
    describe("listReviews tests", function () {
        it('Should call my callback method.', function () {
            _this.client.listReviews("listing-id", _this.callbackOwner.callback);
            expect(_this.callbackOwner.callback.wasCalled).toBeTruthy();
        });
        it('Should pass the error into the callback if the error exists.', function () {
            _this.mockedReviewService.error = "Error!";
            _this.client.listReviews("fake listing id", _this.callbackOwner.callback);
            expect(_this.callbackOwner.callback).toHaveBeenCalledWith('Error!', jasmine.any(Object));
        });
        it("Should pass the reviews to the callback", function () {
            var fakeReview1 = new protos_1.Review();
            fakeReview1.star_rating = 3;
            var fakeReview2 = new protos_1.Review();
            fakeReview2.star_rating = 5;
            var fakeReviewsResponse = new protos_2.ListReviewsResponse();
            fakeReviewsResponse.reviews = [fakeReview1, fakeReview2];
            _this.listReviewsResponse = fakeReviewsResponse;
            _this.client.listReviews("fake listing id", function (error, fakeReviewsResponse) {
                expect(_this.mockedReviewService.listReviewsResponse).toEqual(fakeReviewsResponse);
            });
        });
        it("should not crash if callback is null", function () {
            _this.callbackOwner.callback = null;
            expect(_this.client.listReviews).not.toThrow(Error);
            _this.client.listReviews("fake listing id", _this.callbackOwner.callback);
        });
    });
});
//# sourceMappingURL=client.spec.js.map