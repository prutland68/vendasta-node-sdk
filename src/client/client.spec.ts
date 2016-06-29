/// <reference path="../protos/datariver.d.ts" />
import {Client} from "./client";
import {Environment} from "./client";
import {datariverProto} from '../protos/protos'
import {Listing} from '../index';

class mockedDatariverService {
    public getListing = (listingId: string, callback: any) => {
        callback(null, {});
    }
}

describe('Client tests', () => {
    beforeEach(() => {
        this.client = new Client(Environment.TEST, "fake-token");
    });
    describe("getListing tests", () => {
        it('Should call my callback method with the returned listing.', () => {
            let fakeListing: datariver.Listing = new Listing();
            // datariver.getListing = jasmine.createSpy("getListing() spy").andCallFake((listingId: string, callback: any) => {callback(undefined, fakeListing)});
            spyOn(this.client, 'getDatariverService').andReturn(new mockedDatariverService());
            var objectwhatever = {
                callback: jasmine.createSpy('callback spy')
            }
            this.client.getListing("fake listing id", objectwhatever.callback)
            expect(objectwhatever.callback.wasCalled).toBeTruthy()
        });
    });
});
