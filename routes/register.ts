import Router, {RouterContext} from "koa-router"
import bodyParser from "koa-bodyparser"

//load local file
import * as model from '../models/register'

//create router path
const router = new Router({prefix: '/api/v1/register'})

const register = async(ctx: RouterContext) => {
  const body = ctx.request.body
  const result = await model.register(body)
  if (result.status == 501) {
    ctx.body = {err: "username and email already exist"}
  } else if (result.status == 502) {
    ctx.body = {err: "email already exist"}
  } else if (result.status == 503) {
    ctx.body = {err: "username already exist"}
  } else if (result.status == 201) {
    ctx.body = body
  }
}

router.post('/',bodyParser(),register)

export { router }