# Vendasta Node SDK

## Installation ##

```
npm install --save vendasta-sdk
```

## Useage ##

Until the documentation is complete, see the example folder on the repository.

The authentication mechanism is likely to change. You can use the static OAuth token from the example to hit the test environment for now. Production is not yet available.

## Development ##
*You must clone the repository to use these features*

A docker container and a build script is provided to run any Node/NPM related commands without needing to have Node installed on your computer.

By default, the build script will run the typescript compiler in watch mode: `tsc -w` (you must be running the docker for mac or docker for windows application for watch mode to work).

For example, to compile the typescript, run:
```
./build.sh tsc # Use the -w flag to have the typescript compiler incrementally compile changes
```
To install the node_modules folder locally, run:
```
./build.sh npm install
```
To install any extra [typings](https://github.com/typings/typings), run:
```
./build.sh typings # (any command typings supports)
```
To regenerate the documentation, run:
```
./build.sh jsdoc -c jsdoc_conf.json
```
To regenerate the proto objects files, run:
```
./build.sh bash build_proto_def.sh
```
