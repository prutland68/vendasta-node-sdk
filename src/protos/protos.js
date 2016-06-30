/// <reference path="../../typings/index.d.ts" />
/// <reference path="./datariver.d.ts" />
"use strict";
var grpc = require("grpc");
exports.datariverProto = grpc.load({
    root: __dirname,
    file: "datariver.proto"
});
exports.Listing = exports.datariverProto.datariver.Listing;
exports.Geo = exports.datariverProto.datariver.Geo;
//# sourceMappingURL=protos.js.map