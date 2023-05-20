import * as db from '../helpers/database'

const checkRequest = async (username: string, password: string) => {
  const query = `SELECT (username,password) FROM users where username = '${username}' and password = '${password}'`
  const data = await db.run_query(query, null)
  if (data.length) {
    return true
  } else {
    return false
  }
}

export const login = async (info: object) => {
  const username = info.username
  const password = info.password
  const check = await checkRequest(username, password)
  if (check) {
    return {status: 201}
  } else {
    return {status: 101}
  }
}