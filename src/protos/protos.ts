/// <reference path="../../typings/index.d.ts" />
/// <reference path="./datariver.d.ts" />

const grpc = require("grpc");

export const datariverProto = grpc.load({
    root: __dirname,
    file: "datariver.proto"
});


export interface Listing extends datariver.Listing {}
export interface Geo extends datariver.Geo {}

/** This is gross, but bare with me.
 * datariverProto is auto-generated. This means the typescript compiler is unable to recognize datariver.Listing as
 * a class. Writing the export this way suppresses warnings that users of this sdk may experience when instantiating
 * a Listing object.
 */
export class Listing extends datariverProto.datariver.Listing {constructor() {super();}}
export class Geo extends datariverProto.datariver.Geo {constructor() {super();}}


