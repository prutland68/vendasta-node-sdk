import {Client, Environment} from "./client";
import {ListingService, ReviewService, Listing, Review, ListReviewsResponse, Empty} from '../protos/protos'

class mockedListingService {
    public error: string = null;
    public listing = {};
    public empty = {};

    public get = (listingId: string, callback: any) => {
        callback(this.error, this.listing);
    };

    public delete = (listingId: string, callback: any) => {
        callback(this.error, this.empty);
    };

    public put = (listing: Listing, callback: any) => {
        callback(this.error, this.listing);
    };
}

class mockedReviewService {
    public error: string = null;
    public review = {};
    public listReviewsResponse = {};

    public get = (reviewId: string, callback: any) => {
        callback(this.error, this.review);
    };

    public delete = (reviewId: string, callback: any) => {
        callback(this.error, this.review);
    };

    public put = (review: Review, callback: any) => {
        callback(this.error, this.review);
    };

    public list = (listingId: string, callback: any) => {
        callback(this.error, this.listReviewsResponse);
    }
}

describe('Client tests', () => {
    beforeEach(() => {
        this.mockedListingService = new mockedListingService();
        this.mockedReviewService = new mockedReviewService();
        this.client = new Client(Environment.TEST, "fake-token", this.mockedListingService, this.mockedReviewService);
        this.fakeError = {Error: "Error!", code: 5, metadata: {}};
        this.fakeError.toString = () => { return this.Error};

    });
    describe("getListing tests", () => {
        it('Should call my callback method with the returned listing.', () => {
            this.mockedListingService.listing = new Listing();
            this.mockedListingService.listing.url = "blahblahblah";
            this.client.getListing("fake listing id", (error: string, listing: Listing) => {
                expect(this.mockedListingService.listing).toEqual(listing);
            });
        });
        it('Should pass the main error into the callback if the main error exists.', () => {
            this.mockedListingService.error = "Error!";
            this.client.getListing("fake listing id", (error: string, listing: Listing) => {
                expect(error).toEqual("Error!");
            });
        });
        it("should not crash if callback is null",() => {
            expect(this.client.getListing).not.toThrow(Error);
            this.client.getListing("fake listing id", null);
        });
    });
    describe("deleteListing tests.", () => {
        it('Should call my callback method with empty response.', () => {
            this.client.deleteListing("fake listing id", (error: string, emptyResponse: Empty) => {
                expect(emptyResponse).toEqual({});
            });
        });
        it('Should pass the main error into the callback if the main error exists.', () => {
            this.mockedListingService.error = "Error!";
            this.client.deleteListing("fake listing id", (error: string, emptyResponse: Empty) => {
                expect(error).toEqual("Error!");
            });
        });
        it("should not crash if callback is null",() => {
            expect(this.client.deleteListing).not.toThrow(Error);
        });
    });
    describe("putListing tests.", () => {
        beforeEach(() => {
            this.fakeListing = <Listing> new Listing();
        });
        it('Should call my callback method with the returned listing.', () => {
            this.mockedListingService.listing = new Listing();
            this.mockedListingService.company_name = "blah blah blah";
            this.client.putListing(this.fakeListing, (error: string, listing: Listing) => {
                expect(listing).toEqual(this.mockedListingService.listing);
            });
        });
        it('Should pass the main error into the callback if the main error exists.', () => {
            this.mockedListingService.error = "Error!";
            this.client.putListing(this.fakeListing, (error: string, listing: Listing) => {
                expect(error).toEqual("Error!");
            });
        });
        it("should not crash if callback is null",() => {
            expect(this.client.putListing).not.toThrow(Error);
            this.client.putListing(this.fakeListing, null);
        });
    });

    describe("getReview tests", () => {
        it('Should call my callback method with the returned review.', () => {
            let fakeReview = <Review> new Review();
            this.mockedReviewService.review = fakeReview;
            this.client.getReview("review-id", (error: string, review: Review) => {
                expect(review).toEqual(fakeReview);
            });
        });
        it('Should pass the error into the callback if the error exists.', () => {
            this.mockedReviewService.error = "Error!";
            this.client.getReview("review-id", (error: string, review: Review) => {
                expect(error).toEqual("Error!");
            });
        });

        it("should not crash if callback is null",() => {
            expect(this.client.getReview).not.toThrow(Error);
            this.client.getReview("fake review id", null);
        });
    });

    describe("deleteReview tests.", () => {
        it('Should call my callback method with the returned emptyResponse.', () => {
            this.client.deleteReview("fake review id", (error: string, response: Empty) => {
                expect(response).toEqual({})
            });
        });
        it('Should pass the error into the callback if the error exists.', () => {
            this.mockedReviewService.error = "Error!";
            this.client.deleteReview(this.fakeReview, (error: string, response: Empty) => {
                expect(error).toEqual("Error!");
            });
        });
        it("should not crash if callback is null",() => {
            expect(this.client.deleteReview).not.toThrow(Error);
            this.client.deleteReview("fake review id", null);
        });
    });

    describe("putReview tests.", () => {
        beforeEach(() => {
            this.fakeReview = <Review> new Review();
        });
        it('Should call my callback method with the returned review.', () => {
            this.mockedReviewService.review = this.fakeReview;
            this.client.putReview(this.fakeReview, (error: string, review: Review) => {
                expect(review).toEqual(this.fakeReview);
            });
        });
        it('Should pass the error into the callback if the error exists.', () => {
            this.mockedReviewService.error = "Error!";
            this.client.putReview(this.fakeReview, (error: string, review: Review) => {
                expect(error).toEqual("Error!");
            });
        });
        it("should not crash if callback is null",() => {
            expect(this.client.putReview).not.toThrow(Error);
            this.client.putReview(this.fakeReview, null);
        });
    });

    describe("listReviews tests", () => {
        it('Should pass the error into the callback if the error exists.', () => {
            this.mockedReviewService.error = "Error!";
            this.client.listReviews("fake listing id", (error: string, reviews: [Review]) => {
                expect(error).toEqual("Error!");
            });
        });
        it("Should pass the reviews to the callback", () => {
            let fakeReview1 = new Review();
            fakeReview1.star_rating = 3;
            let fakeReview2 = new Review();
            fakeReview2.star_rating = 5;
            let fakeReviewsResponse = new ListReviewsResponse();
            fakeReviewsResponse.reviews = [fakeReview1, fakeReview2];
            this.listReviewsResponse = fakeReviewsResponse;
            this.client.listReviews("fake listing id", (error: string, fakeReviewsResponse: [Review]) => {
                expect(this.mockedReviewService.listReviewsResponse).toEqual(fakeReviewsResponse);
            });
        });
        it("should not crash if callback is null", () => {
            expect(this.client.listReviews).not.toThrow(Error);
            this.client.listReviews("fake listing id", null);
        });
    });

});
