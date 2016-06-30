/// <reference path="../../typings/index.d.ts" />
/// <reference path="./datariver.d.ts" />
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var grpc = require("grpc");
exports.datariverProto = grpc.load({
    root: __dirname,
    file: "datariver.proto"
});
/** This is gross, but bare with me.
 * datariverProto is auto-generated. This means the typescript compiler is unable to recognize datariver.Listing as
 * a class. Writing the export this way suppresses warnings that users of this sdk may experience when instantiating
 * a Listing object.
 */
var Listing = (function (_super) {
    __extends(Listing, _super);
    function Listing() {
        _super.call(this);
    }
    return Listing;
}(exports.datariverProto.datariver.Listing));
exports.Listing = Listing;
var Geo = (function (_super) {
    __extends(Geo, _super);
    function Geo() {
        _super.call(this);
    }
    return Geo;
}(exports.datariverProto.datariver.Geo));
exports.Geo = Geo;
//# sourceMappingURL=protos.js.map