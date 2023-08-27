FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY src .

ENV JWT_SECRET jaksdbksal
ENV PORT 8050
ENV HOST 0.0.0.0

EXPOSE $PORT

CMD [ "node", "index.js" ]
