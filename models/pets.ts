import * as db from '../helpers/database'

export const getAll = async () => {
  const query = 'SELECT * FROM pets;'
  const data = await db.run_query(query, null)
  return data
}

export const getById = async (id: number) => {
  const query = 'SELECT * FROM pets WHERE ID = ?'
  const values = [id]
  const data = await db.run_query(query, values)
  return data
}