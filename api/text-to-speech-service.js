const TextToSpeechV1 = require('ibm-watson/text-to-speech/v1')
const config = require('./config')

// {
//   # secretBinding: {
//   # apikey: "18HsiPo9V83miqqUcr0auuXLbeN_HhF0yoPC1Vf1g5Ka",
//   # iam_apikey_description: "Auto-generated for key b59e26cc-ac5a-4562-9b61-e8315c3299f3",
//   # iam_apikey_name: "kube-eca744cd8ab940ac8c87c4c2470181ff.9ba7245e6f154f03b2d2c40928d563cb.ssme-app",
//   # iam_role_crn: "crn:v1:bluemix:public:iam::::serviceRole:Writer",
//   # iam_serviceid_crn: "crn:v1:bluemix:public:iam-identity::a/db8e17b941b54d0ebc7123aea759655d::serviceid:ServiceId-45c2bf62-65d4-4b16-b689-f00e04d15878",
//   # url: "https://stream-fra.watsonplatform.net/text-to-speech/api"
//   # }
//   # }
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
