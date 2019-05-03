import React from 'react'
import TableExpand from './TableExpand'
import Table from '../../../components/Table'
import { More } from '../../../components/Icon'
import Button from '../../../components/Button'
import Text from '../../../components/Text'
import SimpleLineChart from '../../../components/SimpleLineChart'
import Avatar from '../../../components/Avatar'
import { Row, Col } from '../../../components/Layout'
import TableFooter from '../../../components/TableFooter'
import lang, { currentLang } from '../../../lang'
import theme from '../../../theme'
import { toPrice, toDate, toAgo, toPercent } from '../../../lib/util'

const tableLang = lang.home.table
const colWidth = '130px'

//TODO field match
const _Icon = ({ value }) => <Avatar icon={value} style={{ 'borderRadius':'50%'}}/>
const _More = ({ isExpanded }) => <More reverse={isExpanded} XS color={theme.white} />
const _Name = ({ value, record }) =>
  <Col>
    <Text>{value}</Text>
    <Text note S>{toAgo(record.createTime)}</Text>
  </Col>
const _Percent = ({ value }) => <Text>{toPercent(value)}</Text>
const _Price = ({ value }) => <Text price>{toPrice(value)}</Text>
const _Volume = ({ value }) => <Text primary>{toPrice(value)}</Text>
const _Cap = ({ value }) => <Text>{toPrice(value)}</Text>
const TableName = [
  { label: '',                            value: 'avatar',        sortable: false,  component: _Icon,           layoutStyle: { width: `calc( ${theme.iconSizeM} + 15px )`, center: true } },
  { label: tableLang.name[currentLang],   value: 'name',          sortable: false,   component: _Name,           layoutStyle: { flex: 1, width: colWidth } },
  { label: tableLang.change[currentLang], value: 'lately_change',  sortable: true,   component: _Percent,        layoutStyle: { width: colWidth } },
  { label: tableLang.price[currentLang],  value: 'last',          sortable: true,   component: _Price,          layoutStyle: { width: colWidth } },
  { label: tableLang.volume[currentLang], value: 'lately_volume', sortable: true,   component: _Volume,         layoutStyle: { width: colWidth } },
  { label: tableLang.cap[currentLang],    value: 'amount',        sortable: true,   component: _Cap,            layoutStyle: { width: colWidth } },
  { label: tableLang.graph[currentLang],  value: 'priceIn7d',     sortable: false,  component: SimpleLineChart, layoutStyle: { width: '200px', center: true } },
  { label: '',                            value: 'action',        sortable: false,  component: _More,           layoutStyle: { width: `calc( ${theme.iconSizeM} + 15px )`, right: true } },
]

export default function({ 
  markets, 
  sortBy, orderBy, 
  onClickHeader, onClick, 
  expandedRecords, noExpand,
  hasNextPage, getMore,
  autoHeight,
  minWidth = '1000px'  }) {
  return (
      <Table
        S
        inset
        autoHeight={autoHeight}
        minWidth={minWidth}
        onClickHeader={onClickHeader}
        onClick={onClick}
        model={noExpand ? TableName.slice(0, -1) : TableName}
        values={markets}
        sortBy={sortBy}
        orderBy={orderBy}
        expandedRecords={expandedRecords}
        expandCompoent={TableExpand}
        footer={()=>{ return(<TableFooter hasNextPage={hasNextPage} loadMore={getMore}/>) }}
      />
  )
}