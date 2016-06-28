"use strict";
/// <reference path="../typings/index.d.ts" />
var index_1 = require("../src/index");
var client = new index_1.Client(index_1.Environment.TEST, '8d535a7c8301cd87957013b7210f4c03');
// Create a listing object to put.
var listing = new index_1.Listing();
listing.address = "123 Test Dr.";
listing.external_id = "externalId"; // Required
listing.url = "http://www.vendasta.com"; // Required
client.putListing(listing, putListingCallback);
var listingId = null;
function putListingCallback(error, response) {
    printErrorAndResponse(error, response);
    listingId = response['vendasta_id'];
    // Get the listing we just added
    client.getListing(listingId, getListingCallback);
}
function getListingCallback(error, response) {
    printErrorAndResponse(error, response);
    // Remove the listing we added
    client.deleteListing(listingId, deleteListingCallback);
}
function deleteListingCallback(error, response) {
    printErrorAndResponse(error, response);
    // To show that the delete went through.
    client.getListing(listingId, finalCallback);
}
function finalCallback(error, response) {
    printErrorAndResponse(error, response);
    // node exit, as needed.
}
function printErrorAndResponse(error, response) {
    console.log(error);
    console.log(response);
}
//# sourceMappingURL=example.js.map