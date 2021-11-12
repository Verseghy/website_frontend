FROM node:14-alpine

WORKDIR /usr/src/app
COPY . .
RUN yarn install --frozen-lockfile
RUN yarn ng run frontend:build:production
RUN yarn ng run frontend:server:production

EXPOSE 4000
CMD [ "node", "dist/frontend/server/main.js" ]
