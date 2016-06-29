/// <reference path="./protos/datariver.d.ts" />
import {Client, Environment} from "./client/client";
import {datariverProto} from './protos/protos'

export {Client};
export {Environment};
export const Listing: () => datariver.Listing = datariverProto.datariver.Listing;
export const Geo: () => datariver.Geo = datariverProto.datariver.Geo;
