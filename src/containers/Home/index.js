import React from 'react'
import styled from 'styled-components'
import Tab from '../../components/Tab'
import Table from '../../components/Table'
import Icon, { Comment, Trade, People, More, Bookmarked, BookmarkedOutline } from '../../components/Icon'
import Image from '../../components/Image'
import Text from '../../components/Text'
import Button from '../../components/Button'
import SimpleLineChart from '../../components/SimpleLineChart'
import { Row, Col } from '../../components/Layout'
import lang, { currentLang } from '../../lang'
import theme from '../../theme'
import { toPrice, toDate } from '../../lib/util'
import { connect } from 'react-redux'
import { setExpandedRecords,setActiveTab,onTableHeaderClick } from '../../actions/home'

import BookmarkIcon from '../../images/033-star.svg'

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

const _Icon = ({ value }) => value ? <Image source={value} /> : <People color={theme.white} round />
const _More = ({ isExpanded }) => <More reverse={isExpanded} XS color={theme.white} />
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
      <Image source={record.image} photo />
    </Col>
    <Col spaceBetween flex={1}>
      <Row spaceBetween> 
        <Col>
          <Text XL wordSpaceL>{record.name}</Text>
          <Text note>{record.overview}</Text>
        </Col>
        {record.following ? 
          <Bookmarked S primary onClick={() => console.log(record.id)} /> :
          <BookmarkedOutline S color={theme.white} onClick={() => console.log(record.id)} />
        }
      </Row>
      <Row centerVertical spaceBetween>
        <Row>
          <Button label={record.numberOfComments} icon={Comment} />
          <Button label={record.numberOfSub} icon={People} />
        </Row>
        <Button primary label={lang.trade[currentLang]} icon={Trade} />
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
  { label: lang.home.table.graph[currentLang], value: 'priceIn7d', sortable: false, layoutStyle: { width: '200px', center: true }, component: SimpleLineChart },
  { label: '', value: 'action', sortable: false, layoutStyle: { width: `calc( ${theme.iconSizeM} + 15px )`, right: true }, component: _More },
]

const Home = ({ markets,expandedRecords,activeTab,totalResults,sortBy,orderBy,
  setExpandedRecords,setActiveTab,onTableHeaderClick }) => {
  return (
    <Col>
      <Top flex={1} spaceBetween>
        <Tab activeTab={activeTab} tabs={FILTERS} onClick={setActiveTab} type='simple' />
        <Row centerVertical>
          <Text spaceH={theme.spacingS} S>{totalResults} RESULTS</Text>
          <Text S>Search</Text>
        </Row>
      </Top>
      <Table 
        S
        inset
        minWidth={'1000px'}
        onClickHeader={onTableHeaderClick}
        onClick={setExpandedRecords}
        model={TableName} 
        values={markets} 
        sortBy={sortBy} 
        orderBy={orderBy}
        expandedRecords={expandedRecords}
        expandCompoent={ExpandCompoent}
        />
    </Col>
  )  
}

const mapStateToProps = state => ({
  markets: state.home.markets,
  expandedRecords: state.home.expandedRecords,
  activeTab:state.home.activeTab,
  totalResults:state.home.totalResults,
  sortBy: state.home.sortBy,
  orderBy: state.home.orderBy,
});
const mapDispatchToProps = {
  setExpandedRecords,
  setActiveTab,
  onTableHeaderClick,
}

export default connect(mapStateToProps,mapDispatchToProps)(Home);
