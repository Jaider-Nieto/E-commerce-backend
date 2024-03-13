FROM node:18-alpine3.16 AS base

ENV DIR=$DIR
WORKDIR $DIR


FROM base AS build

COPY package*.json $DIR

RUN npm ci

COPY tsconfig*.json $DIR
COPY src $DIR/src


RUN npm run build && npm prune --production


FROM base AS production
ENV USER node

COPY --from=build $DIR/node_modules $DIR/node_modules
COPY --from=build $DIR/dist $DIR/dist

ENV NODE_ENV=production
EXPOSE 3001

USER $USER

CMD [ "node", "dist/main.js" ]