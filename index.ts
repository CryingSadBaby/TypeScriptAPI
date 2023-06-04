import Koa from 'koa'
import serve from 'koa-static'
import logger from 'koa-logger'
import json from 'koa-json'
import cors from 'koa-cors'
import passport from 'koa-passport'
import Router, {RouterContext} from 'koa-router'

//load routes
import { router as articles } from './routes/articles'
import { router as special } from './routes/special'

//create server
const app: Koa = new Koa()

//display welcome message function
const welcomeMessage = async(ctx: RouterContext) => {
  ctx.body = {message: 'Welcome to the TypeScript API!'}
}

const failedMessage = async( ctx: RouterContext) => {
  try {
    if(ctx.status === 404) {
      ctx.body = {err: 'Resource not found'}
    }
  } catch (err: err) {
    ctx.body = {err: err}
  }
}

//load function
app.use(logger())
app.use(json())

//OpenAPI file
app.use(serve('./docs'))

//setup website communicate
app.use(cors())
app.use(passport.initialize())

//Router routes
app.use(articles.routes())
app.use(special.routes())

//When status 404
app.use(failedMessage)

//Start Koa server
app.listen(10888)