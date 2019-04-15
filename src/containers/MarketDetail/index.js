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
import { toToken, toAgo } from '../../lib/util'

import Chart from './Chart'

import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { setActiveTab, setIsSell } from '../../actions/marketDetail';

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

const Market = ({ market, activeTabIndex, isSell, setActiveTab, setIsSell }) => {
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
      <Col color={theme.bgColorDark}>
        <Chart />
      </Col>

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
            <Botton label='Trade' icon={Trade} primary />
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

const ConnectMarket = ({ markets, activeTabIndex, isSell, setActiveTab, setIsSell, location }) => {
  const id = new URLSearchParams(location.search).get('id');
  return (
    <Market
      market={markets.find(m => m.id === id)}
      activeTabIndex={activeTabIndex}
      isSell={isSell}
      setActiveTab={setActiveTab}
      setIsSell={setIsSell} />
  )
}

const mapStateToProps = state => ({
  markets: state.market.markets,
  activeTabIndex: state.marketDetail.activeTabIndex,
  isSell: state.marketDetail.isSell,
});

const mapDispatchToProps = {
  setIsSell: setIsSell,
  setActiveTab
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ConnectMarket));