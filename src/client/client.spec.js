"use strict";
var _this = this;
/// <reference path="../protos/datariver.d.ts" />
var client_1 = require("./client");
var client_2 = require("./client");
var index_1 = require('../index');
var mockedDatariverService = (function () {
    function mockedDatariverService() {
        this.getListing = function (listingId, callback) {
            callback(null, {});
        };
    }
    return mockedDatariverService;
}());
describe('Client tests', function () {
    beforeEach(function () {
        _this.client = new client_1.Client(client_2.Environment.TEST, "fake-token");
    });
    describe("getListing tests", function () {
        it('Should call my callback method with the returned listing.', function () {
            var fakeListing = new index_1.Listing();
            // datariver.getListing = jasmine.createSpy("getListing() spy").andCallFake((listingId: string, callback: any) => {callback(undefined, fakeListing)});
            spyOn(_this.client, 'getDatariverService').andReturn(new mockedDatariverService());
            var objectwhatever = {
                callback: jasmine.createSpy('callback spy')
            };
            _this.client.getListing("fake listing id", objectwhatever.callback);
            expect(objectwhatever.callback.wasCalled).toBeTruthy();
        });
    });
});
//# sourceMappingURL=client.spec.js.map