/// <reference path="../typings/index.d.ts" />
import {Client, Environment, Listing, Geo} from "../src/index"
const client = new Client(Environment.TEST, 'my-example-token');    // ask us for a token.

// Create a listing object to put.
var listing = new Listing();
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


function putListingCallback(error: any, response: any) {
    console.log("**** Put listing output: ****");
    printErrorAndResponse(error, response);
    listingId = response['listing_id'];
    // Get the listing we just added
    client.getListing(listingId, getListingCallback)
}

function getListingCallback(error: any, response: any) {
    console.log("**** Get listing output: ****");
    printErrorAndResponse(error, response);
    // Remove the listing we added
    client.deleteListing(listingId, deleteListingCallback);
}

function deleteListingCallback(error: any, response: any) {
    console.log("**** Delete listing output: ****");
    printErrorAndResponse(error, response);
    // To show that the delete went through.
    client.getListing(listingId, finalCallback);
}

function finalCallback(error: any, response: any) {
    console.log("**** Final get listing output: ****");
    printErrorAndResponse(error, response);
}

function printErrorAndResponse(error: any, response: any) {
    console.log(error);
    console.log(response);
}
