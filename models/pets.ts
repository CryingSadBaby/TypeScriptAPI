import * as db from '../helpers/database'

export const getAll = async () => {
  let query = 'SELECT * FROM pets;'
  let data = await db.run_query(query, null)
  return data
}

export const getById = async (id: any) => {
  let query = 'SELECT * FROM pets WHERE ID = ?'
  let values = [id]
  let data = await db.run_query(query, values)
  return data
}