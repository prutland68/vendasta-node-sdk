#!/usr/bin/env bash

pbjs ./src/protos/directory.proto > ./src/protos/directory.json
proto2typescript --camelCaseGetSet false --file ./src/protos/directory.json > ./src/protos/directory.d.ts

pbjs ./src/protos/listing.proto > ./src/protos/listing.json
proto2typescript --camelCaseGetSet false --file ./src/protos/listing.json > ./src/protos/listing.d.ts

pbjs ./src/protos/review.proto > ./src/protos/review.json
proto2typescript --camelCaseGetSet false --file ./src/protos/review.json > ./src/protos/review.d.ts
