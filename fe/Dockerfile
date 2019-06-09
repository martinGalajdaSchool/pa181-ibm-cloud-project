FROM node:10-alpine

WORKDIR /app

COPY . /app

RUN apk --update add gcc g++ python \
    && yarn  install \
    && apk del gcc g++ python \
    && rm -rf /tmp/* /var/cache/apk/* /root/.npm /root/.npmrc /root/.node-gyp

# Switch to non-root user
USER node

CMD export PORT=8000 && ./node_modules/.bin/react-scripts start
