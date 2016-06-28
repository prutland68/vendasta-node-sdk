"use strict";
/// <reference path="../typings/index.d.ts" />
var index_1 = require("../src/index");
var client = new index_1.Client(index_1.Environment.TEST, '8d535a7c8301cd87957013b7210f4c03');
client.getListing('junk', callback);
function callback(error, response) {
    console.log(error);
    console.log(response);
}
//# sourceMappingURL=example.js.map