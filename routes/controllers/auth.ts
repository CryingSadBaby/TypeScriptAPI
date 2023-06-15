import passport from 'koa-passport'
import basicAuth from '../strategies/basic'

passport.use(basicAuth)

export default passport.authenticate(['basic'], {session:false})