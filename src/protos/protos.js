"use strict";
/// <reference path="../../typings/index.d.ts" />
var grpc = require("grpc");
exports.datariverProto = grpc.load({
    root: __dirname,
    file: "datariver.proto"
});
//# sourceMappingURL=protos.js.map