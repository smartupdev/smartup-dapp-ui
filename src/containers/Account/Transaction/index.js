import React, { useState, useEffect } from 'react'
import styled, { css } from 'styled-components'
import theme from '../../../theme'

import { More } from '../../../components/Icon'
import { Row, Col } from '../../../components/Layout'
import Text from '../../../components/Text'
import Panel from '../../../components/Panel'
import Hr from '../../../components/Hr'
import Expand from '../../../components/Expand'

import { toFullDate, toToken } from '../../../lib/util'

import { connect } from 'react-redux'
import { getUserTransactionList, reset } from '../../../actions/personalCenter'


const typeHelper = {
  BuyCT:        { label: 'Trade placed (Buy)', title: (ct, sut) => `Bought ${ct} community token from ${toToken(sut)} SmartUp token` },
  SellCT:       { label: 'Trade placed (Sell)', title: (ct, sut) => `Sold ${ct} community token to ${toToken(sut)} SmartUp token` },
  CreateMarket: { label: 'Market created', title: (ct, sut) => `Paid ${sut} SmartUp token` },
}

const STAGE = {
  pending: 'pending',
  success: 'success',
  fail: 'fail',
}
 
function Transaction({ getUserTransactionList, transactions, reset }) {
  useEffect(() => {
    getUserTransactionList()
    return reset
  }, [])
  const [expands, setExpands] = useState([])
  return transactions.map( ({ 
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
            <Text note S>{toFullDate(createTime)}</Text>
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
            { label: 'Number of Community token', value: ct || 'N/A' },
            { label: 'Created on', value: toFullDate(createTime) },
            { label: 'Last update', value: toFullDate(blockTime) },
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
  })
}

const mapStateToProps = state => ({
  transactions: state.personalCenterMarket.transactions
});

const mapDispatchToProps = {
  getUserTransactionList, reset
}

export default connect(mapStateToProps, mapDispatchToProps)(Transaction);
