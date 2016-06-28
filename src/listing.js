"use strict";
var ListingModel = (function () {
    function ListingModel() {
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
    }
    ListingModel.prototype.consructor = function () {
        //TOOD initialize default for geolocation.
    };
    ListingModel.prototype.getVendastaId = function () {
        return this.vendastaId;
    };
    ListingModel.prototype.save = function () {
        // TODO
    };
    ListingModel.prototype.getListingById = function (vendastaId, client) { };
    ListingModel.prototype.delete = function () { };
    ListingModel.prototype.toListingMessage = function () { };
    ListingModel.prototype.fromListingMessage = function () { };
    return ListingModel;
}());
//# sourceMappingURL=listing.js.map