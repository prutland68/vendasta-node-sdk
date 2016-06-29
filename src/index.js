"use strict";
/// <reference path="./protos/datariver.d.ts" />
var client_1 = require("./client");
exports.Client = client_1.Client;
exports.Environment = client_1.Environment;
var protos_1 = require('./protos/protos');
exports.Listing = protos_1.datariverProto.datariver.DataRiver.Listing.constructor;
exports.Geo = protos_1.datariverProto.datariver.Geo.constructor;
//# sourceMappingURL=index.js.map