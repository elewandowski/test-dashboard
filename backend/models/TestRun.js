const mongoose = require('mongoose')
const { Schema } = mongoose

const testRun = new mongoose.Schema({
  test: { type: Schema.Types.ObjectId, ref: 'Test' },
  numberOfRetries: { type: Number },
  // suiteName: { type: String },
  // suiteFilePath: { type: String },
  suiteRunTimeStamp: { type: Date },
  passed: { type: Boolean },
  failureMessage: { type: String },
  cypressRun: { type: Schema.Types.ObjectId, ref: 'CypressRun' },
})

const TestRun = mongoose.model('TestRun', testRun)

module.exports = TestRun
