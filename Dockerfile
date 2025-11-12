FROM node:18-alpine as builder

WORKDIR /app
COPY ["./yarn.lock", "./package.json", "./decorate-angular-cli.js", "./"]
RUN yarn install --frozen-lockfile --ignore-engines && \
    npx browserslist@latest --update-db
COPY . ./
RUN yarn ng run frontend:build:production && \
    yarn ng run frontend:server:production

FROM registry.access.redhat.com/ubi9/nodejs-18
WORKDIR /app
# RUN mkdir -p ./dist/frontend/ ./apps/frontend/dist/
COPY --from=builder ["/app/dist/frontend/server/", "./dist/frontend/server/"]
COPY --from=builder ["/app/apps/frontend/dist/", "./apps/frontend/dist/"]
COPY --from=builder ["/app/node_modules", "./node_modules/"]

EXPOSE 4000
CMD [ "node", "dist/frontend/server/main.js" ]
