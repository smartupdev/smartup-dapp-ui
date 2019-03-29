import React from 'react'
import styled, { css } from 'styled-components'
import Tab from '../../components/Tab'
import Table from '../../components/Table'
import Icon from '../../components/Icon'
import Image from '../../components/Image'
import Text from '../../components/Text'
import { Row, Col } from '../../components/Layout'
import lang, { currentLang } from '../../lang'
import theme from '../../theme'
import { toPrice } from '../../lib/util/format'

import FakeIcon from '../../images/035-sun.svg'
import FakeImage from '../../images/037-ufo.svg'
import FakeArrow from '../../images/039-umbrella-1.svg'

const Top = styled(Row)`
  padding: 0 ${p => p.theme.spacingXS}
  background-color: ${p => p.theme.bgColorLight}
`

const FILTERS = [
  { label: lang.home.tab.all[currentLang], value: null },
  { label: lang.home.tab.hot[currentLang], value: 'hot' },
  { label: lang.home.tab.new[currentLang], value: 'new' },
  { label: lang.home.tab.pop[currentLang], value: 'pop' },
  { label: lang.home.tab.rich[currentLang], value: 'rich' },
]

const colWidth = '130px'

const _Icon = ({ value }) => <Image source={value} XS />
const More = () => <Icon source={FakeArrow} />
const _Name = ({ value, record }) => 
  <Col>
    <Text>{value}</Text>
    <Text note S>{record.createdDateTime}</Text> {/* { TODO } */}
  </Col>
const _Percent = ({ value }) => <Text>{value * 100 + '%'}</Text>
const _Price = ({ value }) => <Text>{toPrice(value)}</Text>
const _PriceShort = ({ value }) => <Text>{toPrice(value, 0)}</Text>
const ExpandCompoent = ({ record }) => 
  <Row spacingBottom={theme.spacingS}>
    <Col spacingLeft={theme.spacingXS} spacingRight={theme.spacingL}>
      <Image source={record.image} long />
    </Col>
    <Col>
      <Text XL wordSpaceL>{record.name}</Text>
      <Text note>{record.overview}</Text>
      <Row>
        <Text>{record.numberOfComments}</Text>
        <Text>{record.numberOfSub}</Text>
      </Row>
    </Col>
  </Row>
const TableName = [
  { label: '', value: 'icon', sortable: false, layoutStyle: { width: `calc( ${theme.iconSizeM} + 15px )`, center: true }, component: _Icon },
  { label: lang.home.table.name[currentLang], value: 'name', sortable: true, layoutStyle: { flex: 1, width: colWidth }, component: _Name },
  { label: lang.home.table.change[currentLang], value: 'changeAvg24h', sortable: true, layoutStyle: { width: colWidth }, component: _Percent },
  { label: lang.home.table.price[currentLang], value: 'price', sortable: true, layoutStyle: { width: colWidth }, component: _Price },
  { label: lang.home.table.volume[currentLang], value: 'volumeAvg24h', sortable: true, layoutStyle: { width: colWidth }, component: _PriceShort },
  { label: lang.home.table.cap[currentLang], value: 'pool', sortable: true, layoutStyle: { width: colWidth }, component: _PriceShort },
  { label: lang.home.table.graph[currentLang], value: 'priceIn7d', sortable: false, layoutStyle: { width: '200px' }, component: Text },
  { label: '', value: 'action', sortable: false, layoutStyle: { width: `calc( ${theme.iconSizeM} + 15px )` }, component: More },
]

const markets = [
  { id: '1', icon: FakeIcon, name: 'SMART', createdDateTime: 1553740797139, changeAvg24h: 0.18, price: 59.37, volumeAvg24h: 29002872, pool: 2682237283, priceIn7d: [ 40, 50, 45, 60, 57, 66, 70 ], overview: 'Your musical ideas into reality, using the one instrument you’ve been practising since birth— the voice.', image: FakeImage, numberOfComments: 2000, numberOfSub: 1000 },
  { id: '2', icon: FakeIcon, name: 'SMART', createdDateTime: 1553740797139, changeAvg24h: 0.18, price: 59.37, volumeAvg24h: 29002872, pool: 2682237283, priceIn7d: [ 40, 50, 45, 60, 57, 66, 70 ], overview: 'Let’s explain what is going on here.', image: FakeImage, numberOfComments: 2000, numberOfSub: 1000 },
  { id: '3', icon: FakeIcon, name: 'DUBLER STUDIO KIT', createdDateTime: 1553740797139, changeAvg24h: 0.18, price: 59.37, volumeAvg24h: 29002872, pool: 2682237283, priceIn7d: [ 40, 50, 45, 60, 57, 66, 70 ], overview: 'Let’s explain what is going on here.', image: FakeImage, numberOfComments: 2000, numberOfSub: 1000 },
]

export default () => 
  <Col>
    <Top flex={1} spaceBetween>
      <Tab activeTab={null} tabs={FILTERS} onClick={console.debug} type='simple' />
      <Row centerVertical>
        <Text spaceH={theme.spacingS}>225 RESULTS</Text>
        <Text>Search</Text>
      </Row>
    </Top>
    <Table 
      onClickHeader={console.debug} 
      onClick={console.debug}
      model={TableName} 
      values={markets} 
      sortBy='price' 
      orderBy='desc'
      expandedRecords={['1', '3']}
      expandCompoent={ExpandCompoent}
      />
  </Col>