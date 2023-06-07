import * as db from '../helpers/database'

export async function getAll(limit=10, page=1){
  const offset = (page-1)*limit
  const query = "SELECT * FROM users LIMIT ? OFFSET ?"
  const data = await db.run_query(query, [limit,offset])
  return data
}

export async function getSearch(s,q){
  const query = `SELECT ${s} FROM users WHERE ${s} LIKE '%${q}%'`
  const data = await db.run_query(query)
  return data
}

export async function getByUserId(id){
  const query = "SELECT * FROM users WHERE id=?"
  const values = [id]
  const data = await db.run_query(query,values)
  return data
}

export async function add(user){
  let keys = Object.keys(user)
  const values = Object.values(user)
  keys = keys.join(',')
  let parm = ''
  for(let i=0;i<values.length;i++){parm+='?,'}
  parm=parm.slice(0,-1)
  const query = `INSERT INTO users (${keys}) VALUES (${parm})`
  try{
    await db.run_query(query, values)
    return {"status":201}
  } catch(error) {
    return error
  }
}

export async function findByUsername(username){
  const query = "SELECT * FROM users WHERE username = ?"
  const values = [username]
  const data = await db.run_query(query,values)
  return data
}