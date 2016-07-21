#!/usr/bin/env bash

set -e
docker build -t node-partner-sdk .
docker run -it --rm -v ${PWD}:/src node-partner-sdk "$@"