FROM node:6


RUN npm install -g typescript
RUN npm install -g typings
RUN npm install -g jsdoc
RUN npm install -g protobufjs
RUN npm install -g proto2typescript
COPY package.json /src/package.json
RUN cd /src && npm install


RUN apt-get update && \
    apt-get install -y \
        wget \
        unzip
WORKDIR /usr/local
ENV PATH $PATH:/usr/local/protoc/bin
RUN wget https://github.com/google/protobuf/releases/download/v3.0.0-beta-4/protoc-3.0.0-beta-4-linux-x86_64.zip && \
    unzip protoc-3.0.0-beta-4-linux-x86_64.zip -d protoc && \
    rm protoc-3.0.0-beta-4-linux-x86_64.zip

WORKDIR /src
CMD tsc -w
