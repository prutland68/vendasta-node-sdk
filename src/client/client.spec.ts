import {Client, Environment} from "./client";
import {ListingService, ReviewService, Listing, Review } from '../protos/protos'

class mockedListingService {
    public error: string = null;
    public listingResponse = {};

    public get = (listingId: string, callback: any) => {
        callback(this.error, this.listingResponse);
    };

    public delete = (listingId: string, callback: any) => {
        callback(this.error, this.listingResponse);
    };

    public put = (listing: Listing, callback: any) => {
        callback(this.error, this.listingResponse);
    };
}

class mockedReviewService {
    public error: string = null;
    public review = {};

    public get = (reviewId, listingId: string, callback: any) => {
        callback(this.error, this.review);
    };

    public delete = (reviewId, listingId: string, callback: any) => {
        callback(this.error, this.review);
    };
}

describe('Client tests', () => {
    beforeEach(() => {
        this.mockedListingService = new mockedListingService();
        this.mockedReviewService = new mockedReviewService();
        this.client = new Client(Environment.TEST, "fake-token", this.mockedListingService, this.mockedReviewService);
        this.callbackOwner = {
            callback: jasmine.createSpy('callback spy'),
        };

    });
    describe("getListing tests", () => {
        it('Should call my callback method with the returned listing.', () => {
            this.client.getListing("fake listing id", this.callbackOwner.callback);
            expect(this.callbackOwner.callback.wasCalled).toBeTruthy();
        });
        it('Should pass the main error into the callback if the main error exists.', () => {
            this.mockedListingService.error = "Error!";
            this.client.getListing("fake listing id", this.callbackOwner.callback);
            expect(this.callbackOwner.callback).toHaveBeenCalledWith('Error!', undefined);
        });
        it("Should pass the listingResponse's error into the callback if the main error doesn't exist.", () => {
            this.mockedListingService.listingResponse.error = "ListingResponse error!";
            this.client.getListing("fake listing id", this.callbackOwner.callback);
            expect(this.callbackOwner.callback).toHaveBeenCalledWith('ListingResponse error!', undefined);
        });
        it("Should pass the listing from the ListingResponse to the callback", () => {
            let fakeListing = <Listing> new Listing();
            this.mockedListingService.listingResponse.listing = fakeListing;
            this.client.getListing("fake listing id", this.callbackOwner.callback);
            expect(this.callbackOwner.callback).toHaveBeenCalledWith(null, fakeListing);
        });
        it("should not crash if callback is null",() => {
            expect(this.client.getListing).not.toThrow(Error);
            this.client.getListing("fake listing id", this.callbackOwner.callback);
        });
    });
    describe("deleteListing tests.", () => {
        it('Should call my callback method with the returned listing.', () => {
            this.client.deleteListing("fake listing id", this.callbackOwner.callback);
            expect(this.callbackOwner.callback.wasCalled).toBeTruthy();
        });
        it('Should pass the main error into the callback if the main error exists.', () => {
            this.mockedListingService.error = "Error!";
            this.client.deleteListing("fake listing id", this.callbackOwner.callback);
            expect(this.callbackOwner.callback).toHaveBeenCalledWith('Error!', undefined);
        });
        it("Should pass the listingResponse's error into the callback if the main error doesn't exist.", () => {
            this.mockedListingService.listingResponse.error = "ListingResponse error!";
            this.client.deleteListing("fake listing id", this.callbackOwner.callback);
            expect(this.callbackOwner.callback).toHaveBeenCalledWith('ListingResponse error!', undefined);
        });
        it("Should pass the listing from the ListingResponse to the callback", () => {
            let fakeListing = <Listing> new Listing();
            this.mockedListingService.listingResponse.listing = fakeListing;
            this.client.deleteListing("fake listing id", this.callbackOwner.callback);
            expect(this.callbackOwner.callback).toHaveBeenCalledWith(null, fakeListing);
        });
        it("should not crash if callback is null",() => {
            expect(this.client.deleteListing).not.toThrow(Error);
            this.client.deleteListing("fake listing id", this.callbackOwner.callback);
        });
    });
    describe("putListing tests.", () => {
        beforeEach(() => {
            this.fakeListing = <Listing> new Listing();
        });
        it('Should call my callback method with the returned listing.', () => {
            this.client.putListing(this.fakeListing, this.callbackOwner.callback);
            expect(this.callbackOwner.callback.wasCalled).toBeTruthy();
        });
        it('Should pass the main error into the callback if the main error exists.', () => {
            this.mockedListingService.error = "Error!";
            this.client.putListing(this.fakeListing, this.callbackOwner.callback);
            expect(this.callbackOwner.callback).toHaveBeenCalledWith('Error!', undefined);
        });
        it("Should pass the listingResponse's error into the callback if the main error doesn't exist.", () => {
            this.mockedListingService.listingResponse.error = "ListingResponse error!";
            this.client.putListing(this.fakeListing, this.callbackOwner.callback);
            expect(this.callbackOwner.callback).toHaveBeenCalledWith('ListingResponse error!', undefined);
        });
        it("Should pass the listing from the ListingResponse to the callback", () => {
            this.mockedListingService.listingResponse.listing = this.fakeListing;
            this.client.putListing(this.fakeListing, this.callbackOwner.callback);
            expect(this.callbackOwner.callback).toHaveBeenCalledWith(null, this.fakeListing);
        });
        it("should not crash if callback is null",() => {
            expect(this.client.putListing).not.toThrow(Error);
            this.client.putListing(this.fakeListing, this.callbackOwner.callback);
        });
    });

    describe("getReview tests", () => {
        it('Should call my callback method with the returned review.', () => {
            this.client.getReview("review-id", "listing-id", this.callbackOwner.callback);
            expect(this.callbackOwner.callback.wasCalled).toBeTruthy();
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
        it("Should pass the review to the callback", () => {
            let fakeReview = <Review> new Review();
            this.mockedReviewService.review = fakeReview;
            this.client.getReview("fake review id", "fake listing id", this.callbackOwner.callback);
            expect(this.callbackOwner.callback).toHaveBeenCalledWith(null, fakeReview);
        });
        it("should not crash if callback is null",() => {
            this.callbackOwner.callback = null;
            expect(this.client.getReview).not.toThrow(Error);
            this.client.getReview("fake review id", "fake listing id", this.callbackOwner.callback);
        });
    });

    describe("deleteReview tests.", () => {
        it('Should call my callback method with the returned review.', () => {
            this.client.deleteReview("fake review id", "fake listing id", this.callbackOwner.callback);
            expect(this.callbackOwner.callback.wasCalled).toBeTruthy();
        });
        // it('Should pass the main error into the callback if the main error exists.', () => {
        //     this.mockedReviewService.error = "Error!";
        //     this.client.deleteReview("fake review id", this.callbackOwner.callback);
        //     expect(this.callbackOwner.callback).toHaveBeenCalledWith('Error!', undefined);
        // });
        // it("Should pass the reviewResponse's error into the callback if the main error doesn't exist.", () => {
        //     this.mockedReviewService.reviewResponse.error = "ReviewResponse error!";
        //     this.client.deleteReview("fake review id", this.callbackOwner.callback);
        //     expect(this.callbackOwner.callback).toHaveBeenCalledWith('ReviewResponse error!', undefined);
        // });
        it("Should pass the review to the callback", () => {
            let fakeReview = <Review> new Review();
            this.mockedReviewService.review = fakeReview;
            this.client.deleteReview("fake review id", "fake listing id", this.callbackOwner.callback);
            expect(this.callbackOwner.callback).toHaveBeenCalledWith(null, fakeReview);
        });
        it("should not crash if callback is null",() => {
            this.callbackOwner.callback = null;
            expect(this.client.deleteReview).not.toThrow(Error);
            this.client.deleteReview("fake review id", "fake listing id", this.callbackOwner.callback);
        });
    });
});
