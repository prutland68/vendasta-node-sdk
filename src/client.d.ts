/// <reference path="../typings/index.d.ts" />
export declare class Client {
    private address;
    private token;
    private metaData;
    private datariverService;
    constructor(address: string, token: string);
    getListing: (listingId: string, callback: any) => void;
}
