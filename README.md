## INSTRUCTIONS

To run the application with docker installed

run `docker-compose up --build -d` to run in the background in detached mode

or run `docker-compose up --build` to display output in the terminal

After running the above docker compose command it will first spin up the database, once up, the database will be seeded with product data, once the database is ready, the api will start, once the api is started the front-end will start. Both the front-end and the api are running in development mode so any changes will hot reload.

## STACK

Front End - React App with TypeScript - http://localhost:3000

Back End - NestJS a TypeScript Node.js framework - http://localhost:8080

Database - Mongodb/Mongoose - mongodb://cart_db:27017/cart


