import React, { useState, useEffect } from 'react'
// import styled, { css } from 'styled-components'
import theme from '../../../theme'
import { getUrlParams } from '../../../routes'

import { More } from '../../../components/Icon'
import { Row, Col } from '../../../components/Layout'
import Text from '../../../components/Text'
// import Panel from '../../../components/Panel'
import Hr from '../../../components/Hr'
import Expand from '../../../components/Expand'

import ScrollLoader from '../../../components/ScrollLoader'

import { toFullDate } from '../../../lib/util'
import { useLang } from '../../../language'

import { connect } from 'react-redux'
import { getUserTransactionList, reset } from '../../../actions/personalCenter'
import {ENV} from '../../../config'

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
  function onClickExpand(index) {
    const newExpands = [...expands]
    newExpands[index] = !newExpands[index] 
    setExpands(newExpands)
  }
  const [{ time: { weekdays, months }, personalCentre: { inTransaction } }] = useLang()
  const txHash = getUrlParams().txHash
  useEffect(() => {
    if(transactions.length) {
      const findIndex = transactions.findIndex( t => t.txHash === txHash )
      if(findIndex >= 0 && !expands[findIndex]) onClickExpand(findIndex)
    }
  }, [txHash, transactions])
  return (
    <>
      {error && <Text TopS center error>{error.message}</Text>}
      {transactions.map( ({
        txHash, type, detail: {ct, sut, eth, initSut}, marketName, marketAddress, createTime, stage, blockTime
      }, index) => {
        return (
          <Col key={txHash} fitHeight>
            <Row spacingM fitHeight onClick={() => onClickExpand(index)}>
              <Col flex={1}>
                <Text BottomS L>{inTransaction.typeTitle[type](ct, sut || initSut, eth)}</Text>
                <Text BottomXS note>{marketName}</Text>
                <Text note S>{toFullDate(createTime, weekdays, months)}</Text>
              </Col>
              <Col spaceBetween right>
                <Text S green={stage===STAGE.success} red={stage===STAGE.fail} primary={stage===STAGE.pending}>{inTransaction[stage]}</Text>
                <More color='#ffffff' XS reverse={expands[index]} />
              </Col>
            </Row>
            <Expand isOpen={expands[index]}>
              <Col backgroundColor={theme.bgColorDark} HL VM>
              {[
                { label: inTransaction.txhash, value: txHash, onClick: () => window.open(ENV.txHashUrl + txHash) },
                { label: inTransaction.type, value: inTransaction.typeLabel[type] },
                { label: inTransaction.market, value: marketName ? `${marketName} ${marketAddress}` : 'N/A' },
                { label: inTransaction.ct, value: ct || 'N/A' },
                { label: inTransaction.createTime, value: toFullDate(createTime, weekdays, months) },
                { label: inTransaction.lastUpdate, value: toFullDate(blockTime, weekdays, months) },
              ].map( ({label, value, onClick}) => 
                <Row key={label} VXS onClick={onClick}>
                  <Text width={['30%', '250px']}>{label}</Text>
                  <Text underline={onClick}>{value}</Text>
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
