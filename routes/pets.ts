import Router, {RouterContext} from "koa-router"
import bodyParser from "koa-bodyparser"

//load local file
import * as model from '../models/pets'
import { basicAuth } from "../controllers/auth"

//create router path
const router = new Router({prefix: '/api/v1/pets'})

const getAll = async (ctx: RouterContext) => {
  const articles = await model.getAll()
  if (articles.length) {
    ctx.body = articles
  } else {
    ctx.body = {}
  }
}

const getById = async (ctx: RouterContext) => {
  const id = ctx.params.id
  const article = await model.getById(id)
  if (article.length) {
    ctx.body = article[0]
  } else {
    ctx.status = 404
  }
}

router.get('/', getAll)

export { router }