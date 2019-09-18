import React, { useState } from 'react'
import Panel from 'components/Panel'
import Table from 'components/Table'
import Text from 'components/Text'

const historyStyle = { center: true, flex: 1 }
export default function History() {
  const [open, setOpen] = useState(false)
  return (
    <Panel 
      expanded={open}
      onClick={() => setOpen(!open)}
      header='Flag History'
      body={
        <Table model={[
          { label: 'Time', value: 'createTime', layoutStyle: historyStyle },
          { label: 'Flag Creator', value: 'creator', layoutStyle: historyStyle },
          { label: 'Result', value: 'result', layoutStyle: historyStyle },
          { label: 'Outcome', value: 'outcome', layoutStyle: historyStyle }
        ]} values={[]} />
      }
    />
  )
}