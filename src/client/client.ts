const grpc = require("grpc");

import {ListingService, ReviewService, Listing, Review } from '../protos/protos'

export enum Environment{
    TEST = 1,
    PRODUCTION = 2
}

export class Client {
    private metaData = new grpc.Metadata();
    private listingService:any;
    private reviewService:any;
    private address:string;

    constructor(private environment:Environment, private token:string, listingService: any = null, reviewService: any = null) {
        if (environment == Environment.PRODUCTION) {
            throw new Error("Production not available yet.");
        }
        else {
            this.address = "directory-sandbox.vendasta.com:23000";  // assume test
        }
        this.metaData.add('token', token);
        this.listingService = listingService || this.getListingService(this.metaData, this.address);
        this.reviewService = reviewService || this.getReviewService(this.metaData, this.address);
    }
    
    private getListingService = (metadata: any, address: string) => {
        const creds = grpc.credentials.createSsl();

        const callCreds = grpc.credentials.createFromMetadataGenerator(
            (serviceUrl:string, callback:any) => {
                callback(null, metadata)
            }
        );
        const combinedCreds = grpc.credentials.combineChannelCredentials(creds, callCreds);
        return new ListingService(address, combinedCreds);
    };

    public getListing = (listingId:string, callback:any) => {
        return this.listingService.getListing(listingId, (error:string, listing:Listing) => {
            // if (!error) {
            //     error = listing.error || null;
            // }
            if (callback) {
                callback(error, listing);
            }
        });
    };

    public deleteListing = (listingId:string, callback:any) => {
        return this.listingService.deleteListing(listingId, (error:string, listing:Listing)=> {
            // if (!error) {
            //     error = listing.error || null;
            // }
            if (callback) {
                callback(error, listing);
            }
        });
    };

    public putListing = (listing:Listing, callback:any) => {
        return this.listingService.putListing(listing, (error:string, listing:Listing) => {
            // if (!error) {
            //     error = listing.error || null;
            // }
            if (callback) {
                callback(error, listing);
            }
        });
    };

    private getReviewService = (metadata: any, address: string) => {
        const creds = grpc.credentials.createSsl();

        const callCreds = grpc.credentials.createFromMetadataGenerator(
            (serviceUrl:string, callback:any) => {
                callback(null, metadata)
            }
        );
        const combinedCreds = grpc.credentials.combineChannelCredentials(creds, callCreds);
        return new ReviewService(address, combinedCreds);
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
}
