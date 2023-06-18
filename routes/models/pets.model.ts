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
  const data = await db.run_query(query)
  return data
}

//Post cat function
export const add = async(cat,uid) => {
  const keys=Object.keys(cat).join(',')
  const values=Object.values(cat)
  let p = ''
  for(let i=0;i<values.length;i++){p+='?,'}
  p = p.slice(0,-1)
  const query = `INSERT INTO pets (${keys},userid) VALUES (${p},?)`
  try{
    values.push(uid)
    await db.run_query(query,values)
    return {"status":201}
  } catch(err) {
    return err
  }
}

//Update cat information function
export const update = async(cat,id:Number,uid:Number) => {
  const keys=Object.keys(cat)
  const values=Object.values(cat)
  let p = ''
  for(let i=0;i<values.length;i++){p+=keys[i]+"='"+values[i]+"',"}
  p=p.slice(0,-1)
  const query = `UPDATE pets SET ${p} WHERE id=${id} AND userid = ${uid} RETURNING *`
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

//Search cat information
export const search = async(cat)=>{
  const keys = Object.keys(cat)
  const values = Object.values(cat)
  let query = ''
  let p = ''
  for(let i=0;i<values.length;i++){p+='?,'}
  p = p.slice(0,-1)
  if(typeof(values[0])=='boolean'){
    query = `SELECT * FROM pets WHERE (${keys}) IN (${p})`
  }else if(Number.isInteger(values[0])){
    query = `SELECT * FROM pets WHERE (${keys}) IN (${p})`
  }else if(values[0]==null){
    query = `SELECT * FROM pets`
  }else {
    for(let v=0;v<values.length;v++){values[v]=`%${values[v]}%`}
    query = `SELECT * FROM pets WHERE (${keys}) ILIKE (${p})`
  }
  const data = await db.run_query(query,values)
  return data
}