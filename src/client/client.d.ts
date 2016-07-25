import { Listing, Review } from '../protos/protos';
export declare enum Environment {
    TEST = 1,
    PRODUCTION = 2,
}
export declare class Client {
    private environment;
    private token;
    private metaData;
    private listingService;
    private reviewService;
    private address;
    constructor(environment: Environment, token: string, listingService?: any, reviewService?: any);
    private getListingService;
    private getReviewService;
    getListing: (listingId: string, callback: any) => any;
    deleteListing: (listingId: string, callback: any) => any;
    putListing: (listing: Listing, callback: any) => any;
    getReview: (reviewId: string, callback: any) => any;
    deleteReview: (reviewId: string, callback: any) => any;
    putReview: (review: Review, callback: any) => any;
    listReviews: (listingId: any, callback: any) => any;
}
