import * as db from '../helpers/database'

const checkExist = async (username: array) => {
  const query = 'SELECT username FROM users WHERE username = ?'
  const values = username
  const data = await db.run_query(query, values)
  if (data.length) {
    return true
  } else {
    return false
  }
}

export const register = async (info: object) => {
  const username = [info.username]
  const keys = Object.keys(info)
  const values = Object.values(info)
  const key = keys.join(',')
  let param = ''
  const check = await checkExist(username)
  for (let i: number = 0; i < values.length; i++) {
    param += '? ,'
  }
  param = param.slice(0, -1)
  const query = `INSERT INTO users (${key}) VALUES (${param})`
  if (check) {
    return {status: 501}
  } else {
    await db.run_query(query, values)
    return {status: 201}
  }
  
}
