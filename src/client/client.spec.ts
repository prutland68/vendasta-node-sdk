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
    describe("getListing tests", () => {
        beforeEach(() => {
            this.mockedService = new mockedDatariverService();
            this.mockedClient = new Client(Environment.TEST, "fake-token", this.mockedService);
            this.callbackOwner = {
                callback: jasmine.createSpy('callback spy'),
            };

        });
        it('Should call my callback method with the returned listing.', () => {
            this.mockedClient.getListing("fake listing id", this.callbackOwner.callback);
            expect(this.callbackOwner.callback.wasCalled).toBeTruthy();
        });
        it('Should pass the main error into the callback if the main error exists.', () => {
            this.mockedService.error = "Error!";
            this.mockedClient.getListing("fake listing id", this.callbackOwner.callback);
            expect(this.callbackOwner.callback).toHaveBeenCalledWith('Error!', undefined);
        });
        it("Should pass the listingResponse's error into the callback if the main error doesn't exist.", () => {
            this.mockedService.listingResponse.error = "ListingResponse error!";
            this.mockedClient.getListing("fake listing id", this.callbackOwner.callback);
            expect(this.callbackOwner.callback).toHaveBeenCalledWith('ListingResponse error!', undefined);
        });
    });
});
