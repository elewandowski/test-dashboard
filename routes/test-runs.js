const express = require('express')
const router = express.Router()
// const CypressRun = require('../models/CypressRun')
const Test = require('../models/Test')
const TestRun = require('../models/TestRun')
const xmlTestReportParser = require('../utils/xmlTestReportParser')

router
  .get('/', async (req, res) => {
    const testQueryResult = await Test.findOne({
      name: 'Text - ordered list (Block level) is flaky',
    }).exec()

    const testRunsFailing = await TestRun.find({
      test: testQueryResult?._id,
      // figure out suite run timestamp
      suiteRunTimeStamp: { $gte: '2022-07-01' },
      failureMessage: { $exists: true },
    })
      .populate('test')
      .exec()

    const testRunsTotal = await TestRun.find({
      test: testQueryResult?._id,
      suiteRunTimeStamp: { $gte: '2022-07-01' },
    })
      .populate('test')
      .exec()

    const outString = `${testRunsFailing.length}/${testRunsTotal.length} are failing`

    res.render('test-runs', {
      output: outString,
    })
  })
  .post('/', async (req, res) => {
    // const cyRun = new CypressRun({ name: req.body })

    // cyRun.save()
    /**
     * for all test runs that are flaky in the last week, group them all by test name,
     * and display them in order of flakiness
     *
     * TODO add cy run object
     *
     */

    const testRuns = xmlTestReportParser.requestToTestRuns(req)

    for (const testRun of testRuns) {
      const testAlreadyExists = await Test.findOne({
        name: testRun.name,
      }).exec()

      if (testAlreadyExists) {
        await TestRun.create({
          test: testAlreadyExists._id,
          ...testRun,
        })
      } else {
        const newTest = new Test(testRun)
        await newTest.save()
        await TestRun.create({
          test: newTest._id,
          ...testRun,
        })
      }
    }

    res.sendStatus(200)
  })

module.exports = router
