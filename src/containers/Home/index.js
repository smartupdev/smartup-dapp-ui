import React, { useEffect } from 'react'
import styled from 'styled-components'
import MarketTable from '../Market/Table'
import Tab from '../../components/Tab'
import Text from '../../components/Text'
import ScrollLoader from '../../components/ScrollLoader'
import { Row, Col } from '../../components/Layout'
import Search from '../../components/Search'
// import lang, { currentLang } from '../../lang'
import theme from '../../theme'
import { useLang } from '../../language'
import { connect } from 'react-redux'
import { reset, setExpandedRecords, setActiveTab, onTableHeaderClick, onSearchChange } from '../../actions/home'
import { getList } from '../../actions/market'

const Top = styled(Row)`
  padding: 0 ${p => p.theme.spacingXS}
  background-color: ${p => p.theme.bgColorLight}
`


const Home = ({ 
  markets, 
  totalResults, 
  gettingMarketList,

  sortBy, orderBy, 
  hasNextPage,

  onTableHeaderClick, 
  // moreMarketClick,

  expandedRecords, setExpandedRecords,
  activeTabIndex, setActiveTab,
  searchContent, onSearchChange, 

  reset,
  getList,
 }) => {
  useEffect(() => {
    getList()
    return reset
  }, [])

  const filteredMarket = markets.filter(m => activeTabIndex ? m.name.toLowerCase().includes(searchContent.toLowerCase()) : true )
  const [lang] = useLang()
  const FILTERS = [
    { label: lang.home.tab.all, value: null },
    { label: lang.home.tab.hot, value: 'hottest' },
    { label: lang.home.tab.new, value: 'newest' },
    { label: lang.home.tab.pop, value: 'populous' },
    { label: lang.home.tab.rich, value: 'richest' },
  ]
  return (
    <Col>
      <Top flex={1} spaceBetween relative>
        <Tab activeIndex={activeTabIndex} tabs={FILTERS} onClick={setActiveTab} type='simple' />
        <Row centerVertical>
          <Text HS S note>{activeTabIndex ? filteredMarket.length : totalResults} {lang.result}</Text>
          <Search backgroundColor={theme.bgColorLight} id='home' value={searchContent} onChange={onSearchChange} onSearch={() => getList()} />
        </Row>
      </Top>
      <MarketTable
        autoHeight
        onClickHeader={onTableHeaderClick}
        onClick={setExpandedRecords}
        markets={filteredMarket}
        sortBy={sortBy}
        orderBy={orderBy}
        expandedRecords={expandedRecords}
      />
      <ScrollLoader id='Home-Table' hasMore={hasNextPage} loadMore={getList} isLoading={gettingMarketList} isButton />
    </Col>
  )
}

const mapStateToProps = state => ({
  markets: state.home.markets,
  gettingMarketList: state.home.gettingMarketList,
  marketListError: state.home.marketListError,
  totalResults: state.home.totalResults,
  pageSize: state.home.pageSize,
  pageNumb: state.home.pageNumb,
  hasNextPage: state.home.hasNextPage,

  expandedRecords: state.home.expandedRecords,
  activeTabIndex: state.home.activeTabIndex,
  sortBy: state.home.sortBy,
  orderBy: state.home.orderBy,
  searchContent: state.home.searchContent,
});
const mapDispatchToProps = {
  reset,
  getList,
  setExpandedRecords,
  setActiveTab,
  onTableHeaderClick,
  onSearchChange,
  // moreMarketClick,
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
