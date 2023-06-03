import * as db from '../helpers/database'

const check_code = async (code: string) => {
  const query = `SELECT code FROM active_code WHERE code = (${code})`
  const data = await db.run_query(query, null)
  if (data.length) {
    return true
  } else {
    return false
  }
}

export const active = async (info: object) => {
  const code = info.code
  const check = await check_code(code)
  if (check) {
    return {status: 201}
  } else {
    return {status: 101}
  }
}