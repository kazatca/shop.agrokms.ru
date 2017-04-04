#!/bin/bash
set -e
pushd client
make prod
popd
pushd server
make build
popd