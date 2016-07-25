const grpc = require("grpc");

import {Listing, Review, Empty} from '../protos/protos'

import {listingProto, reviewProto} from '../protos/protos'

const ListingService =  listingProto.datariver.ListingService;
const ReviewService = reviewProto.datariver.ReviewService;

export enum Environment{
    TEST = 1,
    PRODUCTION = 2
}

export class Client {
    private metaData = new grpc.Metadata();
    private listingService:any;
    private reviewService:any;
    private address:string;

    constructor(private environment:Environment, private token:string, listingService: any = undefined, reviewService: any = undefined) {
        if (environment == Environment.PRODUCTION) {
            throw new Error("Production not available yet.");
        }
        else {
            this.address ="localhost:9090";
            // this.address = "directory-sandbox.vendasta.com:23000";  // assume test
        }
        this.metaData.add('token', token);
        this.listingService = this.getListingService(this.metaData, this.address);
        this.reviewService = reviewService || this.getReviewService(this.metaData, this.address);
    }

    private getListingService = (metadata: any, address: string) => {
        //const creds = grpc.credentials.createSsl();
        //const callCreds = grpc.credentials.createFromMetadataGenerator(
        //    (serviceUrl:string, callback:any) => {
        //        callback(null, metadata)
        //    }
        //);
        //const combinedCreds = grpc.credentials.combineChannelCredentials(creds, callCreds);
        let combinedCreds = grpc.credentials.createInsecure();
        return new ListingService(address, combinedCreds);
    };
    private getReviewService = (metadata: any, address: string) => {
        //const creds = grpc.credentials.createSsl();
        //
        //const callCreds = grpc.credentials.createFromMetadataGenerator(
        //    (serviceUrl:string, callback:any) => {
        //        callback(null, metadata)
        //    }
        //);
        //const combinedCreds = grpc.credentials.combineChannelCredentials(creds, callCreds);
        let combinedCreds = grpc.credentials.createInsecure();
        return new ReviewService(address, combinedCreds);
    };

    public getListing = (listingId:string, callback:any) => {
        return this.listingService.get(listingId, (error:string, listing:Listing) => {
            // error.toString() returns just the error message.
            if (callback) {
                if (error)
                    error = error.toString();
                callback(error, listing);
            }
        });
    };
    public deleteListing = (listingId:string, callback:any) => {
        return this.listingService.delete(listingId, (error:any, emptyResponse:Empty)=> {
            // error.toString() returns just the error message.
            if (callback) {
                if (error)
                    error = error.toString();
                callback(error, emptyResponse);
            }
        });
    };
    public putListing = (listing:Listing, callback:any) => {
        return this.listingService.put(listing, (error:string, listing:Listing) => {
            // error.toString() returns just the error message.
            if (callback) {
                if (error)
                    error = error.toString();
                callback(error, listing);
            }
        });
    };

    //private getReviewService = (metadata: any, address: string) => {
    //    const creds = grpc.credentials.createSsl();
    //
    //    const callCreds = grpc.credentials.createFromMetadataGenerator(
    //        (serviceUrl:string, callback:any) => {
    //            callback(null, metadata)
    //        }
    //    );
    //    const combinedCreds = grpc.credentials.combineChannelCredentials(creds, callCreds);
    //    return new ReviewService(address, combinedCreds);
    //};

    public getReview = (reviewId: string, callback:any) => {
        return this.reviewService.get(reviewId, (error:any, review:Review) => {
            if (callback) {
                if (error)
                    error = error.toString();
                callback(error, review);
            }
        });
    };

    public deleteReview = (reviewId: string, callback:any) => {
        return this.reviewService.delete(reviewId, (error:any, review:Review)=> {
            if (callback) {
                if (error)
                    error = error.toString();
                callback(error, review);
            }
        });
    };

    public putReview = (review:Review, callback:any) => {
        return this.reviewService.put(review, (error:any, review:Review) => {
            if (callback) {
                if (error)
                    error = error.toString();
                callback(error, review);
            }
        });
    }
};
