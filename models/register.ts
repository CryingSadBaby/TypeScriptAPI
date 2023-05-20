import * as db from '../helpers/database'

const checkUser = async (username: Array) => {
  const query = 'SELECT username FROM users WHERE username = ?'
  const values = username
  const data = await db.run_query(query, values)
  if (data.length) {
    return true
  } else {
    return false
  }
}

const checkEmail = async (email: Array) => {
  const query = 'SELECT email FROM users WHERE email = ?'
  const values = email
  const data = await db.run_query(query, values)
  if (data.length) {
    return true
  } else {
    return false
  }
}

export const register = async (info: object) => {
  const username = [info.username]
  const email = [info.email]
  const keys = Object.keys(info)
  const values = Object.values(info)
  const key = keys.join(',')
  let param = ''
  const checkuser = await checkUser(username)
  const checkemail = await checkEmail(email)
  for (let i = 0; i < values.length; i++) {
    param += '? ,'
  }
  param = param.slice(0, -1)
  const query = `INSERT INTO users (${key}) VALUES (${param})`
  if (checkuser && checkemail) {
    return {status: 501}
  } else if (!checkuser && checkemail) {
    return {status: 502}
  } else if (checkuser && !checkemail) {
    return {status: 503}
  } else {
    await db.run_query(query, values)
    return {status: 201}
  }
}
