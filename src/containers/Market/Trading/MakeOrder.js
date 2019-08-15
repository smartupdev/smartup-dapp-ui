import React, { useEffect } from 'react'

import { connect } from 'react-redux'
import { onClickTnc } from 'actions/ipfs'
import * as Actions from 'actions/trade'

import Input, { Checkbox } from 'components/Input'
import Avatar from 'components/Avatar'
import { Row, Col } from 'components/Layout'
import Text from 'components/Text'
import Button from 'components/Button'
import Hr from 'components/Hr'
import { Trade } from 'components/Icon'

import { useLang } from 'language'
import theme from 'theme'

function Tnc({ agreeTnc, toggleTnc, disabled }) {
  const [{ trading: tradingText, term }] = useLang()
  return (
    <Row centerVertical>
      <Checkbox checked={agreeTnc} onChange={toggleTnc} disabled={disabled} label={<Text S note lineHeight>{tradingText.agreeTo}&nbsp;</Text>} />
      <Text S note underline lineHeight onClick={onClickTnc}>{term}</Text>
    </Row>
  )
}

function MakeOrder({ 
  toggleTnc, reset, onChangeBuyUnit, onChangeSellPrice, onTrade,
  trade: { 
    agreeTnc, 
    isTrading, error,
    buyUnit, buyPrice, sellPrice, 
    estGasFee, estMatchedOrder },
  symbol
}) {
  const [{ trading: tradingText }] = useLang()
  useEffect(() => reset, [])
  window.eee = error
  return (
    <>
    <Col HS BottomS center>
      <Text sectionTitle>{tradingText.tradeTitle}</Text>
      <Hr />

      <Row centerVertical VS>
        <Text>Buy number</Text>
        <Input background number decimal={0} value={buyUnit} onChange={onChangeBuyUnit} />
        <Text>{symbol}</Text>
      </Row>

      <Row centerVertical VS>
        <Text>Sell Price</Text>
        <Input background number value={sellPrice} onChange={onChangeSellPrice} decimal={8} />
        <Text>SMARTUP</Text>
      </Row>

      {estGasFee && <Text center>{`Est. gas fee: ${estGasFee}. MatchedOrder: ${estMatchedOrder}`}</Text>}

      <Tnc agreeTnc={agreeTnc} toggleTnc={toggleTnc} disabled={isTrading} />
      
      <Button label='Buy' primary onClick={onTrade} />
      {error && <Text error S>{error.message}</Text>}
    </Col>
    <Hr />
    </>
  )
}

const mapStateToProps = state => ({
  symbol: state.market.symbol,
  // GET user sut
  trade: state.trade
})

const mapDispatchToProps = Actions

export default connect(mapStateToProps, mapDispatchToProps)(MakeOrder)

// <old>
{/* <Row TopL>
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

</Col> */}
