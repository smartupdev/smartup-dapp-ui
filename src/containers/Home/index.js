import React, { useEffect } from 'react'
import styled from 'styled-components'

import MarketTable from '../Market/Table'
import Tab from '../../components/Tab'
import Text from '../../components/Text'
import { Row, Col } from '../../components/Layout'
import Search from '../../components/Search'
import { Dropdown } from '../../components/Input'
// import lang, { currentLang } from '../../lang'
import theme from '../../theme'
import { useLang } from '../../language'
import { connect } from 'react-redux'
import * as Actions from '../../actions/home'

import { MARKET_FILTER_TYPE as MFT, MARKET_STAGE as MS } from '../../integrator'

import ExchangeList from './ExchangeList'
import OfferingList from './OfferingList'

const Box = styled(Col)`max-height: 100%`

const Home = ({ 
  home: {
    count,
    filterType, marketStage,

    searchContent,
  },

  reset,
  onTableHeaderClick, 
  setExpandedRecords,
  onChangeFilter, onChangeStage,
  onSearchChange, 
  getList,
 }) => {
  useEffect(() => {
    getList()
    return reset
  }, [])

  const [{ result: resultText, api: { marketFilterType: filterText, marketStage: marketStageText } }] = useLang()
  const filterOptions = [
    { label: filterText[MFT.all], value: MFT.all },
    { label: filterText[MFT.hot], value: MFT.hot },
    { label: filterText[MFT.new], value: MFT.new },
    { label: filterText[MFT.pop], value: MFT.pop },
    { label: filterText[MFT.rich], value: MFT.rich },
  ]
  const marketStageOptions = [
    { label: marketStageText[MS.offering], value: MS.offering },
    { label: marketStageText[MS.exchange], value: MS.exchange },
    { label: marketStageText[MS.closed], value: MS.closed },
  ]  
  const filterIndex = filterOptions.findIndex(f => f.value === filterType)
  const marketStageIndex = marketStageOptions.findIndex(f => f.value === marketStage)
  return (
    <Box>
      <Row centerVertical spaceBetween relative flex={1} customBgColor={[theme.bgColor, theme.bgColorLight]}>
        <Row>
          <Dropdown options={marketStageOptions} selectedIndex={marketStageIndex} onChange={onChangeStage} />
          <Dropdown options={filterOptions} selectedIndex={filterIndex} onChange={onChangeFilter} />
        </Row>
        <Row centerVertical spaceBetween>
          <Text S note nowrap>{count} {resultText}</Text>
          <Search customBgColor={[theme.bgColor, theme.bgColorLight]} value={searchContent} onChange={onSearchChange} onSearch={() => getList()} />
        </Row>
      </Row>
      {
        marketStage === MS.exchange ?
        <ExchangeList /> :
        <OfferingList />
      }
    </Box>
  )
}

const mapStateToProps = state => ({
  home: state.home
})
const mapDispatchToProps = Actions

export default connect(mapStateToProps, mapDispatchToProps)(Home)
