import Router, {RouterContext} from "koa-router"
import bodyParser from "koa-bodyparser"

//load local file
import * as model from '../models/login'

//create router path
const router = new Router({prefix: '/api/v1/login'})

const login = async(ctx: RouterContext) => {
  const body = ctx.request.body
  const result = await model.login(body)
  if (result.status == 201) {
    ctx.body = {message: 'Login Success'}
  } else {
    ctx.body = {message: 'Login Failed'}
  }
}

router.get('/',bodyParser(),login)

export { router }