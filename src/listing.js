"use strict";
/// <reference path="./protos/datariver.d.ts" />
var client_1 = require('./client');
var GeoLocation = (function () {
    function GeoLocation() {
        // Unrealistic values represent defaults (not set).
        this.latitude = 1000;
        this.longitude = 1000;
    }
    return GeoLocation;
}());
var ListingModel = (function () {
    function ListingModel(client) {
        this.client = client;
        this.vendastaId = "";
        this.externalId = ""; // A company's internal id of the listing document.
        this.companyName = "";
        this.businessCategories = [];
        this.additionalPhoneNumbers = [];
        this.address = "";
        this.averageReviewRating = -1; // -1 means not set.
        this.city = "";
        this.country = "";
        this.location = new GeoLocation();
        this.numberOfReviews = -1; // -1 means not set.
        this.phone = "";
        this.state = "";
        this.url = "";
        this.website = "";
        this.zipCode = "";
        this.client = client;
    }
    ListingModel.prototype.getVendastaId = function () {
        return this.vendastaId;
    };
    ListingModel.prototype.save = function (callback) {
        var listing = this.toListingMessage(null);
        this.client.putListing(listing, callback);
    };
    ListingModel.getListingById = function (vendastaId, client, callback) {
        var listing = client.getListing(vendastaId, callback);
        var vListing = new ListingModel(client);
        vListing = vListing.fromListingMessage(listing);
        return vListing;
    };
    ListingModel.prototype.delete = function (callback) {
        this.client.deleteListing(this.vendastaId, callback);
    };
    ListingModel.prototype.toListingMessage = function () {
        var grpcListing = new client_1.Listing();
        grpcListing.vendasta_id = this.vendastaId;
        grpcListing.external_id = this.externalId;
        grpcListing.company_name = this.companyName;
        grpcListing.address = this.address;
        grpcListing.phone = this.phone;
        // TODO fix this grpcListing.additional_phone_numbers.Add(this.additionalPhoneNumbers.GetRange(0, this.additionalPhoneNumbers.Count));
        // TODO fix this grpcListing.business_categories.Add(this.businessCategories);
        grpcListing.average_review_rating = this.averageReviewRating;
        grpcListing.city = this.city;
        grpcListing.country = this.country;
        // TODO fix this grpcListing.location = new Geo();
        // TODO fix this grpcListing.location.latitude = this.location.latitude;
        // TODO fix this grpcListing.location.longitude = this.location.longitude;
        grpcListing.state = this.state;
        grpcListing.url = this.url;
        grpcListing.website = this.website;
        grpcListing.zip_code = this.zipCode;
        grpcListing.number_of_reviews = this.numberOfReviews;
        return grpcListing;
    };
    ListingModel.prototype.fromListingMessage = function (listing) {
        this.vendastaId = listing.vendasta_id;
        this.externalId = listing.external_id;
        this.companyName = listing.company_name;
        this.address = listing.address;
        this.phone = listing.phone;
        this.additionalPhoneNumbers = listing.additional_phone_numbers.slice();
        this.businessCategories = listing.business_categories.slice();
        this.averageReviewRating = listing.average_review_rating;
        this.city = listing.city;
        this.country = listing.country;
        if (listing.location != null) {
            this.location = new GeoLocation();
            this.location.latitude = listing.location.latitude;
            this.location.longitude = listing.location.longitude;
        }
        this.state = listing.state;
        this.url = listing.url;
        this.website = listing.website;
        this.zipCode = listing.zip_code;
        this.numberOfReviews = listing.number_of_reviews;
    };
    return ListingModel;
}());
//# sourceMappingURL=listing.js.map