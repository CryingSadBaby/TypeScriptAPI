import * as db from '../helpers/database'

//get all Msgs of articled
export async function getMsg (id) {
  const query = "SELECT * FROM msgs WHERE articleid=?;"
  const result = await db.run_query(query, [id])
  return result
}

//add a new Msg
export async function add_Msg (id, uid,uname,body) {
  const msg = body.messagetxt
  const query = `INSERT INTO msgs (articleid,userid,username,messagetxt) VALUES (${id},${uid},'${uname}','${msg}') `
    try{
      await db.run_query(query, [id, uid,uname,msg])
      return {"status": 201,"affectedRows":1}
    } catch(error) {
      return error
    }
}


    

//remove a msg record
export async function removeMsg (id, body) {
  const msgtxt = body.messagetxt
  const query = "DELETE FROM msgs WHERE articleid=? AND messagetxt=?"
   try{
    await db.run_query(query, [id, msgtxt]) 
    return { "affectedRows":1 }
  } catch(error) {
    return error
  }
}


