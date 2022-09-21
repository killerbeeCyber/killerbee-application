const mongoose = require('mongoose')

const bddConnect = (db) => {
  const urlMongo = 'mongodb://root:example@mongodb:27017/' + db
  try {
    mongoose.connect(urlMongo, { authSource: 'admin' })
  } catch (e) {
    console.log(e)
  }
}

module.exports = bddConnect