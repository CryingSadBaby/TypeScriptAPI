import {BasicStrategy} from 'passport-http'
import * as model from '../models/users'

function verifyPassword(user, password){
  return user.password === password
}

const checkUserAndPass = async (username, password, done) => {
  let result
  try{
    result = await model.findByUsername(username)
  } catch(error) {
    return done(error)
  }
  if(result.length){
    const user = result[0]
    if(verifyPassword(user, password)){
      console.log(`Successfully authenticated user ${username}`)
      return done(null, user)
    } else {
      console.log(`Password incorrect for user ${username}`)
    }
  } else {
    console.log(`No user found with username ${username}`)
  }
  return done(null,false)
}

const strategy = new BasicStrategy(checkUserAndPass)

export default strategy