"use strict";
/// <reference path="./protos/datariver.d.ts" />
var client_1 = require('./client');
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
        this.location = new Geolocation();
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
        vListing = vListing.fromListingMessage(listing, callback);
        return vListing;
    };
    ListingModel.prototype.delete = function (callback) {
        this.client.deleteListing(this.vendastaId, callback);
    };
    ListingModel.prototype.toListingMessage = function (callback) {
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
    ListingModel.prototype.fromListingMessage = function (listing, callback) {
        this.vendastaId = listing.VendastaId;
        this.externalId = listing.ExternalId;
        this.CompanyName = listing.CompanyName;
        this.Address = listing.Address;
        this.Phone = listing.Phone;
        this.AdditionalPhoneNumbers.AddRange(listing.AdditionalPhoneNumbers);
        this.BusinessCategories.AddRange(listing.BusinessCategories);
        this.AverageReviewRating = listing.AverageReviewRating;
        this.City = listing.City;
        this.Country = listing.Country;
        if (listing.Location != null) {
            this.Location = new GeoLocation();
            this.Location.Latitude = listing.Location.Latitude;
            this.Location.Longitude = listing.Location.Longitude;
        }
        this.State = listing.State;
        this.Url = listing.Url;
        this.Website = listing.Website;
        this.ZipCode = listing.ZipCode;
        this.NumberOfReviews = listing.NumberOfReviews;
    };
    return ListingModel;
}());
//# sourceMappingURL=listing.js.map