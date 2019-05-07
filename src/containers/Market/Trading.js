import React, { useEffect } from 'react'
import { Link } from '../../routes'

import { connect } from 'react-redux'
import { setTab, onChangeCT, onChangeSUT, onTrade, toggleIsSell, toggleTnc, reset, getTradeList, getKlineList, getHighLowList,} from '../../actions/trade';


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
import TableFooter from '../../components/TableFooter'
import ScrollLoader from '../../components/ScrollLoader'
import smartupIcon from '../../images/smartup.png'

import lang, { currentLang } from '../../lang'
import { toPrice, toAgo, toFullDate, shorten,upperOne } from '../../lib/util'

import Chart from './Chart'

const model = [
  { label: lang.trading.table.buySell[currentLang], value: 'type', layoutStyle: { flex: 1, center: true }, component: ({ value }) => <Text red={value === 'sell'} green={value !== 'sell'}>{value === 'sell' ? lang.trading.table.sell[currentLang] : lang.trading.table.buy[currentLang]}</Text> },
  { label: lang.trading.table.user[currentLang], value: 'userAddress', layoutStyle: { flex: 1 }, component: ({ record }) => <Row centerVertical><Avatar icon={record.userIcon} /><Text>{shorten(record.username)}</Text></Row> },
  { label: lang.trading.table.time[currentLang], value: 'createTime', layoutStyle: { flex: 1, center: true }, component: ({ value }) => <Text>{toAgo(value)}</Text> },
  { label: lang.trading.table.avgPrice[currentLang], value: 'avgAmount', layoutStyle: { flex: 1, center: true }, component: ({ value }) => <Text>{toPrice(value)}</Text> },
  { label: lang.trading.table.ct[currentLang], value: 'ctAmount', layoutStyle: { flex: 1, center: true }, },
  { label: lang.trading.table.stage[currentLang], value: 'stage', layoutStyle: { flex: 1, center: true }, component: ({ value }) => <Text>{upperOne(value)}</Text> },
]

const klineTabs = [
  { label: '1hour' },
  { label: '1day' },
  { label: '1week' },
]

function Trading({ loggedIn, market, gettingMarket, tradeState, setTab, onChangeCT, onChangeSUT, toggleIsSell, toggleTnc, onTrade, reset, userSut, getTradeList, getKlineList, getHighLowList }) {
  useEffect(() => {
    if(market) {
      getTradeList()
      getKlineList()
      getHighLowList()
    }
    return reset
  }, [market])
  const { tabIndex, userCt, ct, sut, isSell, isTrading, trades, gettingTrades, hasNextPage, klineData,highLowData, agreeTnc, tradingError } = tradeState
  
  if(!market || gettingMarket) return null

  const notEnoughSut = !isSell && +userSut < +sut && loggedIn
  const notEnoughCt = isSell && +ct > +userCt && loggedIn
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
            <Text XL>{toPrice(highLowData.length > 0 ? highLowData[highLowData.length - 1].low : '', 2)}</Text><Text red S>&nbsp;&nbsp;low</Text>
          </Row>
          <Row bottom>
            <Text XL>{toPrice(highLowData.length > 0 ? highLowData[highLowData.length - 1].high : '', 2)}</Text><Text green S>&nbsp;&nbsp;high</Text>
          </Row>
          <Text note S>{lang.trading.change[currentLang]}</Text>

          <Text XL price spacingTopS>{toPrice(market.last, 2)}</Text>
          <Text note S>{lang.trading.price[currentLang]}</Text>

          <Text XL primary spacingTopS>{toPrice(highLowData.length > 0 ? highLowData[highLowData.length - 1].amount : '', 2)}</Text>
          <Text note S>{lang.trading.volume[currentLang]}</Text>

          <Text XL spacingTopS>{toPrice(market.amount, 2)}</Text>
          <Text note S>{lang.trading.cap[currentLang]}</Text>

          <Text XL spacingTopS>{toPrice(market.ctTopAmount, 2)}</Text>
          <Text note S>{lang.trading.ct[currentLang]}</Text>
        </Col>
      </Row>

      <Col spacingLeftS spacingRightS spacingBottomS center>
        <Text spacingBottomS spacingTopS L center>{lang.trading.tradeTitle[currentLang]}</Text>
        <Hr />

        <Row TopL>
          <Button onClick={isSell ? toggleIsSell : undefined} label='BUY' icon={Trade} backgroundColor={!isSell && theme.green} color={isSell && theme.green} width='100px' />
          <Button onClick={isSell ? undefined : toggleIsSell} label='SELL' icon={Trade} backgroundColor={isSell && theme.red} color={!isSell && theme.red} width='100px' MarginLeftS />
        </Row>

        <Text S center note VM>{lang.trading.tradeText[currentLang]}</Text>

        <Col maxWidth='1000px' width='100%'>
          <Col center>
            <Row BottomL>
              <Avatar icon={market.avatar} username={market.name} />
              <Col spacingLeftS>
                <Input background L center size='30' disabled={isTrading} value={ct} onChange={onChangeCT} number />
                {notEnoughCt && <Text error XS>You don't have enough token to sell.</Text>}
                </Col>
            </Row>
          </Col>
          <Text S center note BottomM>Cost {sut ? (+sut).toFixed(4) : 0} SMARTUP</Text>


          <Row spaceBetween>
            <Row centerVertical>
              <Checkbox checked={agreeTnc} onChange={toggleTnc} disabled={isTrading} label={<Text S note lineHeight>Agree to&nbsp;</Text>} />
              <Text S note underline lineHeight onClick={() => console.log('Get T&C')}>{'Teams & Conditions'}</Text>
            </Row>
            <Col right>
              <Button label='Trade' icon={Trade} primary onClick={() => onTrade(market.id)} disabled={isTrading || !agreeTnc || !ct | notEnoughSut || notEnoughCt} />
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
          // footer={()=>{ return(<TableFooter hasNextPage={hasNextPage} loadMore={getTradeList}/>) }}
        />
        <ScrollLoader isButton hasMore={hasNextPage} loadMore={() => getTradeList(true)} isLoading={gettingTrades} />
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
};

export default connect(mapStateToProps, mapDispatchToProps)(Trading);