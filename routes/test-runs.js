const express = require('express')
const router = express.Router()
const CypressRun = require('../models/CypressRun')
const TestRun = require('../models/TestRun')
const handlers = require('../handlers/handlers')

/* GET users listing. */
router
  .get('/', async (req, res) => {
    const cypressRuns = await CypressRun.find()
    console.log(cypressRuns)

    res.render('test-runs', {
      output: JSON.stringify(cypressRuns, undefined, 2),
    })
  })
  .post('/', async (req, res) => {
    // const cyRun = new CypressRun({ name: req.body })

    // cyRun.save()

    // todo: unify test case and test run naming
    const testCases = handlers.requestToTestCases(req)

    console.log(testCases)

    new TestRun(testCases[0]).save()
    // testCases.forEach((tc) => {})

    res.send(JSON.stringify(req.body, undefined, 2))
  })

module.exports = router
