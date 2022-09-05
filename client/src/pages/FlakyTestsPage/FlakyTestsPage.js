import React, { useState, useEffect } from 'react'
import './FlakyTestsPage.scss'
import PageShell from '../../components/PageShell/PageShell'
import Table from '../../components/Table/Table'
import DateRangePicker from '../../components/DateRangePicker/DateRangePicker'

function FlakyTestsPage() {
  const [response, setResponse] = useState(0)
  const defaultStartDate = new Date('2022-08-01')
  const defaultEndDate = new Date()

  function fetchFlakyTestRuns(fromDate, toDate) {
    fetch(
      '/test-runs?' +
        new URLSearchParams({
          startDate: fromDate.toISOString(),
          endDate: toDate.toISOString(),
        })
    )
      .then((res) => res.json())
      .then((r) => setResponse(r))
  }

  useEffect(() => {
    fetchFlakyTestRuns(defaultStartDate, defaultEndDate)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  function onDateRangePickerChange([fromDate, toDate]) {
    fetchFlakyTestRuns(fromDate, toDate)
  }

  return (
    <div className="FlakyTestsPage">
      <PageShell>
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
