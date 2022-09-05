import { DateRangePicker as DRP } from 'rsuite'

import 'rsuite/dist/rsuite.min.css'

function DateRangePicker(props) {
  return <DRP isoWeek={true} size={'lg'} {...props} />
}

export default DateRangePicker
