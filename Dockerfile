FROM node:16

RUN apt-get update && apt-get install -y git

WORKDIR /app

COPY package.json yarn.lock .

RUN yarn install

COPY . .
CMD ["yarn", "dev"]
