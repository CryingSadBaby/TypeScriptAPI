import * as model from '../models/users'
import Router from 'koa-router'
import bodyParser from 'koa-bodyparser'
import auth from '../controllers/auth'

const prefix = '/api/v1/users'
const router = Router({prefix: prefix})



async function getAll(ctx,next){
  const result = await model.getAll(20,1)
  if(result.length){
    ctx.body = result
  }
}

async function getById(ctx){
  const id = ctx.params.id
  const result = await model.getByUserId(id)
  if(result.length){
    ctx.body = result[0]
  }
}

async function createUser(ctx){
  const body = ctx.request.body
  const result = await model.add(body)
  if(result){
    ctx.status = 201
    ctx.body = result
  }
}

async function login(ctx){
  const {id, username, email, avatarurl, role} = ctx.state.user
  const links = {
    self: `https://${ctx.host}${prefix}/${id}`
  }
  ctx.body = {id, username, email, avatarurl, role, links}
}

router.get('/', getAll)
router.get('/:id([0-9]{1,})', getById)
router.post('/', bodyParser(), createUser)
router.post('/login', auth, login)

export {router}