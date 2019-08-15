import React, { useState, useEffect } from 'react'
import Chart from './Chart'
import { Row, Col } from 'components/Layout'
import Text from 'components/Text'
import Expand from 'components/Expand'
import { More } from 'components/Icon'

import { toPrice, toAgo, toFullDate } from 'lib/util'
import { useLang } from 'language'

import styled from 'styled-components'

const KlineMoreBox = styled(Col)`
  width: 200px;
  height: 30px;
  border-radius: 0 0 6px 6px;
  background-color: ${p => p.dump ? 'initial' : p.theme.bgColorDark};
  & > svg {
    fill: ${p => p.theme.colorSecondary}
  }
`

function KlineData({ highLowData, market }) { // TODO: should get data directly from store
  const [{ trading: tradingText, time: { months, weekdays } }] = useLang()
  return (
    <Col LeftXL RightL BottomL bgDark width={['100%', '250px']}>
      <Text nowrap BottomS>{toFullDate(Date.now(), weekdays, months)}</Text>

      <Row bottom spacingTopS>
        <Text XL>{toPrice(highLowData.length > 0 ? highLowData[highLowData.length - 1].low : '', 2)}</Text><Text red S>&nbsp;&nbsp;{tradingText.low}</Text>
      </Row>
      <Row bottom>
        <Text XL>{toPrice(highLowData.length > 0 ? highLowData[highLowData.length - 1].high : '', 2)}</Text><Text green S>&nbsp;&nbsp;{tradingText.high}</Text>
      </Row>
      <Text note S>{tradingText.change}</Text>

      <Text XL price spacingTopS>{toPrice(market.last, 2)}</Text>
      <Text note S>{tradingText.price}</Text>

      <Text XL primary spacingTopS>{toPrice(highLowData.length > 0 ? highLowData[highLowData.length - 1].amount : '', 2)}</Text>
      <Text note S>{tradingText.volume}</Text>

      <Text XL spacingTopS>{toPrice(market.amount, 2)}</Text>
      <Text note S>{tradingText.cap}</Text>

      <Text XL spacingTopS>{toPrice(market.ctTopAmount, 2)}</Text>
      <Text note S>{tradingText.ct}</Text>
    </Col>
  )
}

export default ({ tabIndex, klineData, setTab, highLowData, market }) => { // TODO: should get data directly from store
  const [{ trading: tradingText }] = useLang()
  const klineTabs = [
    { label: tradingText.hour },
    { label: tradingText.day },
    { label: tradingText.week },
  ]
  const [klineOpen, setKlineOpen] = useState(false)
  // useEffect(() => {
  //   getKlineList()
  //   watchKline()
  //   getHighLowList()
  // }, [market])
  return (
    <>
      <Row TopXL BottomS LeftL bgDark>
        {klineTabs.map( ({ label }, index) =>
          <Col bgPrimary={index === tabIndex} bgSecondary={index !== tabIndex} key={label} HXS MarginLeftS borderRadius='2px' onClick={() => setTab(index)}>
            <Text lineHeight>{label}</Text>
          </Col>
        )}
      </Row>
      <Row bgDark HL BottomL>
        <Col flex={1}>
          <Chart data={klineData} />
        </Col>
        <Col hiddenMobile>
          <KlineData highLowData={highLowData} market={market} />
        </Col>
      </Row>
      
      <Col hiddenDesktop relative>
        <Col absolute width='100%' BottomM center style={{ zIndex: 1 }}>
          <Expand isOpen={klineOpen} width='100%'>
            <KlineData highLowData={highLowData} market={market} />
          </Expand>
          <KlineMoreBox center centerVertical onClick={() => setKlineOpen(!klineOpen)}>
            <More S reverse={klineOpen} />
          </KlineMoreBox>
        </Col>
        <KlineMoreBox dump />
      </Col>
    </>
  )
}