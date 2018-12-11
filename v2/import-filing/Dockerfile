# start from base
FROM ubuntu:latest
MAINTAINER Dhruv Mehrotra <dhruv@riseup.net>

# install system-wide deps for python and node
RUN apt-get -yqq update
RUN curl -sL https://deb.nodesource.com/setup_8.x | bash
RUN apt-get install -yq nodejs
RUN apt-get install -yq npm
RUN apt-get install -yq postgresql-client
# copy our application code
ADD api /etc/dod-api
WORKDIR /etc/dod-api

# fetch app specific deps
RUN npm install
RUN npm install sequelize-cli


# expose port
EXPOSE 8000

# start app
#CMD [ "node", "bin/www" ]
