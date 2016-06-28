/// <reference path="../typings/index.d.ts" />
const grpc = require("grpc");

const datariverProto = grpc.load({
    root: __dirname,
    file: "datariver.proto"
});

const DatariverService = datariverProto.datariver.DataRiver;

export class Client {
    private metaData = new grpc.Metadata();
    private datariverService: any;

    constructor(private address: string, private token: string) {
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
        this.datariverService.getListing(listingId, callback);
    };
}