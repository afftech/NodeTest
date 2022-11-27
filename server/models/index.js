const Mongoose = require('mongoose')
const config = require('../config/config')

Mongoose.connect(config.db.url)
  .then(() => { console.log("DB connected!") })
  .catch((err) => { console.log(err) })

const {User} = require('./User.js')(Mongoose)

module.exports = {User}
