import Router from 'koa-router'
import koaBody from 'koa-body'
import mime from 'mime-types'
import {copyFileSync, existsSync, createReadStream} from 'fs'
import {v4 as uuidv4} from 'uuid'

import {prefixlist} from './prefix/prefixlist'

const fileStore = './img'
const router = Router({prefix:prefixlist.public})

const upload = async(ctx) => {
  try{
    const {path,name,type} = ctx.request.files.upload
    const extension = mime.extension(type)
    console.log("Uploaded file details:")
    console.log(`path: ${path}`)
    console.log(`filename: ${name}`)
    console.log(`type: ${type}`)
    console.log(`extension: ${extension}`)
    const imageName = uuidv4()
    const newPath = `${fileStore}/${imageName}`
    copyFileSync(path, newPath)
    ctx.status = 201
    ctx.body = {
      filename: name,
      type: type,
      extension: extension,
      links: {
        path: `https://${ctx.host}${router.url('get_image',imageName)}`
      }
    }
  }catch(err){
    ctx.throw(500,'Upload Error',{message: err.message})
  }
}

const byName = async(ctx) => {
  const uuid = ctx.params.uuid
  const path = `${fileStore}/${uuid}`
  console.log(`Clinet requested image with path ${path}`)
  try{
    if(existSync(path)){
      console.log('Image Found')
      const src = createReadStream(path)
      ctx.type = 'image/jpeg'
      ctx.body = src
      ctx.status = 200
    }
  }catch(err){
    ctx.status = 404
  }
}

router.post('/images',koaBody,upload)
router.get('get_image','images/:uuid([0-9a-f\\-]{36})',byName)

export {router}