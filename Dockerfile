FROM node:16.15.0-slim AS setup
ENV TZ=Asia/Bangkok
WORKDIR /usr/src/app
COPY ./package*.json ./

FROM setup AS build
ENV SHARP_IGNORE_GLOBAL_LIBVIPS=1
RUN npm ci
COPY ./tsconfig*.json ./
COPY ./src/ ./src/
COPY ./firebase.json ./firebase.json
RUN apt-get update && \
    apt-get install -yqq cpio
RUN npm run build

FROM setup
ENV NODE_ENV=production
RUN npm ci
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/firebase.json ./firebase.json
EXPOSE 4000
CMD npm run start:prod
