FROM node:10-alpine

WORKDIR /app

COPY . /app

RUN apk --update add gcc g++ python \
    && npm install --production \
    && apk del gcc g++ python \
    && rm -rf /tmp/* /var/cache/apk/* /root/.npm /root/.npmrc /root/.node-gyp

# Switch to non-root user
USER node

CMD node ./index.js
