import {BasicStrategy} from 'passport-http'
import * as users from '../models/users.model'
import crypto from 'crypto'


//Verify password with salt
const verifyPassword = function(user,password) {
  const hash = crypto.createHash('sha256')
  hash.update(password+user.passwordsalt)
  return user.password === hash.digest('hex')
}

//Check username and password
const checkUserAndPass = async(username, password, done) => {
  let result
  try{
    result = await users.findByUsername(username)
  }catch(err){
    console.error(`Error during authentication for user ${username}`)
    return done(err)
  }
  if(result.length){
    const user = result[0]
    if(verifyPassword(user,password)){
      console.log(`Successfully authenticated user ${username}`)
      return done(null, user)
    }else{
      console.log(`Password incorrect fro user ${username}`)
    }
  }else{
    console.log(`No user found with username ${username}`)
  }
  return done(null, false)
}

const strategy = new BasicStrategy(checkUserAndPass)

export default strategy