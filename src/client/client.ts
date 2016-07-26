const grpc = require("grpc");

import {Listing, Review, Empty, ListingService, ReviewService, GetListingRequest, DeleteListingRequest,
        GetReviewRequest, DeleteReviewRequest, ListReviewsRequest, ListReviewsResponse} from '../protos/protos';

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
            this.address = "directory-sandbox.vendasta.com:23000";  // assume test
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
        let request = new GetListingRequest();
        request.listing_id = listingId;
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
        let request = new DeleteListingRequest();
        request.listing_id = listingId;
        return this.listingService.delete(request, (error:any, emptyResponse:Empty)=> {
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
        let request = new GetReviewRequest();
        request.review_id = reviewId;
        return this.reviewService.get(request, (error:any, review:Review) => {
            if (callback) {
                if (error)
                    error = error.toString();
                callback(error, review);
            }
        });
    };

    public deleteReview = (reviewId: string, callback:any) => {
        let request = new DeleteReviewRequest();
        request.review_id = reviewId;
        return this.reviewService.delete(request, (error:any, review:Review)=> {
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

    public listReviews = (listingId: string, page_size: number, offset: number, callback:any) => {
        let request = new ListReviewsRequest();
        request.listing_id = listingId;
        request.page_size = page_size;
        request.offset = offset;
        return this.reviewService.list(request, (error:any, reviewResponse:ListReviewsResponse) => {
            if (callback) {
                if (error)
                    error = error.toString();
                callback(error, reviewResponse.reviews);
            }
        });
    };
}
