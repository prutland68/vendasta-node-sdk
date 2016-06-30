/// <reference path="../protos/datariver.d.ts" />
const grpc = require("grpc");

import {datariverProto} from '../protos/protos'

const DatariverService = datariverProto.datariver.DataRiver;

export enum Environment{
    TEST = 1,
    PRODUCTION = 2
}

export class Client {
    private metaData = new grpc.Metadata();
    private datariverService:any;
    private address:string;

    constructor(private environment:Environment, private token:string, service: any = null) {
        if (environment == Environment.PRODUCTION) {
            throw new Error("Production not available yet.");
        }
        else {
            this.address = "directory-sandbox.vendasta.com:23000";  // assume test
        }
        this.metaData.add('token', token);
        this.datariverService = service || this.getDatariverService(this.metaData, this.address);
    }
    
    private getDatariverService = (metadata: any, address: string) => {
        const creds = grpc.credentials.createSsl();

        const callCreds = grpc.credentials.createFromMetadataGenerator(
            (serviceUrl:string, callback:any) => {
                callback(null, metadata)
            }
        );
        const combinedCreds = grpc.credentials.combineChannelCredentials(creds, callCreds);
        return new DatariverService(address, combinedCreds);
    };

    public getListing = (listingId:string, callback:any) => {
        return this.datariverService.getListing(listingId, (error:string, listingResponse:datariver.ListingResponse) => {
            if (!error) {
                error = listingResponse.error || null;
            }
            if (callback) {
                callback(error, listingResponse.listing);
            }
        });
    };
    public deleteListing = (listingId:string, callback:any) => {
        return this.datariverService.deleteListing(listingId, (error:string, listingResponse:datariver.ListingResponse)=> {
            if (!error) {
                error = listingResponse.error || null;
            }
            if (callback) {
                callback(error, listingResponse.listing);
            }
        });
    };
    public putListing = (listing:datariver.Listing, callback:any) => {
        return this.datariverService.putListing(listing, (error:string, listingResponse:datariver.ListingResponse) => {
            if (!error) {
                error = listingResponse.error || null;
            }
            if (callback) {
                callback(error, listingResponse.listing);
            }
        });
    };
}
