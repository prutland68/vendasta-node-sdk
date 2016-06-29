/// <reference path="./protos/datariver.d.ts" />
import {Client} from "./client";
import {Environment} from "./client";
import {datariverProto} from './protos/protos'
import {Listing} from './index';
var datariver = datariverProto.datariver.DataRiver;
describe('Client tests', () => {
  beforeEach(() => {
    this.client = new Client(Environment.TEST, "fake-token");
  });
  describe("getListing tests", () => {
    it('Should call my callback method with the returned listing.', () => {
      let fakeListing: datariver.Listing = new datariver.Listing();
      datariver.getListing = jasmine.createSpy("getListing() spy").andReturn(fakeListing);
      this.client.getListing("fake listing id", () => {
        console.log("I was called");
      })
    });
  });
});
