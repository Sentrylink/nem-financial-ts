FROM node:12.14.0-alpine

ENV ENV_NAME dev
ENV NODE_ENV dev
ENV NODE_CONFIG_ENV dev

RUN apk --update add tzdata && cp /usr/share/zoneinfo/America/Vancouver /etc/localtime && echo "America/Vancouver" > /etc/timezone && apk del tzdata

WORKDIR /usr/src/app
COPY package.json .

RUN npm install
ADD . /usr/src/app

RUN npm run build
CMD [ "npm", "start" ]
