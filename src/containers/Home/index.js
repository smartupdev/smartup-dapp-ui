import React, { useEffect } from 'react'
import styled from 'styled-components'
import MarketTable from '../Market/Table'
import Tab from '../../components/Tab'
import Text from '../../components/Text'
import { Row, Col } from '../../components/Layout'
import Search from '../../components/Search'
import lang, { currentLang } from '../../lang'
import theme from '../../theme'
import { connect } from 'react-redux'
import { setExpandedRecords, setActiveTab, onTableHeaderClick,onSearchChange,searchMarketClick,moreMarketClick } from '../../actions/home'
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

const Home = ({ markets, expandedRecords, activeTabIndex, totalResults, sortBy, orderBy,searchContent,hasNextPage,
  getDefaultMarketList,setExpandedRecords, setActiveTab, onTableHeaderClick, onSearchChange, searchMarketClick,moreMarketClick }) => {
  useEffect(() => {
    getDefaultMarketList()
  }, [])
  return (
    <Col>
      <Top flex={1} spaceBetween relative>
        <Tab activeIndex={activeTabIndex} tabs={FILTERS} onClick={setActiveTab} type='simple' />
        <Row centerVertical>
          <Text HS S note>{totalResults} RESULTS</Text>
          <Search backgroundColor={theme.bgColorLight} id='home' content={searchContent} onChange={onSearchChange} onSearch={searchMarketClick}/>
        </Row>
      </Top>
      <MarketTable 
        onClickHeader={onTableHeaderClick}
        onClick={setExpandedRecords}
        markets={markets}
        sortBy={sortBy}
        orderBy={orderBy}
        expandedRecords={expandedRecords}
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
  hasNextPage: state.market.hasNextPage,
});
const mapDispatchToProps = {
  setExpandedRecords,
  setActiveTab,
  onTableHeaderClick,
  getDefaultMarketList,
  onSearchChange,
  searchMarketClick,
  moreMarketClick,
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
