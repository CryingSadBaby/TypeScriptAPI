//Local
import * as db from '../helpers/database'

//Get all cats function
export const all = async() => {
  const query = `SELECT * FROM pets`
  const data = await db.run_query(query)
  return data
}

//Get cat by id function
export const byid = async(id: number) => {
  const query = `SELECT * FROM pets WHERE id = ${id}`
  const data = await db.run_query(query,)
  return data
}

//Post cat function
export const add = async(cat) => {
  const keys=Object.keys(cat).join(',')
  const values=Object.values(cat)
  let p = ''
  for(let i=0;i<values.length;i++){p+='?,'}
  p = p.slice(0,-1)
  const query = `INSERT INTO pets (${keys}) VALUES (${p})`
  try{
    await db.run_query(query,values)
    return {"status":201}
  } catch(err) {
    return err
  }
}

//Update cat information function
export const update = async(cat,id:Number) => {
  const keys=Object.keys(cat)
  const values=Object.values(cat)
  let p = ''
  for(let i=0;i<values.length;i++){p+=keys[i]+"='"+values[i]+"',"}
  p=p.slice(0,-1)
  const query = `UPDATE pets SET ${p} WHERE id=${id} RETURNING *`
  try{
    await db.run_query(query,values)
    return {"status":201}
  } catch(err) {
    return err
  }
}

//Delete cat information by id
export const del = async(id:Number) => {
  const query = `DELETE FROM pets WHERE id = ${id}`
  try{
    await db.run_query(query)
    return {"status":201}
  }catch(err){
    return err
  }
}