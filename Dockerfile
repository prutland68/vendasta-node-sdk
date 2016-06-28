FROM node:6
RUN npm install -g typescript
RUN npm install -g typings
RUN npm install -g jsdoc
RUN npm install -g tsdoc
COPY package.json /src/package.json
RUN cd /src && npm install
WORKDIR /src
CMD tsc -w