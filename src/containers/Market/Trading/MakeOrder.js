import React, { useEffect } from 'react'

import { ENV } from 'config'

import { connect } from 'react-redux'
import { onClickTnc } from 'actions/ipfs'
import * as Actions from 'actions/trade'
import { getCtBalance } from 'actions/market'

import Input, { Checkbox, Slider } from 'components/Input'
import Avatar from 'components/Avatar'
import { Row, Col } from 'components/Layout'
import Text from 'components/Text'
import Button from 'components/Button'
import Hr from 'components/Hr'

import { useLang } from 'language'
import { toToken } from 'lib/util'
import { weiToEth } from 'integrator'
import styled from 'styled-components'

function Tnc({ agreeTnc, toggleTnc, disabled }) {
  const [{ trading: tradingText, term }] = useLang()
  return (
    <Row centerVertical>
      <Checkbox checked={agreeTnc} onChange={toggleTnc} disabled={disabled} label={<Text S note lineHeight>{tradingText.agreeTo}</Text>} />
      <Text S note underline lineHeight onClick={onClickTnc}>{term}</Text>
    </Row>
  )
}

function Title({ children }) {
  return (
    <Row TopXL>
      <LeftBlock />
      <Text>{children}</Text>
    </Row>
  )
}

function InputBlock({ label, symbol, icon, noipfs, value, onChange }) {
  return (
    <Col>
      <Row>
        <LeftBlock />
        <Text S note>{label}</Text>
      </Row>
      <Row centerVertical VBase>
        <Avatar icon={icon} noipfs={noipfs} />
        <Col flex={1}>
          <Input background number decimal={0} value={value} onChange={onChange} />
        </Col>
        <Text LeftBase note nowrap>{symbol}</Text>
      </Row>
    </Col>
  )
} 

const LeftBlock = styled(Col).attrs(p => ({ MarginRightXS: true }))`
  width: ${p => p.theme.imageSizeM};
`

function MakeOrder({ 
  stage,
  toggleTnc, reset, onChangeBuyUnit, onChangeSellPrice, onChangeBuyPrice, onTrade, 
  getCtBalance,
  trade: { 
    agreeTnc, 
    signing, isTrading, error,
    buyUnit, buyPrice, sellPrice, 
    estGasFee, estMatchedOrder },
  symbol, marketAvatar, marketId, userCt, userSut
}) {
  const [{ trading: tradingText, sutSymbol }] = useLang()
  useEffect(() => {
    getCtBalance()
    return reset
  }, [marketId])
  const totalReqSut = buyUnit*buyPrice
  return (
    <Col HS BottomS>
      <Text sectionTitle>{tradingText.tradeTitle}</Text>
      <Hr />
      <Row right width='100%' TopS>
        <Text> {tradingText.yourWallet} </Text>
        <Text primary bold HBase>{toToken(userCt)}</Text>
        <Text>{symbol}</Text>
      </Row>

      <Title>{tradingText.buyOrder}</Title>
      {stage !== 1 && <InputBlock label={tradingText.buyOrder} icon={ENV.logo} noipfs value={buyPrice} onChange={onChangeBuyPrice} symbol={sutSymbol} />}
      <InputBlock label= {tradingText.buyAmount} icon={marketAvatar} value={buyUnit} onChange={onChangeBuyUnit} symbol={symbol} />
      <Row>
        <LeftBlock />
        <Col flex={1}>
          <Col BottomS>
            <Slider showScale value={+userSut ? totalReqSut/userSut : ''} onChange={percent => onChangeBuyUnit(+(userSut*percent/buyPrice).toFixed(7))} />
          </Col>
          {/* <Text S note TopS>~$6,000 USD</Text> */}
          <Text S note> {tradingText.est} {toToken(totalReqSut)} {sutSymbol}</Text>
          <Text S note>{tradingText.estGasFee} {weiToEth(estGasFee) || '-'} ETH</Text>
        </Col>
      </Row>

      <Title>{tradingText.presetSellOrder}</Title>
      <InputBlock label={`${tradingText.sellPrice} ${symbol}`} icon={ENV.logo} noipfs value={sellPrice} onChange={onChangeSellPrice} symbol={sutSymbol} />
      <Row>
        <LeftBlock />
        <Text S note red={sellPrice && +sellPrice < +buyPrice}>{`${tradingText.est} ${buyPrice && sellPrice ? (sellPrice-buyPrice)*buyUnit : '-'} ${sutSymbol}`}</Text>
      </Row>

      <Row spaceBetween TopXL>
        <Tnc agreeTnc={agreeTnc} toggleTnc={toggleTnc} disabled={isTrading} />
        <Button label='Buy' primary HM onClick={onTrade} disabled={isTrading} loading={isTrading} />
      </Row>
      {signing && <Text note S right>{`[${signing.current}/${signing.total}] Sign MetaMask for ${signing.take ? 'taking' : 'making'} ${signing.buy ? 'buy' : 'sell'} order`}</Text>}
      {error && <Text error S right>{error.message}</Text>}
    </Col>
  )
}

const mapStateToProps = state => ({
  symbol: state.market.symbol,
  marketAvatar: state.market.avatar,
  marketId: state.market.id,
  userCt: state.market.userCt,
  userSut: state.wallet.sut,
  trade: state.trade
})

const mapDispatchToProps = {
  ...Actions,
  getCtBalance
}

export default connect(mapStateToProps, mapDispatchToProps)(MakeOrder)