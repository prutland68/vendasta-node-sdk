"use strict";
/// <reference path="../typings/index.d.ts" />
var index_1 = require("../src/index");
var client = new index_1.Client(index_1.Environment.TEST, '8d535a7c8301cd87957013b7210f4c03');
// Create a listing object to put.
var listing = new index_1.Listing();
listing.address = "123 Test Dr.";
listing.external_id = "externalId"; // Required
listing.url = "http://www.vendasta.com"; // Required
client.putListing(listing, callback);
var listingId = '8a5e61f655dd8a37a6a50572b805f9afeb3250d09eb896cc1ddaab910bb1d974';
// Get the listing we just added
client.getListing(listingId, callback);
// Remove the listing we added
client.deleteListing(listingId, callback);
// To show that the delete went through.
client.getListing(listingId, callback);
function callback(error, response) {
    console.log(error);
    console.log(response);
}
//# sourceMappingURL=example.js.map