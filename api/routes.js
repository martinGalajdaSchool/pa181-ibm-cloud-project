const Router = require('koa-router')
const compose = require('koa-compose')
const Joi = require('@hapi/joi')
const errors = require('./errors')
const config = require('./config')

const textToSpeechService = require('./text-to-speech-service')

const router = new Router()

// Root
router.get('/', ctx => {
  ctx.body = {
    message: 'Hello from API for SSME app!'
  }
  ctx.status = 200
})

router.get('/synthesize', compose([
  async (ctx, next) => {
    const querySchema = Joi.object().keys({
      text: Joi
        .string()
        .min(3)
        .max(config.services.textToSpeech.maxCharsToSynthesize)
        .required(),
    })
    
    const validationResult = Joi.validate(ctx.query, querySchema)

    if (validationResult.error) {
      throw new errors.ValidationError()
    }

    await next()
  },
  async ctx => {
    const text = ctx.query.text

    ctx.body = await textToSpeechService.synthesize(text)

    ctx.set('Content-Type', 'audio/wav')
    ctx.status = 200
  }
]))

const routes = router.routes()
module.exports = routes
