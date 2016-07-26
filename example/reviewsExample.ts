import {Client, Environment, Listing, Geo, Review} from "../src/index"
import {Timestamp, Empty, ListReviewsResponse} from "../src/protos/protos";
import {ListReviewsRequest} from "../src/protos/protos";
const client = new Client(Environment.TEST, 'my-example-token');    // ask us for a token.


// Create a listing object to put.
var listing = <Listing> new Listing();
listing.external_id = "vendasta-technologies-12345";
listing.company_name = "Vendasta Technologies Inc.";
listing.business_categories[0] = "marketing";
listing.additional_phone_numbers[0] = "1-306-555-1212";
listing.address = "Suite 405, Avenue Building";
listing.average_review_rating = 5;
listing.city = "Saskatoon";
listing.state = "SK";
listing.country = "CA";
listing.location = new Geo();
listing.location.latitude = 52.1265741;
listing.location.longitude = -106.6648763;
listing.number_of_reviews = 17;
listing.phone = "1-306-955-5512";
listing.url = "www.example-source.com/vendasta-technologies-12345";
listing.website = "www.vendasta.com";
listing.zip_code = "S7K 1M1";

client.putListing(listing, putListingCallback);
let listingId: string = null;
let reviewId: string = null;
// Create a review object to put.


function putListingCallback(error: any, listing: Listing) {
    console.log("**** PUT LISTING FOR REVIEW ****");
    printErrorAndResponse(error, listing);
    if (error)
        return;
    listingId = listing.listing_id;
    console.log(listing);
    var review = <Review> new Review();
    review.url = "www.example-source.com/vendasta-technologies-12345";
    review.star_rating = 5.0;
    review.reviewer_name = "John Jones";
    review.reviewer_email = "john12345@jones.com";
    review.reviewer_url = "jones.com/blog";
    review.content = "Such an amazing place!";
    review.published_date = new Timestamp(Date.now() / 1000, Date.now() * 1000);
    review.title = "My review!";
    review.listing_id = listing.listing_id;
    client.putReview(review, null);
    client.putReview(review, null);
    client.putReview(review, putReviewCallback);
}
function putReviewCallback(error: string, response: Review) {
    console.log("**** Put review output: ****");
    printErrorAndResponse(error, response);
    if (error)
        return;
    reviewId = response['review_id'];
    // Get the review we just added
    client.getReview(reviewId, getReviewCallback)
}

function getReviewCallback(error: string, response: Review) {
    console.log("**** Get review output: ****");
    printErrorAndResponse(error, response);
    if (error)
        return;
    let page_size = 10;
    let offset = 0;
    // To show that the delete went through.
    client.listReviews(listingId, page_size, offset, listReviewsCallback);
}

function deleteReviewCallback(error: string, response: Review) {
    console.log("**** Delete reviews output: ****");
    printErrorAndResponse(error, response);
    if (error)
        return;
}

function listReviewsCallback(error: string, reviews: [Review]) {
    console.log("**** LIST REVIEWS output: ****");
    printErrorAndResponse(error, reviews);
    if (error)
        return;
    for (var index=0; index < reviews.length; index++) {
        let review = reviews[index];
        console.log(review.review_id);
        if (index == (reviews.length - 1)) {
            client.deleteReview(review.review_id, finalGetReviewCallback)
        }
        else {
            client.deleteReview(review.review_id, deleteReviewCallback);
        }
    }
}

function finalGetReviewCallback(error: string, response: Empty) {
    console.log("**** Final Delete review output: ****");
    printErrorAndResponse(error, response);
    if (error)
        return;
    client.getReview(reviewId, null);
}

function printErrorAndResponse(error: any, response: any) {
    console.log(error);
    console.log(response);
}

