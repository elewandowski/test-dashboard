module.exports = {
  requestToTestRuns(req) {
    const suites = this.requestBodyToSuiteObjects(req.body)
    const suite = suites[1]
    const suiteMetaData = this.getSuiteMetaData(suites[0], suites[1])
    const testRunArray = this.getTestRunArray(suite)
    const testRuns = this.getTestRuns(testRunArray, suiteMetaData)
    return testRuns
  },

  requestBodyToSuiteObjects(body) {
    return body['testsuites']['testsuite']
  },

  getSuiteMetaData(rootSuite, testSuite) {
    const rootSuiteMetaData = rootSuite['$']
    const metaData = testSuite['$']
    return {
      suiteName: metaData.name,
      suiteFilePath: rootSuiteMetaData.file,
      runTimestamp: metaData.timestamp,
    }
  },

  getTestRunArray(suite) {
    return suite['testcase']
  },

  getTestRun(testRun, suite) {
    const testRunMetaData = testRun['$']
    // TODO can we be sure that all failures will appear like this?
    const failureMessage = testRun?.['failure']?.[0]?.['_']
    return {
      name: testRunMetaData.name,
      passed: !failureMessage,
      failureMessage: failureMessage,
      suiteRunTimeStamp: suite.runTimestamp,
      ...suite,
    }
  },

  getTestRuns(testRunArray, suiteMetaData) {
    return testRunArray.map((testRun) =>
      this.getTestRun(testRun, suiteMetaData)
    )
  },
}
