const Router = require('koa-router')

const router = new Router()

// Root
router.get('/', ctx => {
  ctx.body = {
    message: 'Hello from API for SSME app!'
  }
  ctx.status = 200
})

const routes = router.routes()
module.exports = routes
