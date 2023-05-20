import { Sequelize, QueryTypes } from "sequelize"

//import database setting
import {config} from '../private/config'

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
  } catch (err: any) {
    console.error(err, query, values)
    throw 'Database query error'
  }
}