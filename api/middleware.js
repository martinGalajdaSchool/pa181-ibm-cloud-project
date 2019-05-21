const uuid = require('uuid')
const log = require('./logger')
const config = require('./config')
const errors = require('./errors')

module.exports = {

  async errorMiddleware(ctx, middleware) {
    try {
      await middleware()
    } catch (err) {

      // Known error, we threw it
      if (err instanceof errors.ApiError) {
        return void processKnownError(ctx, err)
      }

      // Unknown error
      processUnknownError(ctx, err)
    }
  },
}

function processKnownError(ctx, err) {
  ctx.status = err.status || 500
  ctx.body = {
    type: err.type,
    message: err.message,
  }
}

function processUnknownError(ctx, err) {

  err.incidentId = uuid.v1()
  log.error(err, 'Unhandled error')

  ctx.status = 500

  // Do not log error details in production
  if (config.env === 'production') {
    ctx.body = {
      incidentId: err.incidentId,
      message: 'Unknown error occurred.',
    }
    return
  }

  ctx.body = {
    message: err.message,
    stack: err.stack,
  }
}
