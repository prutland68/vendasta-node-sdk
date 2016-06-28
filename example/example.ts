/// <reference path="../typings/index.d.ts" />
import {Client, Environment, Listing} from "../src/index"

const client = new Client(Environment.TEST, '8d535a7c8301cd87957013b7210f4c03');

// Create a listing object to put.
var listing = new Listing();
listing.address = "123 Test Dr.";
listing.external_id = "externalId"; // Required
listing.url = "http://www.vendasta.com"; // Required

client.putListing(listing, putListingCallback);
var listingId = null;


function putListingCallback(error: any, response: any) {
    printErrorAndResponse(error, response);
    listingId = response['vendasta_id'];
    // Get the listing we just added
    client.getListing(listingId, getListingCallback)
}

function getListingCallback(error: any, response: any) {
    printErrorAndResponse(error, response);
    // Remove the listing we added
    client.deleteListing(listingId, deleteListingCallback);
}

function deleteListingCallback(error: any, response: any) {
    printErrorAndResponse(error, response);
    // To show that the delete went through.
    client.getListing(listingId, finalCallback);
}

function finalCallback(error: any, response: any) {
    printErrorAndResponse(error, response);
    // node exit, as needed.
}

function printErrorAndResponse(error: any, response: any) {
    console.log(error);
    console.log(response);
}
