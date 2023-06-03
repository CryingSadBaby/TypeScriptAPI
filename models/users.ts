import * as db from '../helpers/database';

export const findByUsername = async (username) => {
  const query = 'SELECT * FROM users where username = ?';
  const user = await db.run_query(query,  [username] );
  return user;
}

export const findById = async (id) => {
  const query = 'SELECT username FROM users where id = ?'
  const user = await db.run_query(query, [id])
  return user
}