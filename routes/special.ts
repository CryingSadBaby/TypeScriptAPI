import Router from 'koa-router'
import bodyParser from 'koa-bodyparser'
import auth from '../controllers/auth'

const router = Router({prefix: '/api/v1'})

function publicAPI(ctx) {
  ctx.body = {message: 'PUBLIC PAGE: You requested a new message URI (root) of the API'}
}

function privateAPI(ctx){
  const user = ctx.state.user
  ctx.body = {message: `Hello ${user.username} you registered on ${user.dateregistered}`}
}

router.get('/',publicAPI)
router.get('/private',auth,privateAPI)

export {router}