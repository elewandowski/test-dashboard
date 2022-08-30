module.exports = {
  requestToTestCases(req) {
    const suites = this.requestBodyToSuiteObjects(req.body)
    const suite = suites[1]
    const suiteMetaData = this.getSuiteMetaData(suites[0], suites[1])
    const testCaseArray = this.getTestCaseArray(suite)
    const testCases = this.getTestCases(testCaseArray, suiteMetaData)
    return testCases
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
      suiteTimestamp: metaData.timestamp,
    }
  },

  getTestCaseArray(suite) {
    return suite['testcase']
  },

  getTestCase(testCase, suite) {
    const testCaseMetaData = testCase['$']
    const failureMessage = testCase?.['failure']?.[0]?.['_']
    return {
      name: testCaseMetaData.name,
      passed: !!failureMessage,
      failureMessage: failureMessage,
      suiteRunTimeStamp: '2022-07-01',
      ...suite,
    }
  },

  getTestCases(testCaseArray, suiteMetaData) {
    return testCaseArray.map((testCase) =>
      this.getTestCase(testCase, suiteMetaData)
    )
  },
}
