import Router, {RouterContext} from "koa-router"
import bodyParser from "koa-bodyparser"

//load local file
import * as model from '../models/users'

//create router path
const router = new Router({prefix: '/api/v1/users'})

const findById = async (ctx: RouterContext) => {
  const id = ctx.params.id
  const user = await model.findById(id)
  if (user.length) {
    ctx.body = user[0]
  } else {
    ctx.status = 404
  }
}

router.get('/:id([0-9]{1,})', findById)

export { router }