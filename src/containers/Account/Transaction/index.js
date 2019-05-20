import React, { useState, useEffect } from 'react'
// import styled, { css } from 'styled-components'
import theme from '../../../theme'

import { More } from '../../../components/Icon'
import { Row, Col } from '../../../components/Layout'
import Text from '../../../components/Text'
// import Panel from '../../../components/Panel'
import Hr from '../../../components/Hr'
import Expand from '../../../components/Expand'

import ScrollLoader from '../../../components/ScrollLoader'

import { toFullDate, toToken } from '../../../lib/util'
import { useLang } from '../../../language'

import { connect } from 'react-redux'
import { getUserTransactionList, reset } from '../../../actions/personalCenter'


const typeHelper = {
  BuyCT:        { label: 'Trade placed (Buy)', title: (ct, sut) => `Bought ${ct} market token from ${toToken(sut)} SmartUp token` },
  SellCT:       { label: 'Trade placed (Sell)', title: (ct, sut) => `Sold ${ct} market token to ${toToken(sut)} SmartUp token` },
  CreateMarket: { label: 'Market created', title: (ct, sut) => `Paid ${sut} SmartUp token` },
}

const STAGE = {
  pending: 'pending',
  success: 'success',
  fail: 'fail',
}
 
function Transaction({ 
  getUserTransactionList, reset, 
  userTransaction: {
    transactions,
    getting,
    error,
    hasNextPage,
  } 
}) {
  useEffect(() => {
    getUserTransactionList()
    return reset
  }, [])
  const [expands, setExpands] = useState([])
  const [{ time: { weekdays, months } }] = useLang()
  return (
    <>
      {error && <Text TopS center error>{error.message}</Text>}
      {transactions.map( ({ 
        txHash, type, detail: {ct, sut}, marketName, marketAddress, createTime, stage, blockTime
      }, index) => {
        function onClick() {
          const newExpands = [...expands]
          newExpands[index] = !newExpands[index] 
          setExpands(newExpands)
        }
        return (
          <Col key={txHash} fitHeight>
            <Row spacingM fitHeight onClick={onClick}>
              <Col flex={1}>
                <Text BottomS L>{typeHelper[type].title(ct, sut)}</Text>
                <Text BottomXS note>{marketName}</Text>
                <Text note S>{toFullDate(createTime, weekdays, months)}</Text>
              </Col>
              <Col spaceBetween right>
                <Text S green={stage===STAGE.success} red={stage===STAGE.fail} primary={stage===STAGE.pending}>{stage.toUpperCase()}</Text>
                <More color='#ffffff' XS reverse={expands[index]} />
              </Col>
            </Row>
            <Expand isOpen={expands[index]}>
              <Col backgroundColor={theme.bgColorDark} HL VM>
              {[
                { label: 'TXHASH', value: txHash },
                { label: 'Type', value: typeHelper[type].label },
                { label: 'Market', value: `${marketName} ${marketAddress}` },
                { label: 'Number of market token', value: ct || 'N/A' },
                { label: 'Created on', value: toFullDate(createTime, weekdays, months) },
                { label: 'Last update', value: toFullDate(blockTime, weekdays, months) },
              ].map( ({label, value}) => 
                <Row key={label} VXS>
                  <Text width='250px'>{label}</Text>
                  <Text>{value}</Text>
                </Row>
              )}
              </Col>
            </Expand>
            <Hr />
          </Col>
        )
      })}
      <ScrollLoader isButton loadMore={getUserTransactionList} hasMore={hasNextPage} isLoading={getting} />
    </>    
  )
}

const mapStateToProps = state => ({
  userTransaction: state.userTransaction,
});

const mapDispatchToProps = {
  getUserTransactionList, reset
}

export default connect(mapStateToProps, mapDispatchToProps)(Transaction);
