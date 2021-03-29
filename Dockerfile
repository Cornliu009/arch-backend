FROM node:14.16.0-alpine
ENV NODE_ENV=prod
WORKDIR /arch-backend
COPY /package.json /arch-backend
COPY /package-lock.json /arch-backend
EXPOSE 8000
RUN npm install --production
RUN npm install dotenv -save
COPY . /arch-backend
CMD [ "node", "src/index.js" ]
