import { CompactTable } from '@table-library/react-table-library/compact'
import { useTheme } from '@table-library/react-table-library/theme'
import { getTheme } from '@table-library/react-table-library/baseline'
import React from 'react'

import './Table.scss'

const COLUMNS = [
  { label: 'TestName', renderCell: (item) => item._id.name },
  {
    label: 'countPassed',
    renderCell: (item) => item.countPassed,
  },
  {
    label: 'countFailed',
    renderCell: (item) => item.countPassed,
  },
]

const Table = (props) => {
  const nodes = props.data ? props.data : []

  const theme = useTheme([
    getTheme(),
    {
      Table: '--data-table-library_grid-template-columns:  60% 20% 20%',
    },
  ])

  return (
    <div>
      <h1>Latest flaky runs</h1>
      <CompactTable
        columns={COLUMNS}
        data={{ nodes }}
        theme={theme}
        layout={{ custom: true }}
      />
    </div>
  )
}

export default Table
