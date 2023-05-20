import passport from 'koa-passport'
import { BasicStrategy } from 'passport-http'
import { RouterContext } from 'koa-router'

//load databse action
import * as users from '../models/users'

const verifyPassword = (user, password: string) => {
  return user.password === password;
}

passport.use(new BasicStrategy(async (username, password, done) => {
  let result = []
  try {
    result = await users.findByUsername(username)
    console.log('user found')
  } catch (error) {
    console.error(`Error during authentication for user ${username}: ${error}`)
    done(null, false)
  }
  if(result.length) {
    const user = result[0]
    console.log('username: '+ user.username)
    if(verifyPassword(user, password)) {
      console.log('done')
      done(null, {user: user})
    } else {
      console.log(`Password incorrect for ${username}`)
      done(null, false);
    }
  } else {
    console.log(`No user found with username ${username}`)
    done(null, false)
  }
}))


export const basicAuth = async (ctx: RouterContext) => {
  await passport.authenticate("basic", { session: false })(ctx);
  if(ctx.status == 401){
    ctx.body = {message: 'you are not authorized'}
  } else {
    ctx.body = {message: 'authoricated'}
  }
}