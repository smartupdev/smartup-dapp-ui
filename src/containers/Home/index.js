import React from 'react'
import Tab from '../../components/Tab'
import Table from '../../components/Table'
import { Row, Col } from '../../components/Layout'
import lang, { currentLang } from '../../lang'
import theme from '../../theme'

import FakeIcon from '../../images/035-sun.svg'
const FILTERS = [
  { label: lang.home.tab.all[currentLang], value: null },
  { label: lang.home.tab.hot[currentLang], value: 'hot' },
  { label: lang.home.tab.new[currentLang], value: 'new' },
  { label: lang.home.tab.pop[currentLang], value: 'pop' },
  { label: lang.home.tab.rich[currentLang], value: 'rich' },
]

const colWidth = '100px'

const TableName = [
  { label: '', value: 'icon', sortable: false, layoutStyle: { width: theme.iconSizeM } },
  { label: lang.home.table.name[currentLang], value: 'name', sortable: true, layoutStyle: { flex: 1, width: colWidth } },
  { label: lang.home.table.change[currentLang], value: 'changeAvg24h', sortable: true, layoutStyle: { width: colWidth } },
  { label: lang.home.table.price[currentLang], value: 'price', sortable: true, layoutStyle: { width: colWidth } },
  { label: lang.home.table.volume[currentLang], value: 'volumeAvg24h', sortable: true, layoutStyle: { width: colWidth } },
  { label: lang.home.table.cap[currentLang], value: 'pool', sortable: true, layoutStyle: { width: colWidth } },
  { label: lang.home.table.graph[currentLang], value: 'priceIn7d', sortable: false, layoutStyle: { width: '200px' } },
  { label: '', value: 'action', sortable: false, layoutStyle: { width: theme.iconSizeM } },
]

const markets = [
  { id: '1', icon: FakeIcon, name: 'SMART', createdDateTime: 1553740797139, changeAvg24h: 0.18, price: 59.37, volumeAvg24h: 29002872, pool: 2682237283, priceIn7d: [ 40, 50, 45, 60, 57, 66, 70 ], overview: 'Let’s explain what is going on here.', image: FakeIcon, numberOfComments: 2000, numberOfSub: 1000 },
  { id: '2', icon: FakeIcon, name: 'SMART', createdDateTime: 1553740797139, changeAvg24h: 0.18, price: 59.37, volumeAvg24h: 29002872, pool: 2682237283, priceIn7d: [ 40, 50, 45, 60, 57, 66, 70 ], overview: 'Let’s explain what is going on here.', image: FakeIcon, numberOfComments: 2000, numberOfSub: 1000 },
  { id: '3', icon: FakeIcon, name: 'SMART', createdDateTime: 1553740797139, changeAvg24h: 0.18, price: 59.37, volumeAvg24h: 29002872, pool: 2682237283, priceIn7d: [ 40, 50, 45, 60, 57, 66, 70 ], overview: 'Let’s explain what is going on here.', image: FakeIcon, numberOfComments: 2000, numberOfSub: 1000 },
]

export default () => 
  <>
    <Tab activeTab={null} tabs={FILTERS} onClick={console.debug} />
    <Table onClickHeader={console.debug} model={TableName} values={markets} sortBy='price' orderby='desc' />

    {/* <Col> */}
    {/* <Row> */}
    {/* {
      TableName.map( ({ label, value }) => 
        <Row key={label} flex={1} onClick={() => console.debug(value)}>{label}</Row> )
    } */}
    {/* </Row>
    {
      markets.map( ({id, icon, name, createdDateTime, changeAvg24h, price, volumeAvg24h, pool, priceIn7d, overview, numberOfComments, numberOfSub}) => 
        <Row key={id}>
          <Row>{name}</Row>
          <Row>{createdDateTime}</Row>
          <Row>{changeAvg24h}</Row>
          <Row>{price}</Row>
          <Row>{volumeAvg24h}</Row>
          <Row>{pool}</Row>
          <Row>{priceIn7d}</Row>
          <Row>{overview}</Row>
          <Row>{numberOfComments}</Row>
          <Row>{numberOfSub}</Row>
        </Row>
      )
    }
    </Col> */}
  </>