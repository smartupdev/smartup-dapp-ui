import React, { useState } from 'react'
import styled from 'styled-components'

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
import { toToken, toAgo, toFullDate } from '../../lib/util'

import Chart from './Chart'

import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { setActiveTab, setIsSell } from '../../actions/marketDetail';
import { onSell } from '../../actions/trade';

const model = [
  { label: lang.trading.table.buySell[currentLang], value: 'type', layoutStyle: { flex: 1, center: true }, component: ({value}) => <Text red={value === 'SELL'} green={value !== 'SELL'}>{value === 'SELL' ? lang.trading.table.sell[currentLang] : lang.trading.table.buy[currentLang]}</Text> },
  { label: lang.trading.table.user[currentLang], value: 'username', layoutStyle: { flex: 1, center: true }, component: ({record}) => <Row centerVertical><Avatar icon={record.userIcon}/><Text>{record.username}</Text></Row> },
  { label: lang.trading.table.time[currentLang], value: 'time', layoutStyle: { flex: 1, center: true }, component: ({value}) => <Text>{toAgo(value)}</Text> },
  { label: lang.trading.table.avgPrice[currentLang], value: 'avg', layoutStyle: { flex: 1, center: true }, component: ({value}) => <Text>{toToken(value)}</Text> },
  { label: lang.trading.table.ct[currentLang], value: 'ct', layoutStyle: { flex: 1, center: true }, },
]

const TABS = [
  { label: lang.marketTab.trade[currentLang], value: 'trading' },
  { label: lang.marketTab.general[currentLang], value: 'general' },
  { label: lang.marketTab.discussion[currentLang], value: 'discussion' },
  { label: lang.marketTab.proposal[currentLang], value: 'proposal' },
  { label: lang.marketTab.flag[currentLang], value: 'flag' },
]

const Market = ({ market, activeTabIndex, isSell, setActiveTab, setIsSell, onSell }) => {
  console.log(market)
  return (
    <Col>
      <Row spaceBetween spacingTopXS spacingBottomXS spacingRightS spacingLeftS color={theme.bgColorLight}>
        <Row centerVertical>
          <Avatar icon={market.icon} />
          <Text>{market.name}</Text>
        </Row>
        <Row centerVertical>
          <Button label={market.numberOfComments} icon={Comment} />
          <Button label={market.numberOfSub} icon={People} />
          <Share S color={theme.white} rightText onClick={() => console.log(market.id)} />
          <Bookmarked S onClick={() => console.log(market.id)} checked={market.following} />
        </Row>
      </Row>
      <Tab tabs={TABS} activeIndex={activeTabIndex} onClick={setActiveTab} width='100px' />
      <Row color={theme.bgColorDark} spacingLeftL spacingRightL spacingBottomL spacingTopL>
        <Col flex={1}>
          <Chart data={market.data} />
        </Col>
        <Col spacingLeftXL>
          <Col spacingBottomS>
            <Text nowrap>{toFullDate(Date.now())}</Text>
          </Col>

          <Col spacingTopS>
            <Row bottom>
              <Text XL>{toToken(market.price24hLow)}</Text>
              <Text red S>&nbsp;&nbsp;low</Text>
            </Row>
            <Row bottom>
              <Text XL>{toToken(market.price24hHigh)}</Text>
              <Text green S>&nbsp;&nbsp;high</Text>
            </Row>
            <Text note S>{lang.trading.change[currentLang]}</Text>
          </Col>

          <Col spacingTopS>
            <Text XL price>{toToken(market.price)}</Text>
            <Text note S>{lang.trading.price[currentLang]}</Text>
          </Col>

          <Col spacingTopS>
            <Text XL primary>{toToken(market.volumeAvg24h)}</Text>
            <Text note S>{lang.trading.volume[currentLang]}</Text>
          </Col>

          <Col spacingTopS>
            <Text XL>{toToken(market.pool)}</Text>
            <Text note S>{lang.trading.cap[currentLang]}</Text>
          </Col>

          <Col spacingTopS>
            <Text XL>{toToken(market.totalCt)}</Text>
            <Text note S>{lang.trading.ct[currentLang]}</Text>
          </Col>
        </Col>
      </Row>

      <Col spacingLeftS spacingRightS spacingBottomS center>
        <Col spacingBottomS spacingTopS>
          <Text L center>{lang.trading.tradeTitle[currentLang]}</Text>
        </Col>
        <Hr />

        <Col spacingTopXS spacingBottomS>
          <Text S center note>{lang.trading.tradeText[currentLang]}</Text>
          <Text S center note>61.75 SMARTUP  = 1 IDEA(832288)</Text>
        </Col>

        <Col maxWidth='1000px' width='100%'>
          <Row center spacingBottomL>
            <Avatar />
            <Col>
              <Text S note>{lang.trading[isSell ? 'tradeReceive' : 'tradePay'][currentLang]}</Text>
              <Text S>SMARTUP</Text>
            </Col>
            <Col spacingLeftS spacingTopS flex={1}>
              <Input underline L center fullWidth />
              {/* <Text error XS>You need more SmartUp to make this trade.</Text> */}
            </Col>
            <Col spacingLeftM spacingRightM>
              <Trade onClick={setIsSell} leftActive={isSell} rightActive={!isSell} />
            </Col>
            <Avatar icon={market.icon} />
            <Col>
              <Text S note>{lang.trading[isSell ? 'tradePay' : 'tradeReceive'][currentLang]}</Text>
              <Text S>{market.name}</Text>
            </Col>
            <Col spacingLeftS spacingTopS flex={1}>
              <Input underline L center fullWidth />
              {/* <Text error XS>You need more SmartUp to make this trade.</Text> */}
            </Col>
          </Row>

          <Row spaceBetween>
            <Row centerVertical>
              <Checkbox label={<Text S note lineHeight>Agree to&nbsp;</Text>} />
              <Text S note underline lineHeight onClick={() => console.log('Get T&C')}>{'Teams & Conditions'}</Text>
            </Row>
            <Botton label='Trade' icon={Trade} primary onClick={() => onSell(market.id, 10)} />
          </Row>

        </Col>

      </Col>
      <Hr />
      <Col spacingLeftM spacingRightM>
        <Col spacingBottomS spacingTopS>
          <Text L center>{lang.trading.trans[currentLang]}</Text>
        </Col>
        <Hr />
        <Table
          model={model}
          values={market.transations || []}
        />

      </Col>
    </Col>
  )
}

const ConnectMarket = ({ markets, activeTabIndex, isSell, setActiveTab, setIsSell, onSell, location }) => {
  const id = new URLSearchParams(location.search).get('id');
  return (
    <Market
      market={markets.find(m => m.id === id)}
      activeTabIndex={activeTabIndex}
      isSell={isSell}
      setActiveTab={setActiveTab}
      setIsSell={setIsSell}
      onSell={onSell} />
  )
}

const mapStateToProps = state => ({
  markets: state.market.markets,
  activeTabIndex: state.marketDetail.activeTabIndex,
  isSell: state.marketDetail.isSell,
});

const mapDispatchToProps = {
  setIsSell,
  setActiveTab,
  onSell
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ConnectMarket));