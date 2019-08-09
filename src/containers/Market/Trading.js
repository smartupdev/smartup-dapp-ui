import React, { useEffect, useState } from 'react'

import { connect } from 'react-redux'
import { setTab, onChangeCT, onChangeSUT, onTrade, toggleIsSell, toggleTnc, reset, getTradeList, watchKline,getKlineList, getHighLowList,} from '../../actions/trade';
import { onClickTnc } from '../../actions/ipfs'

import theme from '../../theme'
import { Row, Col } from '../../components/Layout'
import Input, { Checkbox } from '../../components/Input'
import Table from '../../components/Table'
import { Trade, More } from '../../components/Icon'
import Text from '../../components/Text'
import Button from '../../components/Button'
import Hr from '../../components/Hr'
import Avatar from '../../components/Avatar'
import Expand from '../../components/Expand'
import ScrollLoader from '../../components/ScrollLoader'

import { useLang } from '../../language'
import { toPrice, toAgo, toFullDate } from '../../lib/util'

import styled from 'styled-components'

import Chart from './Chart'


const KlineMoreBox = styled(Col)`
  width: 200px;
  height: 30px;
  border-radius: 0 0 6px 6px;
  background-color: ${p => p.dump ? 'initial' : p.theme.bgColorDark};
  & > svg {
    fill: ${p => p.theme.colorSecondary}
  }
`

function TimeComponent({ value }) {
  const [{ time: { now, min, hour, day } }] = useLang()
  return <Text>{toAgo(value, now, min, hour, day)}</Text>
}

function Trading({ loggedIn, market, gettingMarket, tradeState, setTab, onChangeCT, onChangeSUT, toggleIsSell,watchKline, toggleTnc, onTrade, reset, userSut, getTradeList, getKlineList, getHighLowList }) {
  useEffect(() => {
    if(market) {
      getTradeList()
      getKlineList()
      getHighLowList()
      watchKline()
    }
    return reset
  }, [market])
  const [klineOpen, setKlineOpen] = useState(false)
  const { tabIndex, userCt, ct, sut, isSell, isTrading, trades, gettingTrades, hasNextPage, klineData,highLowData, agreeTnc, tradingError, sutError } = tradeState
  const [{ trading: tradingText, term, time: {months, weekdays} }] = useLang()
  const model = [
    { label: tradingText.table.buySell, value: 'type', layoutStyle: { flex: 1, center: true, width: '50px' }, component: ({ value }) => <Text red={value === 'sell'} green={value !== 'sell'}>{value === 'sell' ? tradingText.table.sell : tradingText.table.buy }</Text> },
    { label: tradingText.table.user, value: 'userAddress', layoutStyle: { flex: 1, width: '160px' }, component: ({ record }) => <Avatar icon={record.userIcon} username={record.username} /> },
    { label: tradingText.table.time, value: 'createTime', layoutStyle: { flex: 1, width: '80px', center: true }, component: TimeComponent },
    { label: tradingText.table.avgPrice, value: 'avgAmount', layoutStyle: { flex: 1, width: '80px', center: true }, component: ({ value }) => <Text>{toPrice(value)}</Text> },
    { label: tradingText.table.ct, value: 'ctAmount', layoutStyle: { flex: 1, width: '80px', center: true }, },
    { label: tradingText.table.stage, value: 'stage', layoutStyle: { flex: 1, width: '80px', center: true }, component: ({ value }) => <Text>{tradingText.table.stageValue[value] || value}</Text> },
  ]

  const klineTabs = [
    { label: tradingText.hour },
    { label: tradingText.day },
    { label: tradingText.week },
  ]
  if(!market || gettingMarket) return null

  const notEnoughSut = !isSell && +userSut < +sut && loggedIn
  const notEnoughCt = isSell && +ct > +userCt && loggedIn
  const [lang] = useLang()

  function KlineData() {
    return (
      <Col LeftXL RightL BottomL bgDark width={['100%', '250px']}>
        <Text nowrap BottomS>{toFullDate(Date.now(), weekdays, months)}</Text>

        <Row bottom spacingTopS>
          <Text XL>{toPrice(highLowData.length > 0 ? highLowData[highLowData.length - 1].low : '', 2)}</Text><Text red S>&nbsp;&nbsp;{lang.trading.low}</Text>
        </Row>
        <Row bottom>
          <Text XL>{toPrice(highLowData.length > 0 ? highLowData[highLowData.length - 1].high : '', 2)}</Text><Text green S>&nbsp;&nbsp;{lang.trading.high}</Text>
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

  return (
    <Col fitHeight>
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
          <KlineData />
        </Col>
      </Row>
      
      <Col hiddenDesktop relative>
        <Col absolute width='100%' BottomM center style={{ zIndex: 1 }}>
          <Expand isOpen={klineOpen} width='100%'>
            <KlineData />
          </Expand>
          <KlineMoreBox center centerVertical onClick={() => setKlineOpen(!klineOpen)}>
            <More S reverse={klineOpen} />
          </KlineMoreBox>
        </Col>
        <KlineMoreBox dump />
      </Col>

      <Col spacingLeftS spacingRightS spacingBottomS center>
        <Text spacingBottomS spacingTopS L center>{tradingText.tradeTitle}</Text>
        <Hr />

        <Row TopL>
          <Button onClick={isSell ? toggleIsSell : undefined} label={tradingText.table.buy} icon={Trade} backgroundColor={!isSell ? theme.green : undefined} color={isSell ? theme.green : undefined} width='100px' />
          <Button onClick={isSell ? undefined : toggleIsSell} label={tradingText.table.sell} icon={Trade} backgroundColor={isSell ? theme.red : undefined} color={!isSell ? theme.red : undefined} width='100px' MarginLeftS />
        </Row>

        <Text S center note VM>{tradingText.tradeText}</Text>

        <Col maxWidth='1000px' width='100%'>
          <Col center>
            <Row BottomL>
              <Avatar hiddenMobile icon={market.avatar} username={market.name} />
              <Col spacingLeftS>
                <Input background L center size='30' disabled={isTrading} value={ct} onChange={onChangeCT} number />
                {notEnoughCt && <Text error XS>{tradingText.needMoreCT}</Text>}
                {notEnoughSut && <Text error XS>{tradingText.needMoreSUT}</Text>}
                {sutError && <Text error XS>{sutError.message}</Text>}
                </Col>
            </Row>
          </Col>
          <Text S center note BottomM>{`${isSell ? tradingText.toReceive : tradingText.cost} ${sut ? (+sut).toFixed(4) : 0} SMARTUP`}</Text>


          <Row spaceBetween>
            <Row centerVertical>
              <Checkbox checked={agreeTnc} onChange={toggleTnc} disabled={isTrading} label={<Text S note lineHeight> {tradingText.agreeTo} </Text>} />
              <Text S note underline lineHeight onClick={onClickTnc}>{term}</Text>
            </Row>
            <Col right>
              <Button label= {tradingText.tradeButton} icon={Trade} primary onClick={() => onTrade(market.id)} disabled={isTrading || !agreeTnc || !ct | notEnoughSut || notEnoughCt} />
              {tradingError && <Text error XS>{tradingError.message}</Text>}
            </Col>
          </Row>

        </Col>

      </Col>
      <Hr />
      <Col spacingLeftM spacingRightM>
        <Text L center spacingBottomS spacingTopS>{tradingText.trans}</Text>
        <Hr />
        <Table
          model={model}
          values={trades}
          hasMore={hasNextPage} loadMore={() => getTradeList(true)} isLoading={gettingTrades} noResultText={tradingText.transactionRecord} 
        />
        {/* <ScrollLoader isButton/> */}
        {/* {
          (!trades || !trades.length) &&
          <>
            <Hr />
            <Col center spacingTopS spacingBottomL>
              <Text note>{tradingText.transactionRecord}</Text>
            </Col>
          </>
        } */}
      </Col>
    </Col>
  )
}

const mapStateToProps = state => ({
  tradeState: state.trade,
  market: state.market.currentMarket,
  gettingMarket: state.market.gettingMarket,
  userSut: state.user.sutBalance,
  loggedIn: state.user.loggedIn,
})


const mapDispatchToProps = {
  setTab,
  toggleIsSell,
  toggleTnc,
  onTrade,
  onChangeCT,
  onChangeSUT,
  reset,
  getTradeList,
  getKlineList,
  getHighLowList,
  watchKline,
};

export default connect(mapStateToProps, mapDispatchToProps)(Trading);