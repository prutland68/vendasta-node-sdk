/// <reference path="./directory.d.ts" />

const grpc = require("grpc");

export const datariverProto = grpc.load({
    root: __dirname,
    file: "directory.proto"
});


export interface Listing extends datariver.Listing {
    constructor:{ new():Listing };
}
export interface Geo extends datariver.Geo {
    constructor:{ new():Geo };
}


export const Listing = datariverProto.datariver.Listing;
export const Geo = datariverProto.datariver.Geo;


