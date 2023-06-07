import * as db from '../helpers/database'

export async function getAll (page,limit,order){
  const query = "SELECT * FROM articles"
  const data = await db.run_query(query)
  return data
}

export async function getById(id){
  const query = "SELECT * FROM articles WHERE id = ?"
  const values = [id]
  const data = await db.run_query(query, values)
  return data
}

export async function deleteById(id){
  const query = "DELETE FROM articles WHERE id = ?"
  const values = [id]
  const data = await db.run_query(query, values)
  return data
}

export async function add(article){
  let keys = Object.keys(article)
  const values = Object.values(article)
  keys = keys.join(',')
  let parm = ''
  for(let i=0;i<values.length;i++){parm+='?,'}
  parm=parm.slice(0,-1)
  const query = `INSERT INTO articles (${keys}) VALUES (${parm})`
  try{
    await db.run_query(query,values)
    return {"status":201}
  } catch(error){
    return error
  }
}

export async function update(article,id){
  let keys = Object.keys(article)
  const values = Object.values(article)
  let updateString = ""
  for(let i=0;i<values.length;i++){updateString+=keys[i]+"="+"'"+values[i]+"'"+","}
  updateString=updateString.slice(0,-1)
  const query = `UPDATE articles SET ${updateString} WHERE id=${id} RETURNING *`
  try{
    await db.run_query(query, values)
    return {"status":201}
  } catch(error) {
    return error
  }
}