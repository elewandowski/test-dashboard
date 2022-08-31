const express = require('express')
const router = express.Router()
// const CypressRun = require('../models/CypressRun')
const Test = require('../models/Test')
const TestRun = require('../models/TestRun')
const xmlTestReportParser = require('../utils/xmlTestReportParser')

router
  .get('/', async (req, res) => {
    // const testRuns = await TestRun.aggregate([
    //   {
    //     $match: { suiteRunTimeStamp: { $gte: new Date('2022-07-01') } },
    //   },
    //   {
    //     $count: 'total count',
    //   },
    // ]).exec()

    const countDistinctPassedAndFailed = await TestRun.aggregate([
      {
        // get all tests runs between timestamps
        $match: {
          suiteRunTimeStamp: { $gte: new Date('2022-07-01') },
        },
      },
      {
        // for each test run, add 'passed' field, if test passed; and failed field, if test failed
        $project: {
          test: 1,
          passed: {
            $cond: [{ $eq: ['$passed', true] }, 1, 0],
          },
          failed: {
            $cond: [{ $eq: ['$passed', false] }, 1, 0],
          },
        },
      },
      {
        // group all test runs by test ID, and count the passed and failed fields
        $group: {
          _id: '$test',
          countPassed: { $sum: '$passed' },
          countFailed: { $sum: '$failed' },
        },
      },
    ])

    await Test.populate(countDistinctPassedAndFailed, { path: '_id' })

    console.log(countDistinctPassedAndFailed)

    // const distinctTestRuns = await TestRun.distinct('test').exec()

    // let outString = ''
    // outString += JSON.stringify(countDistinctPassedAndFailed, undefined, 2)

    res.json(countDistinctPassedAndFailed)
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
