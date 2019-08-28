import React, { useEffect, useRef } from 'react'

import { connect } from 'react-redux'
import * as Actions from 'actions/marketUserOrder'

import Avatar from 'components/Avatar'
import Text from 'components/Text'
import Input from 'components/Input'
import { CloseWithCircle, Tick, Add } from 'components/Icon'
import { Col, Row } from 'components/Layout'
import Hr from 'components/Hr'
import Table from 'components/Table'
import { DateText, TokenText } from 'containers/Common'
import Button from 'components/Button'

import { toPrice, toAgo } from 'lib/util'
import { useLang } from 'language'
import { ORDER_STATE_DISPLAY } from 'integrator'

const layoutStyle = { center: true, flex: 1 }

function UserSellOrder({ 
  symbol, marketId,
  sellOrder: { orders, fetching },
  marketEditingSellOrder: {  removedOrderIds, addedOrders, unlockOrders, editingPrice, editingAmount, gasFee, fetching: confirming, },
  getSellOrder, reset, deleteSellOrder, undoDeleteSellOrder, onChangePrice, onChangeAmount, addSellOrder, unlockOrder, confirmChange
 }) {
  const inEditMode = !!(addedOrders.length || removedOrderIds.length || unlockOrders.length)
  const [{ trading: tradingText, sutSymbol }] = useLang()
  function TableTokenText(p) {
    return <TokenText note={removedOrderIds.includes(p.record.orderId)} {...p} />
  }
  function TableStatus({ value, record }) {
    const removed = removedOrderIds.includes(record.orderId)
    return <Text center note={removed}>{removed ? 'Cancelled' : ORDER_STATE_DISPLAY[value]}</Text>
  }
  const confirmButtonRef = useRef(null)
  useEffect(() => {
    confirmButtonRef.current && confirmButtonRef.current.scrollIntoView()
  }, [inEditMode])
  useEffect(() => {
    getSellOrder(marketId)
    return reset
  }, [marketId])
  const model = [
    { label: 'Time', value: 'createdTime', layoutStyle, component: p => <DateText note={removedOrderIds.includes(p.record.orderId)} {...p} /> },
    { label: `Amount(${symbol})`, value: 'totalAmount', layoutStyle, component: TableTokenText },
    { label: `Remained ${symbol}`, value: 'remaining', layoutStyle, component: TableTokenText },
    { label: `Sell Price(${sutSymbol})`, value: 'sellingPrice', layoutStyle, component: TableTokenText },
    { label: `Avg Executed Price(${sutSymbol})`, value: 'avgTradedPrice', layoutStyle, component: TableTokenText },
    { label: `Est. Total(${sutSymbol})`, value: 'total', layoutStyle, component: TableTokenText },
    { label: 'Status', value: 'state', layoutStyle, component: TableStatus },
    { label: 'Action', value: 'action', layoutStyle, component: ({ record: {orderId} }) => 
      removedOrderIds.includes(orderId) ?
        <Tick primary S onClick={() => undoDeleteSellOrder(orderId)} />
      :
        <CloseWithCircle primary S onClick={() => deleteSellOrder(orderId)} /> 
    },
  ]

  return (
    <Col HS>
      <Table
        noBorderCol
        recordKey='orderId'
        model={model}
        values={[...addedOrders, ...orders]}
        isLoading={fetching}
        hasMore={fetching}
      />
      {
        inEditMode && 
        <>
        <Hr />
        <Col>
          <Row VS note>
            <Col flex={2} centerVertical>
              <Text note>Remaining {symbol} for allocation: { removedOrderIds.reduce((p, id) => p + orders.find(o => o.orderId === id).remaining, 0) - addedOrders.reduce((p, {remaining}) => p + +remaining, 0) }</Text>
            </Col>
            <Col flex={1} HBase>
              <Input background width='100%' number value={editingAmount} onChange={onChangeAmount} />
            </Col>
            <Col flex={1} HBase>
              <Input background width='100%' number value={editingPrice} onChange={onChangePrice} />
            </Col>
            <Col flex={3}></Col>
            <Col flex={1} center centerVertical>
              <Add primary S onClick={addSellOrder} />
            </Col>
          </Row>
          <Row right bottom VS>
            {gasFee && <Text S note HS>Est. gas fee: {gasFee} ETH</Text>}
            <Button label='Confirm' icon={Tick} primary width='100px' buttonRef={confirmButtonRef} />
          </Row>
        </Col>
        </>
      }
    </Col>
  )
}

const mapStateToProps = state => ({
  symbol: state.market.symbol,
  marketId: state.market.id,
  sellOrder: state.marketUserOrder.sellOrder,
  marketEditingSellOrder: state.marketEditingSellOrder
})
const mapDispatchToProps = Actions

export default connect(mapStateToProps, mapDispatchToProps)(UserSellOrder)
