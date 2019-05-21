const pino = require('pino')
const pkg = require('./package')

const logger = pino({
  name: `${pkg.name}-logger`,
})

module.exports = logger
