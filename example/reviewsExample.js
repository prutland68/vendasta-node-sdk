"use strict";
var index_1 = require("../src/index");
var client = new index_1.Client(index_1.Environment.TEST, 'thisistestingonly'); // ask us for a token.
var review = new index_1.Review();
// Create a listing object to put.
var listing = new index_1.Listing();
listing.external_id = "vendasta-technologies-12345";
listing.company_name = "Vendasta Technologies Inc.";
listing.business_categories[0] = "marketing";
listing.additional_phone_numbers[0] = "1-306-555-1212";
listing.address = "Suite 405, Avenue Building";
listing.average_review_rating = 5;
listing.city = "Saskatoon";
listing.state = "SK";
listing.country = "CA";
listing.location = new index_1.Geo();
listing.location.latitude = 52.1265741;
listing.location.longitude = -106.6648763;
listing.number_of_reviews = 17;
listing.phone = "1-306-955-5512";
listing.url = "www.example-source.com/vendasta-technologies-12345";
listing.website = "www.vendasta.com";
listing.zip_code = "S7K 1M1";
client.putListing(listing, putListingCallback);
var listingId = null;
var listingExternalId = null;
// Create a review object to put.
function putListingCallback(error, listing) {
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
    review.published_date = new index_1.Timestamp(Date.now() / 1000, 0); // Date.now() has millisecond precision
    review.title = "My review!";
    review.listing_id = listing.listing_id;
    client.putReview(review, null);
    client.putReview(review, null);
    client.putReview(review, null);
    client.putReview(review, null);
    client.putReview(review, null);
    client.putReview(review, putReviewCallback);
}
function putReviewCallback(error, response) {
    console.log("\n**** Put review output: ****");
    printErrorAndResponse(error, response);
    if (error)
        return;
    review.review_id = response.review_id;
    if (response.published_date.seconds != review.published_date.seconds) {
        console.log("Published date seconds are: " + response.published_date.seconds);
        console.log("Should be " + review.published_date.seconds);
        throw new Error("!!! Review that was put does not match response from server");
    }
    // Get the review we just added
    client.getReview(review.review_id, getReviewCallback);
}
function getReviewCallback(error, response) {
    console.log("\n**** Get review output: ****");
    printErrorAndResponse(error, response);
    if (error)
        return;
    var page_size = 10;
    var offset = 0;
    // To show that the delete went through.
    client.listReviews(null, listingExternalId, page_size, offset, listReviewsExternalIdCallback);
}
function listReviewsExternalIdCallback(error, response) {
    console.log("\n**** List review by external id output: ****");
    printErrorAndResponse(error, response);
    if (error)
        return;
    var page_size = 10;
    var offset = 0;
    // To show that the delete went through.
    client.listReviews(listingId, null, page_size, offset, listReviewsCallback);
}
function listReviewsCallback(error, reviews) {
    console.log("**** LIST REVIEWS by listing_id output: ****");
    printErrorAndResponse(error, reviews);
    if (error)
        return;
    for (var index = 0; index < reviews.length; index++) {
        var review_1 = reviews[index];
        console.log(review_1.review_id);
        client.deleteReview(review_1.review_id, deleteReviewCallback);
    }
    setTimeout(client.getReview.bind(null, reviews[0].review_id, finalGetNonExistentReviewCallback), 3000);
}
function deleteReviewCallback(error, response) {
    console.log("**** Delete review output: ****");
    printErrorAndResponse(error, response);
    if (error)
        return;
}
function finalGetNonExistentReviewCallback(error, response) {
    console.log("\n**** Get non-existent review output: ****");
    printErrorAndResponse(error, response);
    console.log("\nEND EXAMPLE USAGE!");
}
function printErrorAndResponse(error, response) {
    console.log("Error: ", error);
    console.log("Response: ", response);
}
//# sourceMappingURL=reviewsExample.js.map