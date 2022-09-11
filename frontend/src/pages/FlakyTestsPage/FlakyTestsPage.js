import React, { useState, useEffect } from 'react'
import './FlakyTestsPage.scss'
import PageShell from '../../components/PageShell/PageShell'
import Table from '../../components/Table/Table'
import DateRangePicker from '../../components/DateRangePicker/DateRangePicker'
import axios from 'axios'

function FlakyTestsPage() {
  const [response, setResponse] = useState(0)
  const defaultStartDate = new Date('2022-08-01')
  const defaultEndDate = new Date()

  function getFlakyTestRuns(fromDate, toDate) {
    axios(
      '/test-runs?' +
        new URLSearchParams({
          startDate: fromDate.toISOString(),
          endDate: toDate.toISOString(),
        })
    ).then((res) => {
      setResponse(res.data)
    })
  }

  useEffect(() => {
    axios.defaults.headers.common['Authorization'] =
      localStorage.getItem('authToken')
    getFlakyTestRuns(defaultStartDate, defaultEndDate)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function onDateRangePickerChange([fromDate, toDate]) {
    getFlakyTestRuns(fromDate, toDate)
  }

  return (
    <div className="FlakyTestsPage">
      <PageShell>
        <h1>Latest flaky runs</h1>
        <DateRangePicker
          onChange={onDateRangePickerChange}
          defaultValue={[defaultStartDate, defaultEndDate]}
        />
        <Table data={response}></Table>
      </PageShell>
    </div>
  )
}

export default FlakyTestsPage
