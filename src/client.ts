/// <reference path="../typings/index.d.ts" />
const grpc = require("grpc");

const datariverProto = grpc.load({
    root: __dirname,
    file: "datariver.proto"
});

const DatariverService = datariverProto.datariver.DataRiver;

export const Listing = datariverProto.datariver.Listing;

export enum Environment{
    TEST = 1,
    PRODUCTION = 2
}

export class Client {
    private metaData = new grpc.Metadata();
    private datariverService: any;
    private address: string;

    constructor(private environment: Environment, private token: string) {
        if (environment == Environment.PRODUCTION) {
            throw new Error("Production not available yet.");
        }
        else {
            this.address = "directory-sandbox.vendasta.com:23000";  // assume test
        }
        this.metaData.add('token', token);
        const creds = grpc.credentials.createSsl();

        const callCreds = grpc.credentials.createFromMetadataGenerator(
            (serviceUrl: string, callback: any) => {
                callback(null, this.metaData)
            }
        );
        const combinedCreds = grpc.credentials.combineChannelCredentials(creds, callCreds);

        this.datariverService = new DatariverService(this.address, combinedCreds);
    }

    public getListing = (listingId: string, callback: any) => {
        return this.datariverService.getListing(listingId, callback);
    };
    public deleteListing = (listingId: string, callback: any) => {
        return this.datariverService.deleteListing(listingId, callback);
    };
    // TODO: Change the listing to actually be the correct type instead of any.
    public putListing = (listing: any, callback: any) => {
        return this.datariverService.putListing(listing, callback);
    };
}
