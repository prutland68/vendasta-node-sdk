const grpc = require("grpc");

import {Listing, Review, Empty, ReviewService, ListingService, ListReviewsResponse, reviewProto} from '../protos/protos'

export enum Environment{
    TEST = 1,
    PRODUCTION = 2
}

export class Client {
    private metaData = new grpc.Metadata();
    private listingService:any;
    private reviewService:any;
    private address:string;

    constructor(private environment:Environment, private token:string,
                listingService: any = null, reviewService: any = null) {
        if (environment == Environment.PRODUCTION) {
            throw new Error("Production not available yet.");
        }
        else {
            this.address = "localhost:9090";
            // this.address = "directory-sandbox.vendasta.com:23000";  // assume test
        }
        this.metaData.add('token', token);
        let callCredentials = this.getCallCredentials(this.metaData);
        this.listingService = listingService || new ListingService(this.address, callCredentials);
        this.reviewService = reviewService || new ReviewService(this.address, callCredentials);
    }

    private getCallCredentials(metadata: any) {
        const creds = grpc.credentials.createSsl();
        const callCreds = grpc.credentials.createFromMetadataGenerator(
            (serviceUrl:string, callback:any) => {
                callback(null, metadata)
            }
        );
        return grpc.credentials.combineChannelCredentials(creds, callCreds);
    }

    public getListing = (listingId:string, callback:any) => {
        return this.listingService.get(listingId, (error:any, listing:Listing) => {
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
        return this.listingService.put(listing, (error:any, listing:Listing) => {
            // error.toString() returns just the error message.
            if (callback) {
                if (error)
                    error = error.toString();
                callback(error, listing);
            }
        });
    };

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
    };

    public listReviews = (listingId: any, callback:any) => {
        return this.reviewService.list(listingId, (error:any, reviews:ListReviewsResponse) => {
            if (callback) {
                if (error)
                    error = error.toString();
                callback(error, reviews);
            }
        });
    };
}
