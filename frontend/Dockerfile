FROM node:16

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

RUN apt-get update && apt-get install -y netcat-traditional

CMD ["sh", "-c", "while ! nc -z backend 3001; do sleep 1; done; npm start"]