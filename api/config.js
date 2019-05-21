const env = process.env.NODE_ENV || 'local'
const pkg = require('./package')

const config = {
  env,
  appName: 'ssme-app-api',
  version: pkg.version,
  server: {
    port: process.env.PORT || 3000,
    maxMemory: 512,
    killTimeout: 3000,
    bodyParser: {
      multipart: true,
    },
    cors: {
      origin: '*',
      exposeHeaders: [
        'Authorization',
        'Content-Language',
        'Content-Length',
        'Content-Type',
        'Date',
        'ETag',
      ],
      maxAge: 3600,
    },
  },
}



module.exports = config
