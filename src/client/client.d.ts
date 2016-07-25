import { Listing } from '../protos/protos';
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
    getListing: (listingId: string, callback: any) => any;
    deleteListing: (listingId: string, callback: any) => any;
    putListing: (listing: Listing, callback: any) => any;
    private getReviewService;
    getReview: (reviewId: string, listingId: string, callback: any) => any;
}
