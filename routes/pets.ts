//Library
import Router, { RouterContext } from 'koa-router'
import bodyParser from 'koa-body'

//Local
import * as pets from './models/pets.model'
import {prefixlist} from './prefix/prefixlist'
import auth from './controllers/auth'

//Create routes
const router = new Router({prefix:prefixlist.pets})

//Get all cats
const all = async(ctx: RouterContext) => {
  const result = await pets.all()
  if(result.length){
    ctx.body=result
  }
}

//Get cat by id
const byid = async(ctx: RouterContext) => {
  const id = ctx.params.id
  const result = await pets.byid(id)
  if(result.length){
    ctx.body=result[0]
  }
}

//Post a cat information
const add = async(ctx: RouterContext) => {
  const data = ctx.request.body
  const result = await pets.add(data)
  if(result){
    ctx.status=201
    ctx.body=result
  }
}

//Update cat information
const update = async(ctx: RouterContext) => {
  const data = ctx.request.body
  const id = ctx.params.id
  const result = await pets.update(data,id)
  if(result){
    ctx.status = 201
    ctx.body = `Pets with id: ${id} updated`
  }
}

//Delete cat from database
const del = async(ctx: RouterContex) => {
  const id = ctx.params.id
  const result = await pets.del(id)
  if(result){
    ctx.status = 202
    ctx.body = {message: `Pets with id: ${id} removed`}
  }
}

//Routes
router.get('/',all)
router.get('/:id([0-9]{1,})',byid)
router.post('/',bodyParser(),auth,add)
router.put('/:id([0-9]{1,})',bodyParser(),auth,update)
router.del('/:id([0-9]{1,})',auth,del)

export {router}