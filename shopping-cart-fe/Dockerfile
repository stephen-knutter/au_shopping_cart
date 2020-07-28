FROM node:10.13.0

WORKDIR /usr/src/app

ENV PATH /usr/src/app/node_modules/.bin:$PATH

ADD package.json /usr/src/app

RUN npm install

CMD ["npm", "start"]