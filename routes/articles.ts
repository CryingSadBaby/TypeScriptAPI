import Router, {RouterContext} from "koa-router"
import bodyParser from "koa-bodyparser"

//load local file
import * as model from '../models/articles'
import {validateArticle} from '../controllers/validation'
import { basicAuth } from '../controllers/auth'

//create router path
const router = new Router({prefix: '/api/v1/articles'})

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

const deleteArticle = async (ctx: RouterContext) => {
  const id = ctx.params.id
  const article = await model.deleteById(id)
  ctx.status = 201
  ctx.body = `Article with id: ${id} deleted`
}

const createArticle = async (ctx: RouterContext) => {
  const body = ctx.request.body
  const result = await model.createArticle(body)
  if(result.length) {
    ctx.status = 201
    ctx.body = result
  } else {
    ctx.status= 201
    ctx.body = '{}'
  }
}

const updateArticle = async (ctx: RouterContext) => {
  const id = +ctx.params.id
  const body = ctx.request.body
  const result = await model.updateArticle(body,id)
  if(result){
    ctx.status = 201
    ctx.body = `Article with id: ${id} updated`
  }
}

router.get('/', getAll)
router.get('/:id([0-9]{1,})', getById)
router.del('/:id([0-9]{1,})', basicAuth, deleteArticle)
router.post('/', bodyParser(), validateArticle, createArticle)
router.put('/:id([0-9]{1,})', basicAuth, bodyParser(), updateArticle)

export { router }