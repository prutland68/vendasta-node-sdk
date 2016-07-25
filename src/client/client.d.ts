export declare enum Environment {
    TEST = 1,
    PRODUCTION = 2,
}
export declare class Client {
    private environment;
    private token;
    private metaData;
    private datariverService;
    private address;
    constructor(environment: Environment, token: string, service?: any);
    private getDatariverService;
    getListing: (listingId: string, callback: any) => any;
    deleteListing: (listingId: string, callback: any) => any;
    putListing: (listing: any, callback: any) => any;
}
