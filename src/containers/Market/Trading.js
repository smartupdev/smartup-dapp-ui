import React, { useEffect } from 'react'
import { Link } from '../../routes'

import { connect } from 'react-redux'
import { setTab, onChangeCT, onChangeSUT, onTrade, toggleIsSell, toggleTnc, reset, getTradeList, getKlineList, } from '../../actions/trade';


import theme from '../../theme'
import { Row, Col } from '../../components/Layout'
import Input, { Checkbox } from '../../components/Input'
import Tab from '../../components/Tab'
import Table from '../../components/Table'
import Icon, { Comment, Trade, People, More, Bookmarked, Share } from '../../components/Icon'
import Image from '../../components/Image'
import Text from '../../components/Text'
import Button from '../../components/Button'
import Hr from '../../components/Hr'
import Avatar from '../../components/Avatar'
import Botton from '../../components/Button'

import lang, { currentLang } from '../../lang'
import { toToken, toAgo, toFullDate, shorten } from '../../lib/util'

import Chart from './Chart'

const model = [
  { label: lang.trading.table.buySell[currentLang], value: 'type', layoutStyle: { flex: 1, center: true }, component: ({ value }) => <Text red={value === 'sell'} green={value !== 'sell'}>{value === 'sell' ? lang.trading.table.sell[currentLang] : lang.trading.table.buy[currentLang]}</Text> },
  { label: lang.trading.table.user[currentLang], value: 'userAddress', layoutStyle: { flex: 1 }, component: ({ record }) => <Row centerVertical><Avatar icon={record.userIcon} /><Text>{shorten(record.username)}</Text></Row> },
  { label: lang.trading.table.time[currentLang], value: 'createTime', layoutStyle: { flex: 1, center: true }, component: ({ value }) => <Text>{toAgo(value)}</Text> },
  { label: lang.trading.table.avgPrice[currentLang], value: 'avgAmount', layoutStyle: { flex: 1, center: true }, component: ({ value }) => <Text>{toToken(value)}</Text> },
  { label: lang.trading.table.ct[currentLang], value: 'ctAmount', layoutStyle: { flex: 1, center: true }, },
]

const klineTabs = [
  { label: '1hour' },
  { label: '1day' },
  { label: '1week' },
]

function Trading({ market, gettingMarket, tradeState, setTab, onChangeCT, onChangeSUT, toggleIsSell, toggleTnc, onTrade, reset, userSut, getTradeList, getKlineList }) {
  useEffect(() => {
    if(market) {
      getTradeList()
      getKlineList()
    }
    return reset
  }, [market])
  const { tabIndex, ct, sut, isSell, isTrading, trades, klineData, agreeTnc, tradingError } = tradeState
  const sutError = +userSut < +sut ? 'You need more SmartUp to make this trade.' : null

  if(!market || gettingMarket) return null

  return (
    <>
      <Row TopXL BottomS LeftL color={theme.bgColorDark}>
        {klineTabs.map( ({ label }, index) =>
          <Col primary={index === tabIndex} secondary={index !== tabIndex} key={label} HXS MarginLeftS onClick={() => setTab(index)}>
            <Text lineHeight>{label}</Text>
          </Col>
        )}
      </Row>
      <Row color={theme.bgColorDark} spacingLeftL spacingRightL spacingBottomL>
        <Col flex={1} spacingRightL>
          <Chart data={klineData} />
        </Col>
        <Col spacingLeftXL spacingRightL>
          <Text nowrap spacingBottomS>{toFullDate(Date.now())}</Text>

          <Row bottom spacingTopS>
            <Text XL>{toToken(klineData.length > 0 ? klineData[klineData.length - 1].low : '', 2)}</Text><Text red S>&nbsp;&nbsp;low</Text>
          </Row>
          <Row bottom>
            <Text XL>{toToken(klineData.length > 0 ? klineData[klineData.length - 1].high : '', 2)}</Text><Text green S>&nbsp;&nbsp;high</Text>
          </Row>
          <Text note S>{lang.trading.change[currentLang]}</Text>

          <Text XL price spacingTopS>{toToken(market.last, 2)}</Text>
          <Text note S>{lang.trading.price[currentLang]}</Text>

          <Text XL primary spacingTopS>{toToken(market.ctAmount, 2)}</Text>
          <Text note S>{lang.trading.volume[currentLang]}</Text>

          <Text XL spacingTopS>{toToken(market.amount, 2)}</Text>
          <Text note S>{lang.trading.cap[currentLang]}</Text>

          <Text XL spacingTopS>{toToken(market.ctTopAmount, 2)}</Text>
          <Text note S>{lang.trading.ct[currentLang]}</Text>
        </Col>
      </Row>

      <Col spacingLeftS spacingRightS spacingBottomS center>
        <Text spacingBottomS spacingTopS L center>{lang.trading.tradeTitle[currentLang]}</Text>
        <Hr />

        <Col spacingTopXS spacingBottomL>
          <Text S center note>{lang.trading.tradeText[currentLang]}</Text>
          <Text S center note>1,127 SMARTUP  = 1 IDEA(832288)</Text>
        </Col>

        <Col maxWidth='1000px' width='100%'>
          <Row center spacingBottomL>
            <Avatar />
            <Col>
              <Text S note>{lang.trading[isSell ? 'tradeReceive' : 'tradePay'][currentLang]}</Text>
              <Text S>SMARTUP</Text>
            </Col>
            <Col spacingLeftS spacingTopS flex={1}>
              <Input underline L center fullWidth disabled={true} value={sut && (+sut).toFixed(4)} onChange={e => onChangeSUT(e.target.value)} number />
              {sutError && <Text error XS>{sutError}</Text>}
            </Col>
            <Trade disabled={isTrading} spacingLeftM spacingRightM onClick={toggleIsSell} leftActive={isSell} rightActive={!isSell} />
            <Avatar icon={market.icon} />
            <Col>
              <Text S note>{lang.trading[isSell ? 'tradePay' : 'tradeReceive'][currentLang]}</Text>
              <Text S>{market.name}</Text>
            </Col>
            <Col spacingLeftS spacingTopS flex={1}>
              <Input underline L center fullWidth disabled={isTrading} value={ct} onChange={e => onChangeCT(e.target.value)} number />
              {/* <Text error XS>You need more SmartUp to make this trade.</Text> */}
            </Col>
          </Row>

          <Row spaceBetween>
            <Row centerVertical>
              <Checkbox checked={agreeTnc} onChange={toggleTnc} disabled={isTrading} label={<Text S note lineHeight>Agree to&nbsp;</Text>} />
              <Text S note underline lineHeight onClick={() => console.log('Get T&C')}>{'Teams & Conditions'}</Text>
            </Row>
            <Col right>
              <Botton label='Trade' icon={Trade} primary onClick={() => onTrade(market.id)} disabled={isTrading || !agreeTnc || !ct | !!sutError} />
              {tradingError && <Text error XS>{tradingError.message}</Text>}
            </Col>
          </Row>

        </Col>

      </Col>
      <Hr />
      <Col spacingLeftM spacingRightM>
        <Text L center spacingBottomS spacingTopS>{lang.trading.trans[currentLang]}</Text>
        <Hr />
        <Table
          model={model}
          values={trades || []}
        />
        {
          (!trades || !trades.length) &&
          <>
            <Hr />
            <Col center spacingTopS spacingBottomL>
              <Text note>Transaction record will be available after the first transaction made</Text>
            </Col>
          </>
        }
      </Col>
    </>
  )
}

const mapStateToProps = state => ({
  tradeState: state.trade,
  market: state.market.currentMarket,
  gettingMarket: state.market.gettingMarket,
  userSut: state.user.sutBalance,
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
};

export default connect(mapStateToProps, mapDispatchToProps)(Trading);