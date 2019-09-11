import React from 'react'
import TableExpand from './TableExpand'
import Table from '../../../components/Table'
import { More } from '../../../components/Icon'
import Text from '../../../components/Text'
import { Slider } from '../../../components/Input'
import {SimpleLineChart} from '../../../components/Graph'
import Avatar from '../../../components/Avatar'
import { Col } from '../../../components/Layout'
import { useLang } from '../../../language'
import theme from '../../../theme'
import { toPrice, toPercent } from '../../../lib/util'
import { MARKET_STAGE } from '../../../integrator'
import { DateAgoText } from '../../Common'

const colWidth = '130px'
const colSliderWidth = '200px'
const minColWidth = '70px'

//TODO field match
const _Icon = ({ value }) => <Avatar icon={value} />
const _More = ({ isExpanded }) => <More reverse={isExpanded} XS color={theme.white} />
const _Name = ({ value, record }) => 
  <Col>
    <Text>{value}</Text>
    <DateAgoText S note value={record.createTime} />
  </Col>
const _Percent = ({ value }) => <Text>{toPercent(value)}</Text>
const _Price = ({ value }) => <Text price>{toPrice(value)}</Text>
const _Volume = ({ value }) => <Text primary>{toPrice(value)}</Text>
const _Cap = ({ value }) => <Text>{toPrice(value)}</Text>
const _Slider = ({ value }) => <Col width={colSliderWidth} RightS><Slider value={value} disabled /></Col>

const offeringModel = [
  { label: '',            value: 'avatar',        sortable: false,  component: _Icon,           layoutStyle: { width: `calc( ${theme.iconSizeM} + 15px )`, center: true, LeftXS: true } },
  { label: l => l.name,   value: 'name',          sortable: false,  component: _Name,           layoutStyle: { flex: 1, width: colWidth } },
  { label: 'Finished',    value: 'Finished',      sortable: true,   component: _Slider,         layoutStyle: { flex: 1, width: colSliderWidth, center: true } },
  { label: l => l.price,  value: 'last',          sortable: true,   component: _Price,          layoutStyle: { flex: 1, width: colWidth } },
  { label: 'Time',        value: 'time',          sortable: true,   component: DateAgoText,     layoutStyle: { flex: 1, width: colWidth } },
  { label: 'Fund Raised', value: 'Fund Raised',   sortable: true,   component: _Price,          layoutStyle: { flex: 1, width: colWidth } },
  { label: 'Target',      value: 'Target',        sortable: true,   component: _Price,          layoutStyle: { flex: 1, width: colWidth } },
  { label: '',            value: 'action',        sortable: false,  component: _More,           layoutStyle: { width: `calc( ${theme.iconSizeM} + 15px )`, right: true, RightXS: true } },
]

const exchangeModel = [
  { label: '',            value: 'avatar',        sortable: false,  component: _Icon,           layoutStyle: { width: `calc( ${theme.iconSizeM} + 15px )`, center: true, LeftXS: true } },
  { label: l => l.name,   value: 'name',          sortable: false,  component: _Name,           layoutStyle: { flex: 1, width: colWidth } },
  { label: l => l.change, value: 'lately_change', sortable: true,   component: _Percent,        layoutStyle: { width: minColWidth, right: true } },
  { label: l => l.price,  value: 'last',          sortable: true,   component: _Price,          layoutStyle: { width: colWidth, right: true } },
  { label: l => l.volume, value: 'lately_volume', sortable: true,   component: _Volume,         layoutStyle: { width: colWidth, right: true } },
  { label: l => l.cap,    value: 'amount',        sortable: true,   component: _Cap,            layoutStyle: { width: colWidth, right: true } },
  { label: l => l.graph,  value: 'priceIn7d',     sortable: false,  component: SimpleLineChart, layoutStyle: { width: '200px', center: true, MarginLeftL: true } },
  { label: '',            value: 'action',        sortable: false,  component: _More,           layoutStyle: { width: `calc( ${theme.iconSizeM} + 15px )`, right: true, RightXS: true } },
]

export default function({ 
  markets, 
  sortBy, orderBy, 
  onClickHeader, onClick, 
  expandedRecords, noExpand,
  hasMore, loadMore, isLoading,
  marketStage = MARKET_STAGE.exchange
  }) {
  const [{ home: {table: tableLang} }] = useLang()
  return (
      <Table
        S
        fixedHeader
        fixedCol={1}
        hasMore={hasMore}
        loadMore={loadMore}
        isLoading={isLoading}
        onClickHeader={onClickHeader}
        onClick={onClick}
        model={
          marketStage === MARKET_STAGE.offering ? 
            offeringModel 
          : noExpand ? exchangeModel.slice(0, -1) : exchangeModel
        }
        language={tableLang}
        values={markets}
        sortBy={sortBy}
        orderBy={orderBy}
        expandedRecords={expandedRecords}
        expandComponent={TableExpand}
      />
  )
}