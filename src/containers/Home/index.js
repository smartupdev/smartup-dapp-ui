import React, { useEffect } from 'react'
import styled from 'styled-components'
import TableExpand from './TableExpand'
import Tab from '../../components/Tab'
import Table from '../../components/Table'
import { More } from '../../components/Icon'
import Text from '../../components/Text'
import SimpleLineChart from '../../components/SimpleLineChart'
import Avatar from '../../components/Avatar'
import { Row, Col } from '../../components/Layout'
import Search from '../../components/Search'
import lang, { currentLang } from '../../lang'
import theme from '../../theme'
import { toPrice, toDate, toAgo } from '../../lib/util'
import { connect } from 'react-redux'
import { setExpandedRecords, setActiveTab, onTableHeaderClick,onSearchChange,searchMarketClick } from '../../actions/home'
import { getDefaultMarketList } from '../../actions/market'

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

//TODO field match
const _Icon = ({ value }) => <Avatar icon={value} />
const _More = ({ isExpanded }) => <More reverse={isExpanded} XS color={theme.white} />
const _Name = ({ value, record }) =>
  <Col>
    <Text>{value}</Text>
    <Text note S>{toAgo(record.createTime)}</Text>
  </Col>
const _Percent = ({ value,record }) => <Text>{record.latelyChange ? record.latelyChange + '%' : '-'}</Text>
const _Price = ({ value,record }) => <Text price>{toPrice(record.last)}</Text>
const _Volume = ({ value,record }) => <Text primary>{toPrice(record.lately_volume, 0)}</Text>
const _Cap = ({ value,record }) => <Text>{toPrice(record.amount, 0)}</Text>
const TableName = [
  { label: '', value: 'avatar', sortable: false, layoutStyle: { width: `calc( ${theme.iconSizeM} + 15px )`, center: true }, component: _Icon },
  { label: lang.home.table.name[currentLang], value: 'name', sortable: true, layoutStyle: { flex: 1, width: colWidth }, component: _Name },
  { label: lang.home.table.change[currentLang], value: 'latelyChange', sortable: true, layoutStyle: { width: colWidth }, component: _Percent },
  { label: lang.home.table.price[currentLang], value: 'last', sortable: true, layoutStyle: { width: colWidth }, component: _Price },
  { label: lang.home.table.volume[currentLang], value: 'lately_volume', sortable: true, layoutStyle: { width: colWidth }, component: _Volume },
  { label: lang.home.table.cap[currentLang], value: 'amount', sortable: true, layoutStyle: { width: colWidth }, component: _Cap },
  { label: lang.home.table.graph[currentLang], value: 'priceIn7d', sortable: false, layoutStyle: { width: '200px', center: true }, component: SimpleLineChart },
  { label: '', value: 'action', sortable: false, layoutStyle: { width: `calc( ${theme.iconSizeM} + 15px )`, right: true }, component: _More },
]

const Home = ({ markets, expandedRecords, activeTabIndex, totalResults, sortBy, orderBy,searchContent,
  getDefaultMarketList,setExpandedRecords, setActiveTab, onTableHeaderClick, onSearchChange, searchMarketClick }) => {
  useEffect(() => {
    getDefaultMarketList()
  }, [])
  return (
    <Col>
      <Top flex={1} spaceBetween relative>
        <Tab activeIndex={activeTabIndex} tabs={FILTERS} onClick={setActiveTab} type='simple' />
        <Row centerVertical>
          <Text HS S note>{totalResults} RESULTS</Text>
          <Search backgroundColor={theme.bgColorLight} id='home' content={searchContent} onChange={onSearchChange} onSearchClick={searchMarketClick}/>
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
        expandCompoent={TableExpand}
      />
    </Col>
  )
}

const mapStateToProps = state => ({
  markets: state.market.markets,
  totalResults: state.market.totalResults,
  expandedRecords: state.home.expandedRecords,
  activeTabIndex: state.home.activeTabIndex,
  sortBy: state.home.sortBy,
  orderBy: state.home.orderBy,
  searchContent:state.home.searchContent,
});
const mapDispatchToProps = {
  setExpandedRecords,
  setActiveTab,
  onTableHeaderClick,
  getDefaultMarketList,
  onSearchChange,
  searchMarketClick,
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
