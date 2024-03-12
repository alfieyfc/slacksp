FROM node:20-alpine3.19

WORKDIR /app
COPY . /app

RUN npm i

CMD node index.js
