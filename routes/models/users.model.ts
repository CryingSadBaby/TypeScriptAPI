//Library
import crypto from 'crypto'

//Local
import * as db from '../helpers/database'

//Get all user function
export const all = async() => {
  const query = `SELECT * FROM users`
  const data = await db.run_query(query)
  return data
}

//Get user by id function
export const byid = async(id:Number) => {
  const query = `SELECT * FROM users WHERE id=${id}`
  const data = await db.run_query(query)
  return data
}

//Update user information function
export const update = async(users,id:Number) => {
  const keys = Object.keys(users)
  const values = Object.values(users)
  let p = ''
  for(let i=0;i<values.length;i++){p+=keys[i]+"='"+values[i]+"',"}
  p=p.slice(0,-1)
  const query = `UPDATE users SET ${p} WHERE id=${id} RETURNING *`
  try{
    await db.run_query(query,values)
    return {"status":201}
  }catch(err){
    return err
  }
}


//Check user exist by username or email
const checkUser = async(username: String, email: String) => {
  const query = `SELECT username FROM users WHERE username = '${username}' OR email = '${email}'`
  const result = await db.run_query(query)
  if(result.length){
    return true
  }else{
    return false
  }
}

//Get salt from database function
const getSalt = async(username: String) => {
  const query = `SELECT password, passwordsalt FROM users WHERE username = '${username}'`
  const result = await db.run_query(query)
  if(result){
    return result[0]
  }
}

//Check user exist by username
const checkUsername = async(username: String) => {
  const query = `SELECT username FROM users WHERE username = '${username}'`
  const result = await db.run_query(query)
  if(result){
    return true
  }else{
    return false
  }
}

//For basic use check user function
export const findByUsername = async(username: String) => {
  const query = `SELECT * FROM users WHERE username = ?`
  const values = [username]
  const user = await db.run_query(query, values)
  return user
}

//Check code exist function
const checkCode = async(code: String) => {
  const query = `SELECT role FROM codes WHERE code = '${code}'`
  const result = await db.run_query(query)
  if(result.length){
    return true
  } else {
    return false
  }
}

//Get role by code function
const getRole = async(code: String) => {
  const query = `SELECT role FROM codes WHERE code = '${code}'`
  const result = await db.run_query(query)
  if(result.length){
    return result[0]
  }
}

//Get user role function
export const getURole = async(username: String,id: Number) => {
  const query = `SELECT role FROM users WHERE id = '${id}'`
  const result = await db.run_query(query)
  if(result){
    return result[0]
  }
}

//Register a user function
export const register = async(users) => {
  const username = users.username
  const email = users.email
  const checkcode = await checkCode(users.code)
  const check = await checkUser(username,email)
  //Create salt
  const salt = crypto.randomBytes(16).toString('hex')
  const hash = crypto.createHash('sha256')
  //Hash user password with salt
  hash.update(users.password+salt)
  users.password = hash.digest('hex')
  //If user not exist
  if(!check){
    //If code exist
    if(checkcode){
      //Get role by code
      const roledata = await getRole(users.code)
      const role = roledata.role
      //Remove code in user for insert to database
      const {code,...data} = users
      const keys = Object.keys(data)
      const values = Object.values(data)
      //keys array add passwordsalt and role
      keys.push('passwordsalt','role')
      //values array add salt and role value
      values.push(salt,role)
      keys.join(',')
      //count values
      let p = ''
      for(let i=0;i<values.length;i++){p+='?,'}
      p=p.slice(0,-1)
      const query = `INSERT INTO users (${keys}) VALUES (${p})`
      try{
        await db.run_query(query,values)
        return {"status":201}
      }catch(err){
        return err
      }
    }else{
      const role = 'user'
      const {code,...data} = users
      const keys = Object.keys(data)
      const values = Object.values(data)
      keys.push('passwordsalt','role')
      values.push(salt,role)
      keys.join(',')
      let p = ''
      for(let i=0;i<values.length;i++){p+='?,'}
      p=p.slice(0,-1)
      const query = `INSERT INTO users (${keys}) VALUES (${p})`
      try{
        await db.run_query(query,values)
        return {"status":201}
      }catch(err){
        return err
      }
    }
  }
}