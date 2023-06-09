import * as db from '../helpers/database'

//add a user Favorite
export async function addFav (id, uid) {
  const query1 = `SELECT * FROM favs WHERE  articleid=${id} AND userid=${uid}`
  const query = `INSERT INTO favs (articleID,userID) VALUES (${id},${uid}) ON CONFLICT ON CONSTRAINT  NoDuplicateFav DO NOTHING`
    try{
      const result = await db.run_query(query1, [id, uid])
      if(result!=''){
        console.log('RESULT = ' + result)
        return {"status": 201, "affectedRows":0 }
      } else {
        await db.run_query(query, [id, uid])
        return {"status": 201, "affectedRows":1 }
      }
    } catch(error) {
      return error
    }
}


    

//remove a fav record
export async function removeFav (id, uid) {
  let query = `DELETE FROM favs WHERE articleid=${id} AND userid=${uid};`
  try{
    await db.run_query(query, [id, uid])
    return { "affectedRows":1 }
  } catch(error) {
    return error
  }
}

//list the fav  article for user
export async function listFav (id) {
  const query = "SELECT * FROM favs  WHERE userid=?"
  const result = await db.run_query(query, [id])
  return result
}

