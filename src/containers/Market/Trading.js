import React, { useEffect } from 'react'
// import { Link } from '../../routes'

import { connect } from 'react-redux'
import { setTab, onChangeCT, onChangeSUT, onTrade, toggleIsSell, toggleTnc, reset, getTradeList, watchKline,getKlineList, getHighLowList,} from '../../actions/trade';
import { onClickTnc } from '../../actions/ipfs'

import theme from '../../theme'
import { Row, Col } from '../../components/Layout'
import Input, { Checkbox } from '../../components/Input'
// import Tab from '../../components/Tab'
import Table from '../../components/Table'
import { Trade } from '../../components/Icon'
// import Image from '../../components/Image'
import Text from '../../components/Text'
import Button from '../../components/Button'
import Hr from '../../components/Hr'
import Avatar from '../../components/Avatar'
// import TableFooter from '../../components/TableFooter'
import ScrollLoader from '../../components/ScrollLoader'
// import smartupIcon from '../../images/smartup.png'

//import lang, { currentLang } from '../../lang'
import { useLang } from '../../language'
import { toPrice, toAgo, toFullDate, shorten,upperOne } from '../../lib/util'

import Chart from './Chart'

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
  const { tabIndex, userCt, ct, sut, isSell, isTrading, trades, gettingTrades, hasNextPage, klineData,highLowData, agreeTnc, tradingError } = tradeState
  const [lang] = useLang()
  const model = [
    { label: lang.trading.table.buySell, value: 'type', layoutStyle: { flex: 1, center: true }, component: ({ value }) => <Text red={value === 'sell'} green={value !== 'sell'}>{value === 'sell' ? lang.trading.table.sell : lang.trading.table.buy }</Text> },
    { label: lang.trading.table.user, value: 'userAddress', layoutStyle: { flex: 1 }, component: ({ record }) => <Row centerVertical><Avatar icon={record.userIcon} /><Text>{shorten(record.username)}</Text></Row> },
    { label: lang.trading.table.time, value: 'createTime', layoutStyle: { flex: 1, center: true }, component: TimeComponent },
    { label: lang.trading.table.avgPrice, value: 'avgAmount', layoutStyle: { flex: 1, center: true }, component: ({ value }) => <Text>{toPrice(value)}</Text> },
    { label: lang.trading.table.ct, value: 'ctAmount', layoutStyle: { flex: 1, center: true }, },
    { label: lang.trading.table.stage, value: 'stage', layoutStyle: { flex: 1, center: true }, component: ({ value }) => <Text>{upperOne(value)}</Text> },
  ]

  const klineTabs = [
    { label: lang.trading.hour },
    { label: lang.trading.day },
    { label: lang.trading.week },
  ]
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
          <Text note S>{lang.trading.change}</Text>

          <Text XL price spacingTopS>{toPrice(market.last, 2)}</Text>
          <Text note S>{lang.trading.price}</Text>

          <Text XL primary spacingTopS>{toPrice(highLowData.length > 0 ? highLowData[highLowData.length - 1].amount : '', 2)}</Text>
          <Text note S>{lang.trading.volume}</Text>

          <Text XL spacingTopS>{toPrice(market.amount, 2)}</Text>
          <Text note S>{lang.trading.cap}</Text>

          <Text XL spacingTopS>{toPrice(market.ctTopAmount, 2)}</Text>
          <Text note S>{lang.trading.ct}</Text>
        </Col>
      </Row>

      <Col spacingLeftS spacingRightS spacingBottomS center>
        <Text spacingBottomS spacingTopS L center>{lang.trading.tradeTitle}</Text>
        <Hr />

        <Row TopL>
          <Button onClick={isSell ? toggleIsSell : undefined} label={lang.trading.table.buy} icon={Trade} backgroundColor={!isSell ? theme.green : undefined} color={isSell ? theme.green : undefined} width='100px' />
          <Button onClick={isSell ? undefined : toggleIsSell} label={lang.trading.table.sell} icon={Trade} backgroundColor={isSell ? theme.red : undefined} color={!isSell ? theme.red : undefined} width='100px' MarginLeftS />
        </Row>

        <Text S center note VM>{lang.trading.tradeText}</Text>

        <Col maxWidth='1000px' width='100%'>
          <Col center>
            <Row BottomL>
              <Avatar icon={market.avatar} username={market.name} />
              <Col spacingLeftS>
                <Input background L center size='30' disabled={isTrading} value={ct} onChange={onChangeCT} number />
                {notEnoughCt && <Text error XS>{lang.trading.needMoreCT}</Text>}
                {notEnoughSut && <Text error XS>{lang.trading.needMoreSUT}</Text>}
                </Col>
            </Row>
          </Col>
          <Text S center note BottomM>{`${isSell ? lang.trading.toReceive : lang.trading.cost} ${sut ? (+sut).toFixed(4) : 0} SMARTUP`}</Text>


          <Row spaceBetween>
            <Row centerVertical>
              <Checkbox checked={agreeTnc} onChange={toggleTnc} disabled={isTrading} label={<Text S note lineHeight> {lang.trading.agreeTo} </Text>} />
              <Text S note underline lineHeight onClick={onClickTnc}>{ lang.term }</Text>
            </Row>
            <Col right>
              <Button label= {lang.trading.tradeButton} icon={Trade} primary onClick={() => onTrade(market.id)} disabled={isTrading || !agreeTnc || !ct | notEnoughSut || notEnoughCt} />
              {tradingError && <Text error XS>{tradingError.message}</Text>}
            </Col>
          </Row>

        </Col>

      </Col>
      <Hr />
      <Col spacingLeftM spacingRightM>
        <Text L center spacingBottomS spacingTopS>{lang.trading.trans}</Text>
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
              <Text note>{lang.trading.transactionRecord}</Text>
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
  watchKline,
};

export default connect(mapStateToProps, mapDispatchToProps)(Trading);