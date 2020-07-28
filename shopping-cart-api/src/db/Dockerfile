FROM mongo:latest

COPY products.json /products.json

CMD mongoimport --host cart_db --port 27017 --db cart --collection products --drop --file /products.json --jsonArray