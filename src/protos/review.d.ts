declare module vendasta.listings {
    interface ProtoBufModel {
        toArrayBuffer(): ArrayBuffer;
        //toBuffer(): NodeBuffer;
        //encode(): ByteBuffer;
        toBase64(): string;
        toString(): string;
    }

    export interface Empty extends ProtoBufModel {

    }

    export interface Timestamp extends ProtoBufModel {
        seconds?: number;
        nanos?: number;

    }

    export interface GetReviewRequest extends ProtoBufModel {
        review_id?: string;
    }

    export interface Review extends ProtoBufModel {
        review_id?: string;
        listing_id?: string;
        url?: string;
        star_rating?: number;
        reviewer_name?: string;
        reviewer_email?: string;
        reviewer_url?: string;
        content?: string;
        published_date?: Timestamp;
        title?: string;

    }

    export interface DeleteReviewRequest extends ProtoBufModel {
        review_id?: string;

    }

    export interface ListReviewsRequest extends ProtoBufModel {
        listing_id?: string;
        listing_external_id?: string;
        offset?: number;
        page_size?: number;

    }

    export interface ListReviewsResponse extends ProtoBufModel {
        reviews?: Review[];

    }

    export interface ReviewService extends ProtoBufModel {
        put(listing: Listing, callback: (error: any, review:Review) => any): void;
        get(request: GetReviewRequest, callback: (error: any, review:Review) => any): void;
        delete(listingId: Empty, callback: (error: any, empty:Empty) => any): void;
        list(request: ListReviewsRequest, callback: (error: any, reviewResponse:ListReviewsResponse) => any): void;
    }

}
