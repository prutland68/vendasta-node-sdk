/// <reference path="../typings/index.d.ts" />
import {Client, Environment, Listing, Geo, Review} from "../src/index"
import Timestamp = Proto2TypeScript.google.protobuf.Timestamp;
import ListReviewsResponse = Proto2TypeScript.datariver.ListReviewsResponse;
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


function putListingCallback(error: string, response: Listing) {
    console.log("**** Put listing output: ****");
    printErrorAndResponse(error, response);
    if (error)
        return;
    listingId = response['listing_id'];
    // Get the listing we just added
    client.getListing(listingId, getListingCallback)
}

function getListingCallback(error: string, response: Listing) {
    console.log("**** Get listing output: ****");
    printErrorAndResponse(error, response);
    if (error)
        return;
    // Remove the listing we added
    client.deleteListing(listingId, deleteListingCallback);
}

function deleteListingCallback(error: string, response: Listing) {
    console.log("**** Delete listing output: ****");
    printErrorAndResponse(error, response);
    if (error)
        return;
    // To show that the delete went through.
    client.getListing(listingId, finalListingCallback);
}

function finalListingCallback(error: string, response: Listing) {
    console.log("**** Final get listing output: ****");
    printErrorAndResponse(error, response);
}

function printErrorAndResponse(error: any, response: any) {
    console.log(error);
    console.log(response);
}


// Create a review object to put.
var review = new Review();
review.url = "www.example-source.com/vendasta-technologies-12345";
review.star_rating = 5.0;
review.reviewer_name = "John Jones"
review.reviewer_email = "john12345@jones.com";
review.reviewer_url = "jones.com/blog";
review.content = "Such an amazing place!";
review.published_date = new Timestamp(Date.now() / 1000, Date.now() * 1000);
review.title = "My review!";

client.putReview(listing, putReviewCallback);
let reviewId: string = null;


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
    // Remove the review we added
    client.deleteReview(reviewId, deleteReviewCallback);
}

function deleteReviewCallback(error: string, response: Review) {
    console.log("**** Delete review output: ****");
    printErrorAndResponse(error, response);
    if (error)
        return;
    // To show that the delete went through.
    client.listReviews(listingId, listReviewsCallback);
}

function listReviewsCallback(error: string, response: ListReviewsResponse) {
    console.log("**** List reviews output: ****");
    printErrorAndResponse(error, response);
    if (error)
        return;
    // Get the reviews we just added
    client.getReview(reviewId, finalReviewCallback)
}

function finalReviewCallback(error: string, response: Review) {
    console.log("**** Final get review output: ****");
    printErrorAndResponse(error, response);
}

function printErrorAndResponse(error: any, response: any) {
    console.log(error);
    console.log(response);
}
