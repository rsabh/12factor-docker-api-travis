FROM node:10.12.0-alpine
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait
RUN chmod +x /wait
# Create app directory
WORKDIR /home/nodejs/app
ENV NODE_ENV prod
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
RUN npm install --only=production
ARG port=80
EXPOSE $port
# Copy app source
COPY . ./
CMD /wait && npm start