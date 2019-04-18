import React from 'react'
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
import { toPrice, toDate } from '../../lib/util'
import { connect } from 'react-redux'
import { setExpandedRecords, setActiveTab, onTableHeaderClick } from '../../actions/home'

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

const _Icon = ({ value }) => <Avatar icon={value} />
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

const Home = ({ markets, expandedRecords, activeTab, totalResults, sortBy, orderBy,
  setExpandedRecords, setActiveTab, onTableHeaderClick }) => {
  return (
    <Col>
      <Top flex={1} spaceBetween relative>
        <Tab activeTab={activeTab} tabs={FILTERS} onClick={setActiveTab} type='simple' />
        <Row centerVertical>
          <Text HS S note>{totalResults} RESULTS</Text>
          <Search backgroundColor={theme.bgColorLight} id='home' />
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
  activeTab: state.home.activeTab,
  sortBy: state.home.sortBy,
  orderBy: state.home.orderBy,
});
const mapDispatchToProps = {
  setExpandedRecords,
  setActiveTab,
  onTableHeaderClick,
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
