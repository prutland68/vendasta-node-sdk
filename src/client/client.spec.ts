/// <reference path="../protos/datariver.d.ts" />
import {Client} from "./client";
import {Environment} from "./client";
import {datariverProto} from '../protos/protos'
import {Listing} from '../index';

class mockedDatariverService {
    public getListing = (listingId: string, callback: any) => {
        callback(null, {});
    }
    
    public deleteListing = (listingId: string, callback: any) => {
        callback(null, {});
    }
    
    public putListing = (listing: datariver.Listing, callback: any) => {
        callback(null, {});
    }
}

describe('Client tests', () => {
    beforeEach(() => {
        this.client = new Client(Environment.TEST, "fake-token", new mockedDatariverService());
    });
    describe("getListing tests", () => {
        it('Should call my callback method with the returned listing.', () => {
            let fakeListing: datariver.Listing = new Listing();
            var callbackOwner = {
                callback: jasmine.createSpy('callback spy'),
            }
            this.client.getListing("fake listing id", callbackOwner.callback)
            expect(callbackOwner.callback.wasCalled).toBeTruthy()
        });
        it('Should pass the main error into the callback if the main error exists.', () => {
            let fakeListing: datariver.Listing = new Listing();
            var callbackOwner = {
                callback: jasmine.createSpy('callback spy'),
            }
            spyOn(this.client, 'getListing').andCallFake((listingId:string, callback:any) => {
                callback('Error!', {});
            })
            this.client.getListing("fake listing id", callbackOwner.callback)
            expect(callbackOwner.callback).toHaveBeenCalledWith('Error!', {})
        });
        it("Should pass the listingResponse's error into the callback if the main error doesn't exist.", () => {
            let fakeListing: datariver.Listing = new Listing();
            var callbackOwner = {
                callback: jasmine.createSpy('callback spy'),
            }
            spyOn(this.client, 'getListing').andCallFake((listingId:string, callback:any) => {
                callback(null, {error: 'ListingResponse error!'});
            })
            this.client.getListing("fake listing id", callbackOwner.callback)
            expect(callbackOwner.callback).toHaveBeenCalledWith(null, 'ListingResponse error!')
            // TODO finish writing this properly, so it actually tests the right thing
        });
    });
});
