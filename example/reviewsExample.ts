import {Client, Environment, Listing, Geo, Review, Timestamp, Empty} from "../src/index"
const client = new Client(Environment.TEST, 'my-example-token');    // ask us for a token.

let review = new Review();

// Create a listing object to put.
let listing = new Listing();
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
let listingExternalId: string = null;
// Create a review object to put.

function putListingCallback(error: any, listing: Listing) {
    console.log("\n**** PUT LISTING FOR REVIEW ****");
    printErrorAndResponse(error, listing);
    if (error)
        return;
    listingId = listing.listing_id;
    listingExternalId = listing.external_id;
    console.log(listing);
    review.url = "www.example-source.com/vendasta-technologies-12345";
    review.star_rating = 5.0;
    review.reviewer_name = "John Jones";
    review.reviewer_email = "john12345@jones.com";
    review.reviewer_url = "jones.com/blog";
    review.content = "Such an amazing place!";
    review.published_date = new Timestamp(Date.now() / 1000, 0); // Date.now() has millisecond precision
    review.title = "My review!";
    review.listing_id = listing.listing_id;
    client.putReview(review, null);
    client.putReview(review, null);
    client.putReview(review, null);
    client.putReview(review, null);
    client.putReview(review, null);
    client.putReview(review, putReviewCallback);
}

function putReviewCallback(error: string, response: Review) {
    console.log("\n**** Put review output: ****");
    printErrorAndResponse(error, response);
    if (error)
        return;
    review.review_id = response.review_id;
    if(response.published_date.seconds != review.published_date.seconds) {
        console.log("Published date seconds are: " + response.published_date.seconds);
        console.log("Should be " + review.published_date.seconds);
        throw new Error("!!! Review that was put does not match response from server");
    }
    // Get the review we just added
    client.getReview(review.review_id, getReviewCallback)
}

function getReviewCallback(error: string, response: Review) {
    console.log("\n**** Get review output: ****");
    printErrorAndResponse(error, response);
    if (error)
        return;
    let page_size = 10;
    let offset = 0;
    // To show that the delete went through.
    client.listReviews(null, listingExternalId,  page_size, offset, listReviewsExternalIdCallback);
}

function listReviewsExternalIdCallback(error: string, response: [Review]) {
    console.log("\n**** List review by external id output: ****");
    printErrorAndResponse(error, response);
    if (error)
        return;
    let page_size = 10;
    let offset = 0;
    // To show that the delete went through.
    client.listReviews(listingId, null,  page_size, offset, listReviewsCallback);
}


function listReviewsCallback(error: string, reviews: [Review]) {
    console.log("**** LIST REVIEWS by listing_id output: ****");
    printErrorAndResponse(error, reviews);
    if (error)
        return;
    for (let index=0; index < reviews.length; index++) {
        let review = reviews[index];
        console.log(review.review_id);
        client.deleteReview(review.review_id, deleteReviewCallback);
    }
    setTimeout(client.getReview.bind(null, reviews[0].review_id, finalGetNonExistentReviewCallback), 3000);
}

function deleteReviewCallback(error: string, response: Empty) {
    console.log("**** Delete review output: ****");
    printErrorAndResponse(error, response);
    if (error)
        return;
}


function finalGetNonExistentReviewCallback(error: string, response: Review) {
    console.log("\n**** Get non-existent review output: ****");
    printErrorAndResponse(error, response);
    console.log("\nEND EXAMPLE USAGE!")
}

function printErrorAndResponse(error: any, response: any) {
    console.log("Error: ", error);
    console.log("Response: ", response);
}

