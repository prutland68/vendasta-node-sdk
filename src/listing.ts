/// <reference path="./protos/datariver.d.ts" />
import {Client, Listing, Geo} from './client';

class GeoLocation {
    // Unrealistic values represent defaults (not set).
    public latitude: number = 1000;
    public longitude: number = 1000;
}

class ListingModel {
    private client: Client;
    private vendastaId: string = "";
    public externalId: string = "";  // A company's internal id of the listing document.
    public companyName: string = "";
    public businessCategories: string[] = [];
    public additionalPhoneNumbers: string[] = [];
    public address: string = "";
    public averageReviewRating: number = -1;  // -1 means not set.
    public city: string = "";
    public country: string = "";
    public location: GeoLocation = new GeoLocation();
    public numberOfReviews: number = -1;    // -1 means not set.
    public phone: string = "";
    public state: string = "";
    public url: string = "";
    public website: string = "";
    public zipCode: string = "";


    constructor(private client: Client) {
        this.client = client;
    }
    public getVendastaId() {
        return this.vendastaId;
    }
    public save(callback) {
        var listing = this.toListingMessage();
        this.client.putListing(listing, callback)
    }
    public static getListingById(vendastaId: string, client: Client, callback) {
        let listing: datariver.Listing = client.getListing(vendastaId, callback);
        let vListing: ListingModel = new ListingModel(client);
        vListing = vListing.fromListingMessage(listing);
        return vListing;
    }
    public delete(callback) {
        this.client.deleteListing(this.vendastaId, callback);
    }
    private toListingMessage(): datariver.Listing {
        let grpcListing: datariver.Listing = new Listing();
        grpcListing.vendasta_id = this.vendastaId;
        grpcListing.external_id = this.externalId;
        grpcListing.company_name = this.companyName;
        grpcListing.address = this.address;
        grpcListing.phone = this.phone;
        grpcListing.additional_phone_numbers = this.additionalPhoneNumbers;
        grpcListing.business_categories = this.businessCategories;
        grpcListing.average_review_rating = this.averageReviewRating;
        grpcListing.city = this.city;
        grpcListing.country = this.country;
        grpcListing.location = new Geo();
        grpcListing.location.latitude = this.location.latitude;
        grpcListing.location.longitude = this.location.longitude;
        grpcListing.state = this.state;
        grpcListing.url = this.url;
        grpcListing.website = this.website;
        grpcListing.zip_code = this.zipCode;
        grpcListing.number_of_reviews = this.numberOfReviews;
        return grpcListing;
    }

    private fromListingMessage(listing:datariver.Listing) {
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
    }

}
