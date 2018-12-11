#!/bin/bash


# Wait for Postgres to become available.
until psql -h db -U "postgres" -c '\q' 2>/dev/null; do
  >&2 echo "Postgres is unavailable - sleeping"
  sleep 1
done

echo "Postgres is available: continuing with database setup..."

psql -h db -v ON_ERROR_STOP=1 --username "postgres" <<-EOSQL
  CREATE USER docker;
  CREATE DATABASE dod;
  GRANT ALL PRIVILEGES ON DATABASE dod TO docker;
EOSQL
