FROM node:10.10.0

RUN mkdir -p /usr/src/simpleapp

# Create app directory
WORKDIR /usr/src/simpleapp

# Install app dependencies
COPY package.json ./

# RUN npm install
RUN npm install

# Bundle app source
COPY . .

EXPOSE 8080

CMD [ "npm", "start" ]

