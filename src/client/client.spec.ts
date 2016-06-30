/// <reference path="../protos/datariver.d.ts" />
import {Client} from "./client";
import {Environment} from "./client";
import {datariverProto} from '../protos/protos'
import {Listing} from '../index';

class mockedDatariverService {
    public error: string = null;
    public listingResponse = {};

    public getListing = (listingId: string, callback: any) => {
        callback(this.error, this.listingResponse);
    };
    
    public deleteListing = (listingId: string, callback: any) => {
        callback(this.error, this.listingResponse);
    };
    
    public putListing = (listing: datariver.Listing, callback: any) => {
        callback(this.error, this.listingResponse);
    };
}

describe('Client tests', () => {
    beforeEach(() => {
        this.mockedService = new mockedDatariverService();
        this.client = new Client(Environment.TEST, "fake-token", this.mockedService);
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
            this.mockedService.error = "Error!";
            this.client.getListing("fake listing id", this.callbackOwner.callback);
            expect(this.callbackOwner.callback).toHaveBeenCalledWith('Error!', undefined);
        });
        it("Should pass the listingResponse's error into the callback if the main error doesn't exist.", () => {
            this.mockedService.listingResponse.error = "ListingResponse error!";
            this.client.getListing("fake listing id", this.callbackOwner.callback);
            expect(this.callbackOwner.callback).toHaveBeenCalledWith('ListingResponse error!', undefined);
        });
        it("Should pass the listing from the ListingResponse to the callback", () => {
            let fakeListing = <Listing> new Listing();
            this.mockedService.listingResponse.listing = fakeListing;
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
            this.mockedService.error = "Error!";
            this.client.deleteListing("fake listing id", this.callbackOwner.callback);
            expect(this.callbackOwner.callback).toHaveBeenCalledWith('Error!', undefined);
        });
        it("Should pass the listingResponse's error into the callback if the main error doesn't exist.", () => {
            this.mockedService.listingResponse.error = "ListingResponse error!";
            this.client.deleteListing("fake listing id", this.callbackOwner.callback);
            expect(this.callbackOwner.callback).toHaveBeenCalledWith('ListingResponse error!', undefined);
        });
        it("Should pass the listing from the ListingResponse to the callback", () => {
            let fakeListing = <Listing> new Listing();
            this.mockedService.listingResponse.listing = fakeListing;
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
            this.mockedService.error = "Error!";
            this.client.putListing(this.fakeListing, this.callbackOwner.callback);
            expect(this.callbackOwner.callback).toHaveBeenCalledWith('Error!', undefined);
        });
        it("Should pass the listingResponse's error into the callback if the main error doesn't exist.", () => {
            this.mockedService.listingResponse.error = "ListingResponse error!";
            this.client.putListing(this.fakeListing, this.callbackOwner.callback);
            expect(this.callbackOwner.callback).toHaveBeenCalledWith('ListingResponse error!', undefined);
        });
        it("Should pass the listing from the ListingResponse to the callback", () => {
            this.mockedService.listingResponse.listing = this.fakeListing;
            this.client.putListing(this.fakeListing, this.callbackOwner.callback);
            expect(this.callbackOwner.callback).toHaveBeenCalledWith(null, this.fakeListing);
        });
        it("should not crash if callback is null",() => {
            expect(this.client.putListing).not.toThrow(Error);
            this.client.putListing(this.fakeListing, this.callbackOwner.callback);
        });
    });
});
