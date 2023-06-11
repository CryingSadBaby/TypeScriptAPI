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

async function checkCode(code){
  const query = 'SELECT code FROM codes WHERE code = ?'
  const values = [code]
  const data = await db.run_query(query, values)
  if(data.length){
    return true
  } else {
    return false
  }
}

export async function add(user){
  const check = await checkCode(user.code)
  if(check){
    let {code,...data} = user
    let keys = Object.keys(data)
    let values = Object.values(data)
    keys = keys.join(',')
    let parm = ''
    for(let i=0;i<values.length;i++){parm+='?,'}
    parm=parm.slice(0,-1)
    console.log(keys, parm)
    const query = `INSERT INTO users (${keys}) VALUES (${parm})`
    try{
    await db.run_query(query, values)
    return {"status":201}
  } catch(error) {
    return error
    }
  } else {
    return {"status":401}
  }
}

export async function findByUsername(username){
  const query = "SELECT * FROM users WHERE username = ?"
  const values = [username]
  const data = await db.run_query(query,values)
  return data
}