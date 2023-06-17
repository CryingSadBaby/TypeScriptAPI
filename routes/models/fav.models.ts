//Local
import * as db from '../helpers/database'

//get favorite reference
const getFav = async(id: Number) => {
  const query = `SELECT * FROM favs WHERE userid = ${id}`
  const data = await db.run_query(query)
  return data
}

//get all user favorite pets information
export const all = async(id: Number) => {
  const fav = await getFav(id)
  const pid = []
  let p = ''
  if(fav.length){
    for(let i=0;i<fav.length;i++){
      p+='?,'
      pid.push(fav[i].pid) 
    }
    p=p.slice(0,-1)
    const query = `SELECT * FROM pets WHERE id IN (${p})`
    const data = await db.run_query(query,pid)
    return data
  }
}

export const add = async(id: Number,uid: Number)=>{
  const query1 = `SELECT * FROM favs WHERE pid=${id} AND userid=${uid}`
  const query2 = `INSERT INTO favs (pid,userid) VALUES (${id},${uid}) ON CONFLICT ON CONSTRAINT NoDuplicateFav DO NOTHING`
  try{
    const result = await db.run_query(query1,[id,uid])
    if(result!=''){
      return {"status":201, "affectedRows":0}
    } else {
      await db.run_query(query2,[id,uid])
      return {"status":201, "affectedRows":1}
    }
  } catch(err) {
    return err
  }
}

export const del = async(id: Number, uid: Number) => {
  const query = `DELETE FROM favs WHERE pid = ${id} AND userid = ${uid}`
  try{
    await db.run_query(query)
    return { "affectedRows":1 }
  } catch(err) {
    return err
  }
}