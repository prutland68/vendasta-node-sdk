/// <reference path="./protos/datariver.d.ts" />
import {Client, Environment} from "./client";
import {datariverProto} from './protos/protos'

export {Client};
export {Environment};
export const Listing = datariverProto.datariver.DataRiver.Listing.constructor;
export const Geo = datariverProto.datariver.Geo.constructor;
