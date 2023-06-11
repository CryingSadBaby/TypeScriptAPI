import { copyFileSync, existsSync, createReadStream} from 'fs'
import Router from 'koa-router'
import {v4 as uuidv4} from 'uuid'
import * as mime from 'mime-types'
import koaBody from 'koa-body'

const upload_options = {
  multipart: true,
  formidable: {uploadDir: './img'}
}
const fileStore = './img'
const prefix = '/api/v1'
const router = Router({prefix: prefix})

async function upload(ctx){
  try{
    const {filepath,originalFilename,newFilename,mimetype} = ctx.request.files.upload
    const extension = mime.extension(mimetype)
    const imageName = uuidv4()
    const newPath = `${fileStore}/${imageName}`
    console.log('Uploaded file details:')
    console.log(`path: ${filepath}`)
    console.log(`filename: ${originalFilename}`)
    console.log(`type: ${mimetype}`)
    console.log(`extension: ${extension}`)
    copyFileSync(filepath,newPath)
    ctx.status = 201
    ctx.body = {
      filename: originalFilename,
      type: mimetype,
      extension: extension,
      links: {
        path: `https://${ctx.host}${router.url('get_image', imageName)}`
      }
    }
  } catch(error) {
    console.log(`error ${error.message}`)
    ctx.throw(500, 'upload error', {message: error.message})
  }
}

async function getImage(ctx){
  console.log('client requested image with path', path)
  try{
    if(existsSync(path)){
      const uuid = ctx.params.uuid
      const path = `${fileStore}/${uuid}`
      console.log('image found')
      const src = createReadStream(path)
      ctx.type = 'image/jpeg'
      ctx.body = src
      ctx.status = 200
    } else {
      console.log('image not found')
      ctx.status = 404
    }
  } catch (error) {
    console.log(`error ${error.message}`)
    ctx.throw(500, 'image download error', {message: error.message})
  }
}


router.post('/images', koaBody(upload_options), upload)
router.get('get_image','/images/:uuid([0-9a-f\\-]{36})', getImage)


export {router}