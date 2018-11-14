import fs from 'fs'
import path from 'path'
import Sequelize from 'sequelize'
import debug from 'debug'
const basename = path.basename(module.filename)


//const config = require(__dirname + '/../config.json')
const db = {}

const conf = {
	database: process.env.DB_NAME,
	username: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  dialect: 'mysql',
  logging: s => debug(s),
  operatorsAliases: false
}

const sequelize = new Sequelize(conf)

fs
  .readdirSync(__dirname)
  .filter((file) => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js')
  })
  .forEach((file) => {
    const model = sequelize['import'](path.join(__dirname, file))
    db[model.name] = model
  })

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

require('../utils/associations')(db)

db.sequelize = sequelize

module.exports = db
