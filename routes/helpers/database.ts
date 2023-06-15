//Library
import { Sequelize, QueryTypes } from "sequelize"

//import database setting
import { config } from './private/config'

//function run_query for database query action
export const run_query = async (query, values) => {
  try{
    const sequelize = new Sequelize(`postgres://${config.user}:${config.password}@${config.host}:${config.port}/${config.database}`)
    await sequelize.authenticate()
    const data = await sequelize.query(query, {
      replacements: values,
      type: QueryTypes.SELECT
    })
    await sequelize.close()
    return data
  } catch (err) {
    console.error(err, query, values)
    throw 'Database query error'
  }
}

//function run_insert for database query action
export const run_insert = async(query, values) => {
  try{
    const sequelize = new Sequelize(`postgres://${config.user}:${config.password}@${config.host}:${config.port}/${config.database}`)
    await sequelize.authenticate()
    console.log('Start '+values)
    const data = await sequelize.query(query, {
      replacements: values,
      type: QueryTypes.INSERT
    })
    console.log('end')
    await sequelize.close()
    return data
  } catch(error) {
    console.error(error, query, values)
    throw 'Database query error'
  }
}