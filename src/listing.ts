/// <reference path="./protos/datariver.d.ts" />
import {Client, Listing} from './client';

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
    public location: Geolocation = new Geolocation();
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
        var listing = this.toListingMessage(null);
        this.client.putListing(listing, callback)
    }
    public static getListingById(vendastaId: string, client: Client, callback) {
        let listing: datariver.Listing = client.getListing(vendastaId, callback);
        let vListing: ListingModel = new ListingModel(client);
        vListing = vListing.fromListingMessage(listing, callback);
        return vListing;
    }
    public delete(callback) {
        this.client.deleteListing(this.vendastaId, callback);
    }
    private toListingMessage(callback): datariver.Listing {
        let grpcListing: datariver.Listing = new Listing();
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
    }

    private fromListingMessage(listing:datariver.Listing, callback):ListingModel {
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
    }

}
