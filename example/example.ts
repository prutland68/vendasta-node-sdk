/// <reference path="../typings/index.d.ts" />
import {Client, Environment} from "../src/index"

const client = new Client(Environment.TEST, '8d535a7c8301cd87957013b7210f4c03');
client.getListing('junk', callback);

function callback(error: any, response: any) {
    console.log(error);
    console.log(response);
}
