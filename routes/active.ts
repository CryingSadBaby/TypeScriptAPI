import Router, {RouterContext} from "koa-router"
import bodyParser from "koa-bodyparser"

//load local file
import * as model from '../models/active'

//create router path
const router = new Router({prefix: '/api/v1/active'})

const active = async(ctx: RouterContext) => {
  const body = ctx.request.body
  const result = await model.active(body)
  if (result.status == 201) {
    ctx.body = {err: "Your account has be grant staff privilege"}
  } else if (result.status == 101) {
    ctx.body = {err: "Wrong staff code"}
  } else {
    ctx.body = {err: "Unknown error"}
  }
}

router.post('/',bodyParser(),active)

export { router }