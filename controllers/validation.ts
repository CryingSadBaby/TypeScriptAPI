import { Validator, ValidationError } from 'jsonschema'
import { RouterContext } from 'koa-router'
import { article } from '../schemas/article.schema'
const v = new Validator()

export async function validateArticle(ctx) {
  const validationOptions = {
    throwError: true,
    allowUnknownAttributes: false
  }
  const body = ctx.request.body
  try{
    v.validate(body, article, validationOptions)
  } catch(error) {
    if(error instanceof ValidationError){
      ctx.body = error
      ctx.status = 400
    } else {
      throw error
    }
  }
}