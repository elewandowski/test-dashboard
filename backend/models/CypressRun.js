const mongoose = require('mongoose')
const { Schema } = mongoose

const cypressRun = new mongoose.Schema({
  name: { type: Object },
  timestamp: { type: Date },
  circleCiUrl: { type: String },
  flakyTests: [{ type: Schema.Types.ObjectId, ref: 'TestRun' }],
})

const CypressRun = mongoose.model('cypressRun', cypressRun)

module.exports = CypressRun
