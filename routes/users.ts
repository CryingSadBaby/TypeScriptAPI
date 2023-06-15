//Library
import Router, { RouterContext } from 'koa-router'
import bodyParser from 'koa-body'
import auth from './controllers/auth'

//Local
import * as users from './models/users.model'
import {prefixlist} from './prefix/prefixlist'

//Create routes
const router = new Router({prefix:prefixlist.users})

//Get all users
const all = async(ctx: RouterContext) => {
  const result = await users.all()
  if(result.length){
    ctx.body=result
  }
}

//Get user by id
const byid = async(ctx: RouterContext) => {
  const id = ctx.params.id
  const result = await users.byid(id)
  if(result.length){
    ctx.body=result
  }
}
//Register a user
const register = async(ctx: RouterContext) => {
  const data = ctx.request.body
  const result = await users.register(data)
  if(result){
    ctx.status = 201
    ctx.body = result
  }
}
//Login as user
const login = async(ctx: RouterContext) => {
  const {id, username, email, avatarurl, role} = ctx.state.user
  const links = {
    self: `https://${ctx.host}${prefixlist.users}/${id}`
  }
  ctx.body = {id,username,email,avatarurl,role,links}
}
//Update user information
const update = async(ctx: RouterContext) => {
  const data = ctx.request.body
  const id = ctx.params.id
  const result = await users.update(data,id)
  if(result){
    ctx.status = 201
    ctx.body = `Users with id: ${id} updated`
  }
}
//Get user role
const getRole = async(ctx: RouterContext) => {
  const data = ctx.request.body
  const id = ctx.params.id
  const result = await users.getURole(data,id)
  if(result){
    ctx.status = 201
    ctx.body = `Users with id: ${id} is role: ${result.role}`
  }
}

//Routes
router.get('/',auth,all)
router.get('/:id([0-9]{1,})',auth,byid)
router.post('/',bodyParser(),register)
router.put('/:id([0-9]{1,})',bodyParser(),auth,update)
router.post('/login',auth,login)
router.get('/:id([0-9]{1,})/role',bodyParser(),auth,getRole)

export {router}