import React, { useState } from 'react'
import Panel from 'components/Panel'
import Table from 'components/Table'
import Text from 'components/Text'

export default function Discussion() {
  const [open, setOpen] = useState(false)
  return (
    <Panel 
      bottomLine
      expanded={open}
      onClick={() => setOpen(!open)}
      header='Discussion'
      body={<Text center note VS>Will release soon</Text>}
    />
  )
}