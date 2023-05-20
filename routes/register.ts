import Router, {RouterContext} from "koa-router"
import bodyParser from "koa-bodyparser"

//load local file
import * as model from '../models/register'
import { basicAuth } from "../controllers/auth"

//create router path
const router = new Router({prefix: '/api/v1/register'})

const register = async(ctx: RouterContext) => {
  const body = ctx.request.body
  const result = await model.register(body)
  if (result.status == 201) {
    ctx.body = body
  } else {
    ctx.status = 500
    ctx.body = {err: "insert data failed"}
  }
}

router.post('/',bodyParser(),register)

export { router }