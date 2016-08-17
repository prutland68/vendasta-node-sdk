const grpc = require("grpc");

import {Listing, Review, Empty, ListingService, ReviewService, GetListingRequest, DeleteListingRequest,
        GetReviewRequest, DeleteReviewRequest, ListReviewsRequest, ListReviewsResponse} from '../protos/protos';

export enum Environment{
    TEST = 1,
    PRODUCTION = 2
}

export class Client {
    private metaData = new grpc.Metadata();
    private listingService:ListingService;
    private reviewService:ReviewService;
    private address:string;

    /**
     *
     * @param environment: Environment.TEST or Environment.PRODUCTION. (Production not implemented yet).
     * @param token: Token provided by us.
     */
    constructor(private environment:Environment, private token:string,
                listingService: ListingService = null, reviewService: ReviewService = null) {
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

    /** Get a listing by listingId
     * @param listingId: The listingId of the listing.
     * @param callback: Callback is called when the listing is retrieved.
     *                  Should be of the form function(error: string, listing: Listing)
     */
    public getListing = (listingId:string, callback:any) => {
        let request: GetListingRequest = new GetListingRequest();
        request.listing_id = listingId;
        return this.listingService.get(request, (error:any, listing:Listing) => {
            if (callback) {
                if (error)
                    error = error.toString();
                callback(error, listing);
            }
        });
    };

    /** Delete the listing with the given listingId
     * @param listingId: The listingId of the listing to delete.
     * @param callback: Callback is called when the listing is retrieved.
     *                  Should be of the form function(error: string, empty: Empty)
     */
    public deleteListing = (listingId:string, callback:any) => {
        let request: DeleteListingRequest = new DeleteListingRequest();
        request.listing_id = listingId;
        return this.listingService.delete(request, (error:any, emptyResponse:Empty)=> {
            if (callback) {
                if (error)
                    error = error.toString();
                callback(error, emptyResponse);
            }
        });
    };

    /** Save the listing.
     * @param listing: A Listing object. (url, external_id are required).
     * @param callback Callback is called when the listing is retrieved.
     *                 Should be of the form function(error: string, listing: Listing)
     */
    public putListing = (listing:Listing, callback:any) => {
        return this.listingService.put(listing, (error:any, listing:Listing) => {
            if (callback) {
                if (error)
                    error = error.toString();
                callback(error, listing);
            }
        });
    };

    /** Get the review with the given reviewId
     * @param reviewId: reviewId of the review to retrieve.
     * @param callback: Callback is called when the listing is retrieved.
     *                  Should be of the form function(error: string, review: Review)
     */
    public getReview = (reviewId: string, callback:any) => {
        let request: GetReviewRequest = new GetReviewRequest();
        request.review_id = reviewId;
        return this.reviewService.get(request, (error:any, review:Review) => {
            if (callback) {
                if (error)
                    error = error.toString();
                callback(error, review);
            }
        });
    };

    /** Delete the review with the given reviewId
     *
     * @param reviewId: reviewId of the review to retrieve.
     * @param callback Callback is called when the listing is retrieved.
     *                 Should be of the form function(error: string, listing: Listing)
     */
    public deleteReview = (reviewId: string, callback:any) => {
        let request: DeleteReviewRequest = new DeleteReviewRequest();
        request.review_id = reviewId;
        return this.reviewService.delete(request, (error:any, review:Review)=> {
            if (callback) {
                if (error)
                    error = error.toString();
                callback(error, review);
            }
        });
    };

    /** Save the review.
     * @param review: The Review object to save.
     * @param callback: Callback is called when the listing is retrieved.
     *                  Should be of the form function(error: string, listing: Listing)
     */
    public putReview = (review:Review, callback:any) => {
        return this.reviewService.put(review, (error:any, review:Review) => {
            if (callback) {
                if (error)
                    error = error.toString();
                callback(error, review);
            }
        });
    };

    /** Retrieve the reviews from the given listingId. These should be paged through via offset and page_size.
     * If iterating over all of the reviews, you should call the offset incremented by the page_size on every call.
     * NOTE: Only one of listingId and listingExternalId can be provided.
     * @param listingId: the listingId tied to the review.
     * @param listingExternalId: The external id of the listing to get the reviews for.
     * @param page_size: The number of reviews to return.
     * @param offset: The offset at which to start searching.
     * @param callback: Callback is called when the listing is retrieved.
     *                  Should be of the form function(error: string, listing: Listing)
     */
    public listReviews = (listingId: string, listingExternalId: string, page_size: number, offset: number, callback:any) => {
        let request: ListReviewsRequest = new ListReviewsRequest();
        request.listing_id = listingId || '';
        request.listing_external_id = listingExternalId || '';
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
