# viio

## Back:

# Instalation

1. Clone the repository and navigate to the back folder

```bash
$ cd .\back\
```

2. Create a `.env` file with the same variables from `.env.example` file

3. Set up the database with docker

```bash
$ docker-compose up -d
```

4. Install the backend dependencies

```bash
$ npm install
```

5. run the nest js project:

```bash
$ npm run start:dev
```

# Docs

one you start the project go to /api and you will see the swagger documentation

# E2E testing

Run the following command, the first time will be success as we are creating a real record in the db

```bash
$ npm run test:e2e
```

## Front

1. Navigate to the front folder

```bash
$ cd .\front\
```

2. Install the frontEnd dependencies

```bash
$ npm install
```
