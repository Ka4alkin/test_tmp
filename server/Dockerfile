FROM node:16

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

ENV JWT_SECRET jaksdbksal
ENV PORT 3001

EXPOSE $PORT

CMD [ "node", "index.js" ]
