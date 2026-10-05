FROM node:20

WORKDIR /workspace/Gateway

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000