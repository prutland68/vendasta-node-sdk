import {datariverProto} from './protos/protos';
import {Client} from './client';

class ListingModel {
    private client: Client;
    private vendastaId: string = "";
    public externalId: string = "";  // A company's internal id of the listing document.
    public companyName: string = "";
    public businessCategories: Array = [];
    public additionalPhoneNumbers: Array = [];
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


    consructor() {
        //TOOD initialize default for geolocation.
    }
    public getVendastaId() {
        return this.vendastaId;
    }
    public save() {
        // TODO
    }
    public getListingById(vendastaId: string, client: Client) {}
    public delete() {}
    private toListingMessage() {}
    private fromListingMessage() {}

}
