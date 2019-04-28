import React, { useState } from 'react'
import styled, { css } from 'styled-components'
import theme from '../../../theme'

import { More } from '../../../components/Icon'
import { Row, Col } from '../../../components/Layout'
import Text from '../../../components/Text'
import Panel from '../../../components/Panel'
import Hr from '../../../components/Hr'
import Expand from '../../../components/Expand'
import { toFullDate } from '../../../lib/util'

const marketAddress = '0xb822B98e02397e9F1dD4C6237e63257dd1f7C4'
const marketName = 'DUBLER STUDIO KIT'
const hxHash = '0xb822B98e02397e9F1dD4C6237e63257dd1f7C4'
const marketId = '2halepvlo1s'
const transitions = [
  { hxHash: hxHash+1, stage: 'pending', type: 'BuyCT', detail: {sut: 30, ct: 10}, marketId, marketAddress, marketName, createTime: 1556421940664, blockTime: 1456421940664 },
  { hxHash: hxHash+2, stage: 'success', type: 'BuyCT', detail: {sut: 34, ct: 10}, marketId, marketAddress, marketName, createTime: 1556421940664, blockTime: 1456421940664 },
  { hxHash: hxHash+3, stage: 'fail', type: 'BuyCT', detail: {sut: 39, ct: 11}, marketId, marketAddress, marketName, createTime: 1556421940664, blockTime: 1456421940664 },
  { hxHash: hxHash+4, stage: 'pending', type: 'SellCT', detail: {sut: 30, ct: 10}, marketId, marketAddress, marketName, createTime: 1556421940664, blockTime: 1456421940664 },
  { hxHash: hxHash+5, stage: 'success', type: 'SellCT', detail: {sut: 34, ct: 10}, marketId, marketAddress, marketName, createTime: 1556421940664, blockTime: 1456421940664 },
  { hxHash: hxHash+6, stage: 'fail', type: 'SellCT', detail: {ct: 11}, marketId, marketAddress, createTime: marketName, createTime: 1556421940664, blockTime: 1456421940664 },
  { hxHash: hxHash+7, stage: 'pending', type: 'CreateMarket', detail: {sut: 30}, marketId, marketAddress, marketName, createTime: 1556421940664, blockTime: 1456421940664 },
  { hxHash: hxHash+8, stage: 'success', type: 'CreateMarket', detail: {sut: 34}, marketId, marketAddress, marketName, createTime: 1556421940664, blockTime: 1456421940664 },
  { hxHash: hxHash+9, stage: 'fail', type: 'CreateMarket', detail: {sut: 11}, marketId, marketAddress, marketName, createTime: 1556421940664, blockTime: 1456421940664 },
]

const STAGE = {
  pending: 'pending',
  success: 'success',
  fail: 'fail',
}
 
export default () => {
  const [expands, setExpands] = useState([])
  return transitions.map( ({ 
    hxHash, type, detail, marketName, createTime, stage, blockTime
  }, index) => {
    function onClick() {
      const newExpands = [...expands]
      newExpands[index] = !newExpands[index] 
      setExpands(newExpands)
    }
    return (
      <Col key={hxHash} fitHeight onClick={onClick}>
        <Row spacingM fitHeight>
          <Col flex={1}>
            <Text BottomS L>{`${type} ${detail.ct} CT OF YES AT ${detail.sut} SUT`}</Text>
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
            { label: 'HXHASH', value: hxHash },
            { label: 'TYPE', value: type },
            { label: 'OUTCOME', value: '?????' },
            { label: 'SHARES', value: '????' },
            { label: 'PRICE', value: '????' },
            { label: 'FEE', value: '????' },
            { label: 'TIMESTAMP', value: toFullDate(blockTime) },
          ].map( ({label, value}) => 
            <Row key={label} VXS>
              <Text width='150px'>{label}</Text>
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