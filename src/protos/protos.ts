/// <reference path="../../typings/index.d.ts" />
const grpc = require("grpc");

export const datariverProto = grpc.load({
    root: __dirname,
    file: "datariver.proto"
});
