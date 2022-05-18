# KUTask-Backend

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Require

### File

- firebase.json (Firebase Certificate)

### Enviorment Variables

```bash
COOKIE_SECRET=<your-cookie-secret>
MONGO_URI=<your-mongo-uri>
```

## Run via Docker Compose

### Run docker compose

```
docker compose -f docker-compose.dev.yml up -d
```

### Stop docker compose & Delete container

```
docker compose -f docker-compose.dev.yml down
```

### Stop docker compose & remove local image

```
docker compose -f docker-compose.dev.yml down --rmi local
```

## Swagger

```
http://localhost:4000/api
```
