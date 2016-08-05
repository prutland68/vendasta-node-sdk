"use strict";
var _this = this;
var client_1 = require("./client");
var protos_1 = require('../protos/protos');
var mockedListingService = (function () {
    function mockedListingService() {
        var _this = this;
        this.error = null;
        this.listing = {};
        this.empty = {};
        this.get = function (listingId, callback) {
            callback(_this.error, _this.listing);
        };
        this.delete = function (listingId, callback) {
            callback(_this.error, _this.empty);
        };
        this.put = function (listing, callback) {
            callback(_this.error, _this.listing);
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
        _this.fakeError = { Error: "Error!", code: 5, metadata: {} };
        _this.fakeError.toString = function () { return _this.Error; };
    });
    describe("getListing tests", function () {
        it('Should call my callback method with the returned listing.', function (done) {
            _this.mockedListingService.listing = new protos_1.Listing();
            _this.mockedListingService.listing.url = "blahblahblah";
            _this.client.getListing("fake listing id", function (error, listing) {
                expect(_this.mockedListingService.listing).toEqual(listing);
                done();
            });
        });
        it('Should pass the main error into the callback if the main error exists.', function (done) {
            _this.mockedListingService.error = "Error!";
            _this.client.getListing("fake listing id", function (error, listing) {
                expect(error).toEqual("Error!");
                done();
            });
        });
        it("should not crash if callback is null", function (done) {
            expect(_this.client.getListing).not.toThrow(Error);
            _this.client.getListing("fake listing id", done);
        });
    });
    describe("deleteListing tests.", function () {
        it('Should call my callback method with empty response.', function (done) {
            _this.client.deleteListing("fake listing id", function (error, emptyResponse) {
                expect(emptyResponse).toEqual({});
                done();
            });
        });
        it('Should pass the main error into the callback if the main error exists.', function (done) {
            _this.mockedListingService.error = "Error!";
            _this.client.deleteListing("fake listing id", function (error, emptyResponse) {
                expect(error).toEqual("Error!");
                done();
            });
        });
        it("should not crash if callback is null", function (done) {
            expect(_this.client.deleteListing).not.toThrow(Error);
            _this.client.deleteListing("fake listing id", done);
        });
    });
    describe("putListing tests.", function () {
        beforeEach(function () {
            _this.fakeListing = new protos_1.Listing();
        });
        it('Should call my callback method with the returned listing.', function (done) {
            _this.mockedListingService.listing = new protos_1.Listing();
            _this.mockedListingService.company_name = "blah blah blah";
            _this.client.putListing(_this.fakeListing, function (error, listing) {
                expect(listing).toEqual(_this.mockedListingService.listing);
                done();
            });
        });
        it('Should pass the main error into the callback if the main error exists.', function (done) {
            _this.mockedListingService.error = "Error!";
            _this.client.putListing(_this.fakeListing, function (error, listing) {
                expect(error).toEqual("Error!");
                done();
            });
        });
        it("should not crash if callback is null", function (done) {
            expect(_this.client.putListing).not.toThrow(Error);
            _this.client.putListing(_this.fakeListing, done);
        });
    });
    describe("getReview tests", function () {
        it('Should call my callback method with the returned review.', function (done) {
            var fakeReview = new protos_1.Review();
            _this.mockedReviewService.review = fakeReview;
            _this.client.getReview("review-id", function (error, review) {
                expect(review).toEqual(fakeReview);
                done();
            });
        });
        it('Should pass the error into the callback if the error exists.', function (done) {
            _this.mockedReviewService.error = "Error!";
            _this.client.getReview("review-id", function (error, review) {
                expect(error).toEqual("Error!");
                done();
            });
        });
        it("should not crash if callback is null", function (done) {
            expect(_this.client.getReview).not.toThrow(Error);
            _this.client.getReview("fake review id", done);
        });
    });
    describe("deleteReview tests.", function () {
        it('Should call my callback method with the returned emptyResponse.', function (done) {
            _this.client.deleteReview("fake review id", function (error, response) {
                expect(response).toEqual({});
                done();
            });
        });
        it('Should pass the error into the callback if the error exists.', function (done) {
            _this.mockedReviewService.error = "Error!";
            _this.client.deleteReview(_this.fakeReview, function (error, response) {
                expect(error).toEqual("Error!");
                done();
            });
        });
        it("should not crash if callback is null", function (done) {
            expect(_this.client.deleteReview).not.toThrow(Error);
            _this.client.deleteReview("fake review id", done);
        });
    });
    describe("putReview tests.", function () {
        beforeEach(function () {
            _this.fakeReview = new protos_1.Review();
        });
        it('Should call my callback method with the returned review.', function (done) {
            _this.mockedReviewService.review = _this.fakeReview;
            _this.client.putReview(_this.fakeReview, function (error, review) {
                expect(review).toEqual(_this.fakeReview);
                done();
            });
        });
        it('Should pass the error into the callback if the error exists.', function (done) {
            _this.mockedReviewService.error = "Error!";
            _this.client.putReview(_this.fakeReview, function (error, review) {
                expect(error).toEqual("Error!");
                done();
            });
        });
        it("should not crash if callback is null", function (done) {
            expect(_this.client.putReview).not.toThrow(Error);
            _this.client.putReview(_this.fakeReview, done);
        });
    });
    describe("listReviews tests", function () {
        it('Should pass the error into the callback if the error exists.', function (done) {
            _this.mockedReviewService.error = "Error!";
            _this.client.listReviews("fake listing id", null, 15, 0, function (error, reviews) {
                expect(error).toEqual("Error!");
                done();
            });
        });
        it("Should pass the reviews to the callback", function (done) {
            var fakeReview1 = new protos_1.Review();
            fakeReview1.star_rating = 3;
            var fakeReview2 = new protos_1.Review();
            fakeReview2.star_rating = 5;
            var fakeReviewsResponse = new protos_1.ListReviewsResponse();
            fakeReviewsResponse.reviews = [fakeReview1, fakeReview2];
            _this.mockedReviewService.listReviewsResponse = fakeReviewsResponse;
            _this.client.listReviews("fake listing id", null, 15, 0, function (error, reviews) {
                expect(_this.mockedReviewService.listReviewsResponse.reviews).toEqual(reviews);
                done();
            });
        });
        it("should not crash if callback is null", function (done) {
            expect(_this.client.listReviews).not.toThrow(Error);
            _this.client.listReviews("fake listing id", null, 15, 0, done);
        });
    });
});
//# sourceMappingURL=client.spec.js.map