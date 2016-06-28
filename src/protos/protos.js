"use strict";
/// <reference path="../../typings/index.d.ts" />
exports.grpc = require("grpc");
exports.datariverProto = exports.grpc.load({
    root: __dirname,
    file: "datariver.proto"
});
//# sourceMappingURL=protos.js.map