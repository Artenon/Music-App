FROM node

WORKDIR /app

COPY package.json .
RUN npm install

COPY . .

COPY client/package.json ./client
RUN npm run client:install
RUN npm run client:build

COPY ./client ./client

CMD [ "npm", "start" ]