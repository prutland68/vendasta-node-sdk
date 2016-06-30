/// <reference path="../../typings/index.d.ts" />
/// <reference path="./datariver.d.ts" />

const grpc = require("grpc");

export const datariverProto = grpc.load({
    root: __dirname,
    file: "datariver.proto"
});

export interface Listing extends datariver.Listing {}
export interface Geo extends datariver.Geo {}
export const Listing: Listing = datariverProto.datariver.Listing;
export const Geo: Geo = datariverProto.datariver.Geo;


