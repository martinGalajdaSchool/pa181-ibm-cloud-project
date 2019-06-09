const TextToSpeechV1 = require('ibm-watson/text-to-speech/v1')
const config = require('./config')

const textToSpeechClient = new TextToSpeechV1({
  iam_apikey: config.services.textToSpeech.apiKey,
  url: config.services.textToSpeech.apiUrl,
})

const synthesize = async text => {
  const audioStream = await textToSpeechClient.synthesize({
    text,
    accept: 'audio/wav',
    voice: 'en-US_AllisonVoice',
  })

  return audioStream
}

module.exports = {
  synthesize,
}
