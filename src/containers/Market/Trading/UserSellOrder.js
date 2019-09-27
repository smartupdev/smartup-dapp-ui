import React, { useEffect, useRef } from 'react'

import { connect } from 'react-redux'
import * as Actions from 'actions/marketUserOrder'

import Avatar from 'components/Avatar'
import Text from 'components/Text'
import Input from 'components/Input'
import { CloseWithCircle, Tick, Add, Undo } from 'components/Icon'
import { Col, Row } from 'components/Layout'
import Hr from 'components/Hr'
import Table from 'components/Table'
import Button from 'components/Button'

import { DateText, TokenText, OrderStateTable } from 'containers/Common'

import { toPrice, toAgo } from 'lib/util'
import { useLang } from 'language'

const layoutStyle = { center: true, flex: 1 }
const titleStyle = { newline: true, center: true }



function UserSellOrder({ 
  symbol, marketId, loggedIn,
  sellOrder: { orders, fetching, error },
  marketEditingSellOrder: {  removedOrderIds, addedOrders, unlockOrders, editingPrice, editingAmount, gasFee, fetching: confirming, },
  getSellOrder, reset, deleteSellOrder, undoDeleteSellOrder, onChangePrice, onChangeAmount, addSellOrder, unlockOrder, confirmChange
 }) {
  const inEditMode = !!(addedOrders.length || removedOrderIds.length || unlockOrders.length)
  const [{ trading: tradingText, sutSymbol, api: { orderState } }] = useLang()
  function TableTokenText(p) {
    return <TokenText note={removedOrderIds.includes(p.record.orderId)} value={p.value} />
  }
  function TableStatus({ value, record }) {
    const removed = removedOrderIds.includes(record.orderId)
    return <OrderStateTable note={removed} value={removed ? 'Cancelled' : orderState[value]} />
  }
  const confirmButtonRef = useRef(null)
  useEffect(() => {
    confirmButtonRef.current && confirmButtonRef.current.scrollIntoView()
  }, [inEditMode])
  useEffect(() => {
    getSellOrder()
    return reset
  }, [marketId, loggedIn])
  
  const [lang] = useLang()
  const model = [
    { label: l => l.trading.myOrderBook.time, value: 'createTime', layoutStyle, component: p => <DateText note={removedOrderIds.includes(p.record.orderId)} {...p} /> },
    { label: l => `${l.trading.myOrderBook.amount} \n(${symbol})`, value: 'totalAmount', layoutStyle, component: TableTokenText },
    { label: l => `${l.trading.myOrderBook.remained} \n${symbol}`, value: 'remaining', layoutStyle, component: TableTokenText },
    { label: l => `${l.trading.myOrderBook.sellPrice}\n(${l.sutSymbol})`, value: 'sellingPrice', layoutStyle, component: TableTokenText },
    { label: l => `${l.trading.myOrderBook.executedPrice}\n(${l.sutSymbol})`, value: 'avgTradedPrice', layoutStyle, component: TableTokenText },
    { label: l => `${l.trading.myOrderBook.estTotal}\n(${l.sutSymbol})`, value: 'total', layoutStyle, component: TableTokenText },
    { label: l => l.trading.myOrderBook.status, value: 'state', layoutStyle, component: TableStatus },
    { label: l => l.trading.myOrderBook.action, value: 'action', layoutStyle, component: ({ record: {orderId} }) => 
      removedOrderIds.includes(orderId) ?
        <Undo primary S onClick={() => undoDeleteSellOrder(orderId)} />
      :
        <CloseWithCircle primary S onClick={() => deleteSellOrder(orderId)} /> 
    },
  ]
  const remaining =  removedOrderIds.reduce((p, id) => p + orders.find(o => o.orderId === id).remaining, 0) - addedOrders.reduce((p, {remaining}) => p + +remaining, 0)
  const disabledInput = remaining <= 0
  function onKeyDown(e) {
    if (e.keyCode === 13 && editingAmount && editingPrice) { // enter
      e.target.blur()
      addSellOrder()
    }
  }
  const disabledAdd = !editingAmount || !editingPrice
  return (
    <>
      <Table
        noBorderCol
        fixedHeader
        recordKey='orderId'
        model={model}
        animated
        values={[...addedOrders, ...orders]}
        isLoading={fetching}
        hasMore={fetching}
        titleStyle={titleStyle}
        language={lang}
        noResultText={error ? error.message : undefined}
      />
      {
        inEditMode && 
        <>
        <Hr />
        <Col>
          <Row VS note>
            <Col flex={2} centerVertical>
              <Text note={!remaining}>Remaining {symbol} for allocation: {remaining}</Text>
            </Col>
            <Col flex={1} HBase>
              <Input background width='100%' number value={editingAmount} onChange={v => onChangeAmount(v > remaining ? remaining : v)} disabled={disabledInput} />
            </Col>
            <Col flex={1} HBase>
              <Input background width='100%' number value={editingPrice} onChange={onChangePrice} onKeyDown={onKeyDown} disabled={disabledInput} />
            </Col>
            <Col flex={3}></Col>
            <Col flex={1} center centerVertical>
              <Add primary S onClick={addSellOrder} disabled={disabledAdd} />
            </Col>
          </Row>
          <Row right bottom VS>
            {gasFee && <Text S note HS>Est. gas fee: {gasFee} ETH</Text>}
            <Button label='Sign and Confirm' icon={Tick} primary width='100px' buttonRef={confirmButtonRef} onClick={confirmChange} />
          </Row>
        </Col>
        </>
      }
    </>
  )
}

const mapStateToProps = state => ({
  symbol: state.market.symbol,
  marketId: state.market.id,
  sellOrder: state.marketUserOrder.sellOrder,
  marketEditingSellOrder: state.marketEditingSellOrder,
  loggedIn: state.user.loggedIn
})
const mapDispatchToProps = Actions

export default connect(mapStateToProps, mapDispatchToProps)(UserSellOrder)
