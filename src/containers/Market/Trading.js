import React from 'react'
import { Link, WithMarket } from '../../routes'

import { connect } from 'react-redux'
import { onChangeCT, onChangeSUT, onTrade, toggleIsSell } from '../../actions/trade';

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

const model = [
  { label: lang.trading.table.buySell[currentLang], value: 'type', layoutStyle: { flex: 1, center: true }, component: ({ value }) => <Text red={value === 'SELL'} green={value !== 'SELL'}>{value === 'SELL' ? lang.trading.table.sell[currentLang] : lang.trading.table.buy[currentLang]}</Text> },
  { label: lang.trading.table.user[currentLang], value: 'username', layoutStyle: { flex: 1, center: true }, component: ({ record }) => <Row centerVertical><Avatar icon={record.userIcon} /><Text>{record.username}</Text></Row> },
  { label: lang.trading.table.time[currentLang], value: 'time', layoutStyle: { flex: 1, center: true }, component: ({ value }) => <Text>{toAgo(value)}</Text> },
  { label: lang.trading.table.avgPrice[currentLang], value: 'avg', layoutStyle: { flex: 1, center: true }, component: ({ value }) => <Text>{toToken(value)}</Text> },
  { label: lang.trading.table.ct[currentLang], value: 'ct', layoutStyle: { flex: 1, center: true }, component: ({ value }) => <Text>{toToken(value)}</Text>},
]


function Trading({ tradeState, onChangeCT, onChangeSUT, toggleIsSell, onTrade }) {
  const { ct, sut, isSell } = tradeState
  return (
    <WithMarket>
      {
        market =>
          <>
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
                    <Text XL>{toToken(market.price24hLow, 2)}</Text>
                    <Text red S>&nbsp;&nbsp;low</Text>
                  </Row>
                  <Row bottom>
                    <Text XL>{toToken(market.price24hHigh, 2)}</Text>
                    <Text green S>&nbsp;&nbsp;high</Text>
                  </Row>
                  <Text note S>{lang.trading.change[currentLang]}</Text>
                </Col>

                <Col spacingTopS>
                  <Text XL price>{toToken(market.price, 2)}</Text>
                  <Text note S>{lang.trading.price[currentLang]}</Text>
                </Col>

                <Col spacingTopS>
                  <Text XL primary>{toToken(market.volumeAvg24h, 2)}</Text>
                  <Text note S>{lang.trading.volume[currentLang]}</Text>
                </Col>

                <Col spacingTopS>
                  <Text XL>{toToken(market.pool, 2)}</Text>
                  <Text note S>{lang.trading.cap[currentLang]}</Text>
                </Col>

                <Col spacingTopS>
                  <Text XL>{toToken(market.totalCt, 2)}</Text>
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
                    <Input underline L center fullWidth value={sut} onChange={e => onChangeSUT(e.target.value)} number />
                    {/* <Text error XS>You need more SmartUp to make this trade.</Text> */}
                  </Col>
                  <Col spacingLeftM spacingRightM>
                    <Trade onClick={toggleIsSell} leftActive={isSell} rightActive={!isSell} />
                  </Col>
                  <Avatar icon={market.icon} />
                  <Col>
                    <Text S note>{lang.trading[isSell ? 'tradePay' : 'tradeReceive'][currentLang]}</Text>
                    <Text S>{market.name}</Text>
                  </Col>
                  <Col spacingLeftS spacingTopS flex={1}>
                    <Input underline L center fullWidth disabled value={ct && (+ct).toFixed(4)} onChange={e => onChangeCT(e.target.value)} number />
                    {/* <Text error XS>You need more SmartUp to make this trade.</Text> */}
                  </Col>
                </Row>

                <Row spaceBetween>
                  <Row centerVertical>
                    <Checkbox label={<Text S note lineHeight>Agree to&nbsp;</Text>} />
                    <Text S note underline lineHeight onClick={() => console.log('Get T&C')}>{'Teams & Conditions'}</Text>
                  </Row>
                  {/* <Botton label='Trade' icon={Trade} primary onClick={() => onSell(market.id, 10)} /> */}
                  <Botton label='Trade' icon={Trade} primary onClick={() => onTrade(market.id)} />
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
              {
                (!market.transations || !market.transations.length) &&
                <>
                  <Hr />
                  <Col center spacingTopS spacingBottomL>
                    <Text note>Transaction record will be available after the first transaction made</Text>
                  </Col>
                </>
              }
            </Col>

          </>
      }
    </WithMarket>
  )
}

const mapStateToProps = state => ({
  tradeState: state.trade
})


const mapDispatchToProps = {
  toggleIsSell,
  onTrade,
  onChangeCT,
  onChangeSUT
};

export default connect(mapStateToProps, mapDispatchToProps)(Trading);