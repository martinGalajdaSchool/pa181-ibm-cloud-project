const env = process.env.NODE_ENV || 'local'
const pkg = require('./package')
const fs = require('fs')

if (env === 'local') {
  require('dotenv').config()
}

const pathToSecretBinding = '/opt/service-bind/binding'
let textToSpeechConfig 

if (fs.existsSync(pathToSecretBinding)) {
  const secretForService = JSON.parse(fs.readFileSync(pathToSecretBinding, 'utf8'))

  textToSpeechConfig = {
    apiKey: secretForService.apikey,
    apiUrl: secretForService.url,
  }
} else {
  textToSpeechConfig = {
    apiKey: process.env.TEXT_TO_SPEECH_API_KEY,
    apiUrl: process.env.TEXT_TO_SPEECH_API_URL,
  }
}

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
  services: {
    textToSpeech: {
      ...textToSpeechConfig,
      maxCharsToSynthesize: process.env.MAX_CHARS_TO_SYNTHESIZE || 10,
    }
  },
}



module.exports = config
