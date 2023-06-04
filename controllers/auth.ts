import passport from "koa-passport"
import { BasicStrategy } from "passport-http"
import { RouterContext } from "koa-router"

//import local file
import * as users from '../models/users'

const verifyPassword = (user: Object, password: string) => {
  return user.password === password
}

passport.use(new BasicStrategy(async (username, password, done) => {
  let result = []
  try {
    result = await users.findByUsername(username)
  } catch (error) {
    done(null, false)
  }
  if(result.length) {
    const user = result[0]
    if(verifyPassword(user, password)) {
      done(null,{user: user})
    } else {
      done(null,false)
    }
  } else {
    done(null, false)
  }
}))

export const basicAuth = async (ctx:RouterContext) => {
  await passport.authenticate("basic", {session: false}) (ctx)
  if(ctx.status = 401){
    ctx.body = {message: 'You are not authorized'}
  }
}