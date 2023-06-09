import {validateArticle} from '../controllers/validation'
import Router from 'koa-router'
import auth from '../controllers/auth'
import bodyParser from 'koa-bodyparser'
import * as model from '../models/articles'
import * as likes from '../models/likes'
import * as favs from '../models/favs'
import * as msgs from '../models/msgs'


const prefix = '/api/v1/articles'
const router = Router({prefix: prefix})

async function getAll(ctx){
  const {page=1,limit=100,order="dateCreated",direction="ASC"} = ctx.request.query
  const result = await model.getAll(page, limit, order, direction)
  if(result.length){
    const body = result.map(post => {
      const {id, title, imageurl, summary, authorid} = post
      const links = {
        likes: `https://${ctx.host}${prefix}/${post.id}/likes`,
        fav: `https://${ctx.host}${prefix}/${post.id}/fav`,
        msg: `https://${ctx.host}${prefix}/${post.id}/msg`,
        self: `https://${ctx.host}${prefix}/${post.id}`
      }
      return {id,title,imageurl,summary,authorid,links}
    })
    ctx.body=body
  }
}

async function getById(ctx){
  const id = ctx.params.id
  const result = await model.getById(id)
  if(result.length){
    ctx.body = result[0]
  }
}

async function createArticle(ctx) {
  const body = ctx.request.body
  const result = await model.add(body)
  if(result){
    ctx.status = 201
    ctx.body = result
  }
}

async function updateArticle(ctx){
  const body = ctx.request.body
  const id = ctx.params.id
  const result = await model.update(body,id)
  if(result){
    ctx.status = 201
    ctx.body = `Article with id ${id} updated`
  }
}

async function deleteArticle(ctx){
  const id = ctx.params.id
  const result = await model.deleteById(id)
  if(result){
    ctx.status = 201
    ctx.body = `Article with id ${id} deleted`
  }
}

async function likesCount(ctx){
  const id = ctx.params.id
  const result = await likes.count(id)
  ctx.body = result ? result : 0
}

async function likePost(ctx){
  const uid = ctx.state.user.id
  const id = parseInt(ctx.params.id)
  const result = await likes.like(id, uid)
  ctx.body = result.affectedRows ? {message: "liked"} : {message: "error"}
}

async function dislikePost(ctx){
  const uid = ctx.state.user.id
  const id = parseInt(ctx.params.id)
  const result = await likes.dislike(id,uid)
  ctx.body = result.affectedRows ? {message: "disliked"} : {message: "error"}
}

async function userFav(ctx) {
  const uid = ctx.state.user.id
  const result = await favs.listFav(uid)
  ctx.body = result ? result:0
}

async function postFav(ctx){
  const uid=ctx.state.user.id
  const id = parseInt(ctx.params.id)
  const result = await favs.addFav(id, uid)
  ctx.body = result.affectedRows ? {message: "added"} : {message: "error"}
}

async function rmFav(ctx){
  const uid = ctx.state.user.id
  const id = parseInt(ctx.params.id)
  const result = await favs.removeFav(id, uid)
  ctx.body = result.affectedRows ? {message: "removed"} : {message: "error"}
}

async function listMsg(ctx){
  const id = parseInt(ctx.params.id)
  const result = await msgs.getMsg(id)
  ctx.body = result ? result : 0
}

async function addMsg(ctx){
  const id = parseInt(ctx.params.id)
  const uid = ctx.state.user.id
  const uname = ctx.state.user.username
  const body = ctx.request.body
  const result = await msgs.add_Msg(id,uid,uname,body)
  ctx.body = result.affectedRows ? {message: "added"} : {message: "error"}
}

async function rmMsg(ctx){
  const body = ctx.request.body
  const id = parseInt(ctx.params.id)
  const result = await msgs.removeMsg(id,body)
  ctx.body = result.affectedRows ? {message:"removed"}:{message:"error"}
}
    
router.get('/',getAll)
router.get('/:id([0-9]{1,})', getById)
router.post('/',bodyParser(),validateArticle,createArticle)

export {router}