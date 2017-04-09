#!/bin/bash
set -e
pushd client
make prod
popd
pushd server
make build
#remove querystring because sequelize-cli incorrect parse db_url (qs attaching to db_name)
sequelize db:migrate --url=$(echo $DB_URL | cut -d '?' -f 1)
popd