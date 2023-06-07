import { copyFileSync, existsSync, createReadStream} from 'fs'
import koaBody from 'koa-body'
import Router from 'koa-router'
import {v4 as uuidv4} from 'uuid'

const upload_options = {
  multipart: true,
  formidable: {uploadDir: './img'}
}

const fileStore='./img'

const prefix = '/api/v1'
const router = Router({prefix: prefix})

const upload = async (ctx) => {
  try{
    const {path, name, type} = ctx.request.files.upload
    const extension = mime.extension(type)
    console.log('Uploaded file details:')
    console.log(`path: ${path}`)
    console.log(`filename: ${name}`)
    console.log(`type: ${type}`)
    console.log(`extension: ${extension}`)
    const imageName = uuidv4()
    const newPath = `${fileStore}/${imageName}`
    copyFileSync(path, newPath)
    ctx.status=201
    ctx.body={
      filename: name,
      type: type,
      extension: extension,
      links: {path: `https://${ctx.host}${router.url('get_image', imageName)}`}
    }
  } catch(error) {
    console.log(`error ${error.message}`)
    ctx.throw(500,'upload error', {message: error.message})
  }
}

// const getFile = async(ctx)=>{
//   const uuid = ctx.params.uuid
//   const path = `${fileStore}/${uuid}`
//   console.log('client requested image with path',path)
//   try{
//     if(existsSync(path)){
//       console.log('image found')
//       const src = createReadStream(path)
//       ctx.type = 'image/jpeg'
//       ctx.body = src
//       ctx.status = 200
//     } else {
//       console.log('image not found')
//       ctx.status = 404
//     }
//   }
// }

router.post('/images', koaBody, upload)
//router.get('get_image','/images/:uuid([0-9a-f\\-](36))', getFile)

export {router}