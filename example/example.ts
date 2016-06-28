/// <reference path="../typings/index.d.ts" />
import {Client, Environment, Listing} from "../src/index"

const client = new Client(Environment.TEST, '8d535a7c8301cd87957013b7210f4c03');

// Create a listing object to put.
var listing = new Listing();
listing.address = "123 Test Dr.";
listing.external_id = "externalId"; // Required
listing.url = "http://www.vendasta.com"; // Required

client.putListing(listing, callback);

var listingId = listing.vendasta_id;
// Get the listing we just added
client.getListing(listingId, callback);

// Remove the listing we added
client.deleteListing(listingId, callback);

// To show that the delete went through.
client.getListing(listingId, callback);

function callback(error: any, response: any) {
    console.log(error);
    console.log(response);
}
