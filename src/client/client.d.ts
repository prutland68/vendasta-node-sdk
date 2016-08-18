import { Listing, Review, ListingService, ReviewService } from '../protos/protos';
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
    /**
     *
     * @param environment: Environment.TEST or Environment.PRODUCTION. (Production not implemented yet).
     * @param token: Token provided by us.
     */
    constructor(environment: Environment, token: string, listingService?: ListingService, reviewService?: ReviewService);
    private getCallCredentials(metadata);
    /** Get a listing by listingId
     * @param listingId: The listingId of the listing.
     * @param callback: Callback is called when the listing is retrieved.
     *                  Should be of the form function(error: string, listing: Listing)
     */
    getListing: (listingId: string, callback: any) => void;
    /** Delete the listing with the given listingId
     * @param listingId: The listingId of the listing to delete.
     * @param callback: Callback is called when the listing is retrieved.
     *                  Should be of the form function(error: string, empty: Empty)
     */
    deleteListing: (listingId: string, callback: any) => void;
    /** Save the listing.
     * @param listing: A Listing object. (url, external_id are required).
     * @param callback Callback is called when the listing is retrieved.
     *                 Should be of the form function(error: string, listing: Listing)
     */
    putListing: (listing: Listing, callback: any) => void;
    /** Get the review with the given reviewId
     * @param reviewId: reviewId of the review to retrieve.
     * @param callback: Callback is called when the listing is retrieved.
     *                  Should be of the form function(error: string, review: Review)
     */
    getReview: (reviewId: string, callback: any) => void;
    /** Delete the review with the given reviewId
     *
     * @param reviewId: reviewId of the review to retrieve.
     * @param callback Callback is called when the listing is retrieved.
     *                 Should be of the form function(error: string, listing: Listing)
     */
    deleteReview: (reviewId: string, callback: any) => void;
    /** Save the review.
     * @param review: The Review object to save.
     * @param callback: Callback is called when the listing is retrieved.
     *                  Should be of the form function(error: string, listing: Listing)
     */
    putReview: (review: Review, callback: any) => void;
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
    listReviews: (listingId: string, listingExternalId: string, page_size: number, offset: number, callback: any) => void;
}
