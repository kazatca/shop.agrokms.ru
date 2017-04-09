#!/bin/bash
set -e
pushd client
make prod
popd
pushd server
make build
sequelize db:migrate --url $DB_URL #dont work with query string
popd