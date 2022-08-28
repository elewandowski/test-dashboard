const mongoose = require('mongoose')
const { Schema } = mongoose

const testRun = new mongoose.Schema({
  name: { type: String },
  numberOfRetries: { type: Number },
  suiteName: { type: String },
  suiteFilePath: { type: String },
  suiteTimeStamp: { type: Date },
  cypressRun: { type: Schema.Types.ObjectId, ref: 'CypressRun' },
})

const TestRun = mongoose.model('testRun', testRun)

module.exports = TestRun
