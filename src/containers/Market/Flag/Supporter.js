import React, { useState } from 'react'
import theme from 'theme'
import { More } from 'components/Icon'

import Panel from 'components/Panel'
import Table from 'components/Table'
import { Col, Row } from 'components/Layout'
import Text from 'components/Text'

import { LabelText, DateAgoText, TokenText, AvatarTable } from 'containers/Common'

const tableStyle = { center: true, flex: 1 }

const _More = ({ isExpanded }) => <More reverse={isExpanded} XS HS color={theme.white} />
export default function Supporter({ values }) {
  const [open, setOpen] = useState(true)
  const [expanded, setExpanded] = useState([])
  function onClickTable({ isExpanded, record: {createTime} }) { 
    if(isExpanded) setExpanded(expanded.filter(e => e.createTime === createTime))
    else setExpanded([...expanded, createTime])
  }
  return (
    <Panel 
      expanded={open}
      onClick={() => setOpen(!open)}
      header='Deposit Records'
      body={
        <Table recordKey='createTime'
          model={[
          { label: 'Name', value: 'name', layoutStyle: tableStyle, component: AvatarTable },
          { label: 'Joined Date', value: 'createTime', layoutStyle: tableStyle, component: DateAgoText },
          { label: 'Deposited AMT', value: 'amount', layoutStyle: tableStyle, component: TokenText },
          { label: 'Title', value: 'title', layoutStyle: tableStyle },
          { label: ' ', value: 'content', layoutStyle: { right: true, width: '50px' }, component: _More },
        ]} 
        values={values} 
        onClick={onClickTable}
        expandedRecords={expanded}
        expandComponent={({ record }) => 
          <Col VS HM>
            <Text note S>{record.content}</Text>
          </Col>
        }/>
      }
    />
  )  
}