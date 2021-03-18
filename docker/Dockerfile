FROM node:10.12.0-alpine
RUN chmod +x /wait
WORKDIR /home/nodejs/app
ENV NODE_ENV prod
COPY package*.json ./
RUN npm install --only=production
ARG port=8000
EXPOSE $port
COPY . ./
CMD /wait && node server.js