FROM node

WORKDIR /app/client

COPY package.json .
RUN npm install

COPY . .

RUN npm run build
