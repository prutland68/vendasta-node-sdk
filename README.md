# Node.js Vendasta SDK

## Installation ##
```
npm install vendasta-sdk
```

## 

## Development ##

A docker container and a build script is provided to run any Node/NPM related commands without needing to have Node installed on your computer.

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
By default, the build script will run `tsc -w`.