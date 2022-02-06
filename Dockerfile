FROM node:16-alpine as builder

WORKDIR /usr/src/app
COPY ["./yarn.lock", "./package.json", "./decorate-angular-cli.js", "./"]
RUN yarn install --frozen-lockfile && \
    npx browserslist@latest --update-db
COPY . ./
RUN yarn ng run frontend:build:production && \
    yarn ng run frontend:server:production && \
    rm -rf ./node_modules

FROM node:16-alpine
WORKDIR /app
# RUN mkdir -p ./dist/frontend/ ./apps/frontend/dist/
COPY --from=builder ["/usr/src/app/dist/frontend/server/", "./dist/frontend/server/"]
COPY --from=builder ["/usr/src/app/apps/frontend/dist/", "./apps/frontend/dist/"]

EXPOSE 4000
CMD [ "node", "dist/frontend/server/main.js" ]
