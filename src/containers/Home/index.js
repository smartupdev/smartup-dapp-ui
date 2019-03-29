import React from 'react'
import styled from 'styled-components'
import Tab from '../../components/Tab'
import Table from '../../components/Table'
import Icon from '../../components/Icon'
import Image from '../../components/Image'
import Text from '../../components/Text'
import Button from '../../components/Button'
import { Row, Col } from '../../components/Layout'
import lang, { currentLang } from '../../lang'
import theme from '../../theme'
import { toPrice, toDate } from '../../lib/util'

import CommentIcon from '../../images/018-planet-earth-2.svg'
import SubIcon from '../../images/019-jupiter.svg'
import TradeIcon from '../../images/042-wind.svg'
import BookmarkIcon from '../../images/033-star.svg'

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

const _Icon = ({ value }) => <Image source={value} S />
const More = ({ isExpanded }) => <Icon source={FakeArrow} reverse={isExpanded} />
const _Name = ({ value, record }) => 
  <Col>
    <Text>{value}</Text>
    <Text note S>{toDate(record.createdDateTime)}</Text> {/* { TODO } */}
  </Col>
const _Percent = ({ value }) => <Text>{value * 100 + '%'}</Text>
const _Price = ({ value }) => <Text price>{toPrice(value)}</Text>
const _Volume = ({ value }) => <Text primary>{toPrice(value, 0)}</Text>
const _Cap = ({ value }) => <Text>{toPrice(value, 0)}</Text>
const ExpandCompoent = ({ record }) => 
  <Row spacingBottom={theme.spacingS} spacingTop={theme.spacingS}>
    <Col spacingLeft={theme.spacingXS} spacingRight={theme.spacingL}>
      <Image source={record.image} long />
    </Col>
    <Col spaceBetween flex={1}>
      <Row spaceBetween> 
        <Col>
          <Text XL wordSpaceL>{record.name}</Text>
          <Text note>{record.overview}</Text>
        </Col>
        <Image source={BookmarkIcon} S />
      </Row>
      <Row centerVertical spaceBetween>
        <Row>
          <Button label={record.numberOfComments} icon={CommentIcon} />
          <Button label={record.numberOfSub} icon={SubIcon} />
        </Row>
        <Button primary label={lang.trade[currentLang]} icon={TradeIcon} />
      </Row>
    </Col>
  </Row>
const TableName = [
  { label: '', value: 'icon', sortable: false, layoutStyle: { width: `calc( ${theme.iconSizeM} + 15px )`, center: true }, component: _Icon },
  { label: lang.home.table.name[currentLang], value: 'name', sortable: true, layoutStyle: { flex: 1, width: colWidth }, component: _Name },
  { label: lang.home.table.change[currentLang], value: 'changeAvg24h', sortable: true, layoutStyle: { width: colWidth }, component: _Percent },
  { label: lang.home.table.price[currentLang], value: 'price', sortable: true, layoutStyle: { width: colWidth }, component: _Price },
  { label: lang.home.table.volume[currentLang], value: 'volumeAvg24h', sortable: true, layoutStyle: { width: colWidth }, component: _Volume },
  { label: lang.home.table.cap[currentLang], value: 'pool', sortable: true, layoutStyle: { width: colWidth }, component: _Cap },
  { label: lang.home.table.graph[currentLang], value: 'priceIn7d', sortable: false, layoutStyle: { width: '200px' }, component: Text },
  { label: '', value: 'action', sortable: false, layoutStyle: { width: `calc( ${theme.iconSizeM} + 15px )`, right: true }, component: More },
]

const markets = [
  { id: '1', icon: FakeIcon, name: 'SMART', createdDateTime: 1553740797139, changeAvg24h: 0.18, price: 59.37, volumeAvg24h: 29002872, pool: 2682237283, priceIn7d: [ 40, 50, 45, 60, 57, 66, 70 ], overview: 'Your musical ideas into reality, using the one instrument you’ve been practising since birth— the voice.', image: FakeImage, numberOfComments: 2000, numberOfSub: 1000 },
  { id: '2', icon: FakeIcon, name: 'SMART', createdDateTime: 1553740797139, changeAvg24h: 0.18, price: 59.37, volumeAvg24h: 29002872, pool: 2682237283, priceIn7d: [ 40, 50, 45, 60, 57, 66, 70 ], overview: 'Let’s explain what is going on here.', image: FakeImage, numberOfComments: 2000, numberOfSub: 1000 },
  { id: '3', icon: FakeIcon, name: 'DUBLER STUDIO KIT', createdDateTime: 1553740797139, changeAvg24h: 0.18, price: 59.37, volumeAvg24h: 29002872, pool: 2682237283, priceIn7d: [ 40, 50, 45, 60, 57, 66, 70 ], overview: 'Let’s explain what is going on here.', image: FakeImage, numberOfComments: 2000, numberOfSub: 1000 },
  { id: '4', icon: FakeIcon, name: 'SMART', createdDateTime: 1553740797139, changeAvg24h: 0.18, price: 59.37, volumeAvg24h: 29002872, pool: 2682237283, priceIn7d: [ 40, 50, 45, 60, 57, 66, 70 ], overview: 'Let’s explain what is going on here.', image: FakeImage, numberOfComments: 2000, numberOfSub: 1000 },
  { id: '5', icon: FakeIcon, name: 'SMART', createdDateTime: 1553740797139, changeAvg24h: 0.18, price: 59.37, volumeAvg24h: 29002872, pool: 2682237283, priceIn7d: [ 40, 50, 45, 60, 57, 66, 70 ], overview: 'Let’s explain what is going on here.', image: FakeImage, numberOfComments: 2000, numberOfSub: 1000 },
  { id: '6', icon: FakeIcon, name: 'SMART', createdDateTime: 1553740797139, changeAvg24h: 0.18, price: 59.37, volumeAvg24h: 29002872, pool: 2682237283, priceIn7d: [ 40, 50, 45, 60, 57, 66, 70 ], overview: 'Let’s explain what is going on here.', image: FakeImage, numberOfComments: 2000, numberOfSub: 1000 },
  { id: '7', icon: FakeIcon, name: 'SMART', createdDateTime: 1553740797139, changeAvg24h: 0.18, price: 59.37, volumeAvg24h: 29002872, pool: 2682237283, priceIn7d: [ 40, 50, 45, 60, 57, 66, 70 ], overview: 'Let’s explain what is going on here.', image: FakeImage, numberOfComments: 2000, numberOfSub: 1000 },
  { id: '8', icon: FakeIcon, name: 'SMART', createdDateTime: 1553740797139, changeAvg24h: 0.18, price: 59.37, volumeAvg24h: 29002872, pool: 2682237283, priceIn7d: [ 40, 50, 45, 60, 57, 66, 70 ], overview: 'Let’s explain what is going on here.', image: FakeImage, numberOfComments: 2000, numberOfSub: 1000 },
  { id: '9', icon: FakeIcon, name: 'SMART', createdDateTime: 1553740797139, changeAvg24h: 0.18, price: 59.37, volumeAvg24h: 29002872, pool: 2682237283, priceIn7d: [ 40, 50, 45, 60, 57, 66, 70 ], overview: 'Let’s explain what is going on here.', image: FakeImage, numberOfComments: 2000, numberOfSub: 1000 },
  { id: '10', icon: FakeIcon, name: 'SMART', createdDateTime: 1553740797139, changeAvg24h: 0.18, price: 59.37, volumeAvg24h: 29002872, pool: 2682237283, priceIn7d: [ 40, 50, 45, 60, 57, 66, 70 ], overview: 'Let’s explain what is going on here.', image: FakeImage, numberOfComments: 2000, numberOfSub: 1000 },
  { id: '11', icon: FakeIcon, name: 'SMART', createdDateTime: 1553740797139, changeAvg24h: 0.18, price: 59.37, volumeAvg24h: 29002872, pool: 2682237283, priceIn7d: [ 40, 50, 45, 60, 57, 66, 70 ], overview: 'Let’s explain what is going on here.', image: FakeImage, numberOfComments: 2000, numberOfSub: 1000 },
  { id: '12', icon: FakeIcon, name: 'SMART', createdDateTime: 1553740797139, changeAvg24h: 0.18, price: 59.37, volumeAvg24h: 29002872, pool: 2682237283, priceIn7d: [ 40, 50, 45, 60, 57, 66, 70 ], overview: 'Let’s explain what is going on here.', image: FakeImage, numberOfComments: 2000, numberOfSub: 1000 },
  { id: '13', icon: FakeIcon, name: 'SMART', createdDateTime: 1553740797139, changeAvg24h: 0.18, price: 59.37, volumeAvg24h: 29002872, pool: 2682237283, priceIn7d: [ 40, 50, 45, 60, 57, 66, 70 ], overview: 'Let’s explain what is going on here.', image: FakeImage, numberOfComments: 2000, numberOfSub: 1000 },
  { id: '14', icon: FakeIcon, name: 'SMART', createdDateTime: 1553740797139, changeAvg24h: 0.18, price: 59.37, volumeAvg24h: 29002872, pool: 2682237283, priceIn7d: [ 40, 50, 45, 60, 57, 66, 70 ], overview: 'Let’s explain what is going on here.', image: FakeImage, numberOfComments: 2000, numberOfSub: 1000 },
  { id: '15', icon: FakeIcon, name: 'SMART', createdDateTime: 1553740797139, changeAvg24h: 0.18, price: 59.37, volumeAvg24h: 29002872, pool: 2682237283, priceIn7d: [ 40, 50, 45, 60, 57, 66, 70 ], overview: 'Let’s explain what is going on here.', image: FakeImage, numberOfComments: 2000, numberOfSub: 1000 },
]

export default () => {
  return (
    <Col>
      <Top flex={1} spaceBetween>
        <Tab activeTab={null} tabs={FILTERS} onClick={console.debug} type='simple' />
        <Row centerVertical>
          <Text spaceH={theme.spacingS} S>225 RESULTS</Text>
          <Text S>Search</Text>
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
  )  
}