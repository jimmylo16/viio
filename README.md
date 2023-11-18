# viio

# Back:

## Instalation

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

## Docs

one you start the project go to /api and you will see the swagger documentation

## E2E testing

Run the following command, the first time will be success as we are creating a real record in the db

```bash
$ npm run test:e2e
```

## Dockerize Backend:

To run your project with docker,

1. in the back folder Run the following command:

```bash
$ docker build -t nestjs-app .
```

2. Test your img

```bash
$ docker run --rm -p 3000:3000 nestjs-app
```

# Front

1. Navigate to the front folder

```bash
$ cd .\front\
```

2. Install the frontEnd dependencies

```bash
$ npm install
```

5. run the vite react project:

```bash
$ npm run dev
```

## Testing

In the front end folder sRun the following command

```bash
$ npm run test
```

## Dockerize FrontEnd:

To run your project with docker,

1. in the back folder Run the following command:

```bash
$ docker build -t vite-app .
```

2. Test your img

```bash
$ docker run --rm -p 5173:5173 vite-app
```
