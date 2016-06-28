pbjs ./src/protos/datariver.proto > ./src/protos/datariver.json
proto2typescript --camelCaseGetSet false --file ./src/protos/datariver.json > ./src/protos/datariver.d.ts
