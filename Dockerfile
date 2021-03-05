FROM node:14.16.0

ENV NODE_ENV production

WORKDIR /usr/src/app

COPY package.json /usr/src/app/
RUN npm install

COPY . /usr/src/app
