import { CompactTable } from '@table-library/react-table-library/compact'
import React from 'react'

import './Table.css'

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
  console.log(nodes)

  return <CompactTable columns={COLUMNS} data={{ nodes }} />
  //   return <div />
}

export default Table
