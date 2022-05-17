FROM node:16.15.0-slim AS setup
ENV TZ=Asia/Bangkok
WORKDIR /usr/src/app
COPY ./package*.json ./

FROM setup AS build
ENV SHARP_IGNORE_GLOBAL_LIBVIPS=1
RUN npm ci
COPY ./tsconfig*.json ./
COPY ./src/ ./src/
RUN apt-get update && \
    apt-get install -yqq cpio
RUN npm run build

FROM setup
ENV NODE_ENV=production
RUN npm ci
COPY --from=build /usr/src/app/dist ./dist
EXPOSE 4000
CMD npm run start:prod
