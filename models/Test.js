const mongoose = require('mongoose')
// const { Schema } = mongoose

const testSchema = new mongoose.Schema({
  name: { type: String },
  suiteName: { type: String },
  suiteFilePath: { type: String },
})

const Test = mongoose.model('testSchema', testSchema)

module.exports = Test
