#!/usr/bin/env bash

pbjs -p /usr/local/protoc/include ./src/protos/listing.proto > ./src/protos/listing.json
proto2typescript --camelCaseGetSet false --file ./src/protos/listing.json > ./src/protos/listing.d.ts

pbjs -p /usr/local/protoc/include ./src/protos/review.proto > ./src/protos/review.json
proto2typescript --camelCaseGetSet false --file ./src/protos/review.json > ./src/protos/review.d.ts
