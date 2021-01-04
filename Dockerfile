FROM node:lts-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

EXPOSE 443

CMD [ "npm", "run", "start" ]