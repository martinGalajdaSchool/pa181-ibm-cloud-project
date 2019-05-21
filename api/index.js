const Koa = require('koa')
const koaBody = require('koa-body')
const koaCompress = require('koa-compress')
const koaCors = require('kcors')

const config = require('./config')
const log = require('./logger')
const routes = require('./routes')

const middleware = require('./middleware')

const app = new Koa()

// Setup middleware
app.use(koaCompress())
app.use(koaBody(config.server.bodyParser))
app.use(koaCors(config.server.cors))

app.use(middleware.errorMiddleware)

app.use(routes)

app.start = () => {
  log.info('Bootstrapping API')
  app.server = app.listen(config.server.port, () => {
    log.info(`==> ✈️  Server listening on port ${config.server.port}.`)
  })
}

app.stop = () => {
  if (!app.server) {
    log.warn('Server is not initialized yet.')
    return
  }

  log.info('Stopping server ...')
  app.server.close(() => {
    log.info('Server stopped.')
  })
}

app.on('error', err => log.error(err, 'Unhandled application error.'))

process.once('uncaughtException', fatal)
process.once('unhandledRejection', fatal)

function fatal(err) {
  log.fatal(err, 'Fatal error occurred. Exiting the app.')

  setTimeout(() => {
    throw err
  }, 5000).unref()
}

app.start()

process.once('SIGINT', () => app.stop())
process.once('SIGTERM', () => app.stop())

module.exports = app
