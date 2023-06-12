import * as db from '../helpers/database'

//add a new like record
export async function like (id,uid){
  const query1 = `SELECT * FROM articleslikes WHERE articleid=${id} AND userid=${uid}`
  const query = `INSERT INTO articleslikes (articleid,userid) VALUES (${id},${uid})`
  try{
    const result = await db.run_query(query1,[id,uid])
    if(result!='') {
      console.log('Result = '+result)
      return {"status": 201, "affectedRows": 0}
    } else {
      await db.run_query(query,[id,uid])
      return {"status":201,"affectedRows":1}
    }
  } catch(error) {
    return error
  }
}


//remove a like record
export async function dislike (id, uid) {
  let query = "DELETE FROM articleslikes WHERE articleid=? AND userid=?; "
   try{
    await db.run_query(query, [id, uid])
    return { "affectedRows":1 }
  } catch(error) {
    return error
  }

}

//count the likes for an article
export async function count (id) {
  let query = "SELECT count(1) as likes FROM articleslikes WHERE articleid=?;"
  const result = await db.run_query(query, [id])
  return result[0].likes
}

