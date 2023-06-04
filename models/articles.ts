import * as db from '../helpers/database'

export const getAll = async () => {
  const query = 'SELECT * FROM articles;'
  const data = await db.run_query(query, null)
  return data
}

export const getById = async (id: number) => {
  const query = 'SELECT * FROM articles WHERE ID = ?'
  const values = [id]
  const data = await db.run_query(query, values)
  return data
}

export const deleteByID = async (id: number) => {
  const query = 'DELETE FROM articles WHERE ID = ?'
  const values = [id]
  const data = await db.run_query(query, values)
  return data
}

export const createArticle = async (article: Object) => {
  let keys = Object.keys(article)
  const values = Object.values(article)
  keys = keys.join(', ')
  let parm = ''
  for(let i=0;i<values.length;i++) {parm +='?,'}
  parm = parm.slice(0,-1)
  const query = `INSERT INTO articles (${keys}) VALUES (${parm})`
  try {
    await db.run_query(query, values)
    return {"status": 201}
  } catch(error) {
    return error
  }
}

export const updateArticle = async (article: Object, id: number) => {
  const keys = Object.keys(article)
  const values = Object.values(article)
  let updateString = ''
  for (let i = 0; i<values.length; i++) {
    updateString+=keys[i]+"="+"'"+values[i]+"'"+","
  }
  updateString = updateString.slice(0, -1)
  const query = `UPDATE articles SET ${updateString} WHERE id=${id} RETURNING *`
  try{
    await db.run_query(query, values)
    return{"status":201}
  } catch(error) {
    return error
  }
}