import React from 'react'
import Tab from '../../components/Tab'
const FILTERS = [
  { label: 'All', value: null },
  { label: 'Hottest', value: 'hot' },
  { label: 'Newest', value: 'new' },
  { label: 'Popolous', value: 'pop' },
  { label: 'Richest', value: 'rich' },
]

export default () => 
  <>
    <Tab activeTab={null} tabs={FILTERS} onClick={(v, i) => console.log(v, i) }  />
  </>