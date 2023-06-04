import Router, { RouterContext } from 'koa-router'

//import local file
import { basicAuth } from '../controllers/auth'

const router = new Router({prefix: '/api/v1'})

router.get('/', async(ctx: RouterContext) => {
  ctx.body = {
    message: 'Public API return'
  }
})

router.get("/private", basicAuth, privateAPI)

function privateAPI(ctx: RouterContext) {
  const user = ctx.state.user
  ctx.body = {message: `Hello ${user.user.username} you registered on ${user.user.dateregistered}`}
}

export { router }