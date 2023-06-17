//Library
import Router, {RouterContext} from 'koa-router'

//Local
import * as fav from './models/fav.models'
import {prefixlist} from './prefix/prefixlist'
import auth from './controllers/auth'

//Create new router
const router = new Router({prefix:prefixlist.fav})

//Get Favorites pets
const all = async(ctx: RouterContext)=>{
  const uid = ctx.state.user.id
  const result = await fav.all(uid)
  if(result){
    ctx.status = 201
    ctx.body = result
  }else{
    ctx.status = 201
    ctx.body = []
  }
}

const add = async(ctx: RouterContext)=>{
  const uid = ctx.state.user.id
  const id = parseInt(ctx.params.id)
  const result = await fav.add(id, uid)
  ctx.body = result.affectedRows ? {message: "added"} : {message:"error"}
}

const remove = async(ctx: RouterContext)=>{
  const uid = ctx.state.user.id
  const id = parseInt(ctx.params.id)
  const result = await fav.del(id,uid)
  ctx.body = result
}

router.get('/',auth,all)
router.post('/:id([0-9]{1,})',auth,add)
router.del('/:id([0-9]{1,})',auth,remove)

export {router}