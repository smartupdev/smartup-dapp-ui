import React, { useEffect } from 'react'

import { connect } from 'react-redux'
import { onClickTnc } from 'actions/ipfs'
import * as Actions from 'actions/trade'

import Input, { Checkbox, Slider } from 'components/Input'
import Avatar from 'components/Avatar'
import { Row, Col } from 'components/Layout'
import Text from 'components/Text'
import Button from 'components/Button'
import Hr from 'components/Hr'
import { Trade } from 'components/Icon'

import { useLang } from 'language'
import { toToken } from '../../../lib/util';

function Tnc({ agreeTnc, toggleTnc, disabled }) {
  const [{ trading: tradingText, term }] = useLang()
  return (
    <Row centerVertical>
      <Checkbox checked={agreeTnc} onChange={toggleTnc} disabled={disabled} label={<Text S note lineHeight>{tradingText.agreeTo}</Text>} />
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
  symbol, marketAvatar
}) {
  const [{ trading: tradingText }] = useLang()
  useEffect(() => reset, [])
  return (
    <>
    <Col HS BottomS>
      <Text sectionTitle>{tradingText.tradeTitle}</Text>
      <Hr />
      <Row right width='100%' TopS>
        <Text>Your wallet: </Text>
        <Text primary bold>{toToken(500000)}</Text>
        <Text> CT</Text>
      </Row>

      <Col VS>
        <Text>Buy Order</Text>
        <Text S note>Amount to Buy</Text>
        <Row centerVertical VS>
          <Avatar icon={marketAvatar} />
          <Col flex={1}>
            <Input background number decimal={0} value={buyUnit} onChange={onChangeBuyUnit} />
          </Col>
          <Text LeftBase note nowrap>{symbol}</Text>
        </Row>
        <Slider showScale value={buyUnit/100} />
        <Text S note TopS>~$6,000 USD</Text>
        <Text S note>~10,000 SmartUp</Text>
        <Text S note>Est. gas fee: 0.00763 ETH</Text>
      </Col>

      <Col VS>
        <Text>Pre-set Sell Order</Text>
        <Text S note>Price per {symbol}</Text>
        <Row centerVertical VS>
          <Avatar icon={marketAvatar} />
          <Col flex={1}>
            <Input background number decimal={0} value={sellPrice} onChange={onChangeSellPrice} />
          </Col>
          <Text LeftBase note nowrap>SmartUp</Text>
        </Row>
        <Text S note>Revenue 20,000 SmartUp</Text>
      </Col>
      {estGasFee && <Text center>{`Est. gas fee: ${estGasFee}. MatchedOrder: ${estMatchedOrder}`}</Text>}

      <Row spaceBetween>
        <Tnc agreeTnc={agreeTnc} toggleTnc={toggleTnc} disabled={isTrading} />
        <Button label='Buy' primary width='80px' onClick={onTrade} />
      </Row>
      {error && <Text error S>{error.message}</Text>}
    </Col>
    <Hr />
    </>
  )
}

const mapStateToProps = state => ({
  symbol: state.market.symbol,
  marketAvatar: state.market.avatar,
  // GET user sut
  trade: state.trade
})

const mapDispatchToProps = Actions

export default connect(mapStateToProps, mapDispatchToProps)(MakeOrder)