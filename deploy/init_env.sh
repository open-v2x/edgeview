#! /bin/bash

FILE_PATH=/var/www/edgeview

# shellcheck disable=SC2010
for file_name in $(ls $FILE_PATH |grep "umi.*.js")
do
  file=${FILE_PATH}/${file_name}
  sed -i "s#APISERVER#${API_SERVER}#g" "$file"
done

# shellcheck disable=SC2010
for file_name in $(ls $FILE_PATH |grep "p__eventManagement__roadSideInformation__RSIDetails.*.js")
do
  file=${FILE_PATH}/${file_name}
  sed -i "s#AMAPKEY#${MAP_KEY}#g" "$file"
done

./docker-entrypoint.sh

nginx -g "daemon off;"
