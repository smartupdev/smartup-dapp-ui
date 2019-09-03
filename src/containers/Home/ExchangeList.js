import React, { useEffect } from 'react'
import MarketTable from '../Market/Table'
import Text from '../../components/Text'
import { connect } from 'react-redux'
import * as Actions from '../../actions/home'

const ExchangeList = ({ 
  getting, getError, 
  hasNextPage,
  markets,
  sortBy, orderBy, expandedRecords,

  reset,
  onTableHeaderClick, 
  setExpandedRecords,
  getList,
 }) => {
  // useEffect(() => {
  //   getList()
  //   return reset
  // }, [])
  return getError ? 
    <Text error center S VS>{getError.message}</Text> 
  : <MarketTable
      onClickHeader={onTableHeaderClick}
      onClick={setExpandedRecords}
      markets={markets}
      sortBy={sortBy}
      orderBy={orderBy}
      expandedRecords={expandedRecords}

      hasMore={hasNextPage}
      loadMore={getList}
      isLoading={getting}
    />
}

const mapStateToProps = state => {
  const { 
    getting, getError, 
    hasNextPage,
    markets,
    sortBy, orderBy, expandedRecords,
  } = state.home
  return {
    getting, getError, 
    hasNextPage,
    markets,
    sortBy, orderBy, expandedRecords,
  }
}
const mapDispatchToProps = Actions

export default connect(mapStateToProps, mapDispatchToProps)(ExchangeList)
