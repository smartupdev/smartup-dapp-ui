import React, { useEffect, useState } from 'react'
import { Link } from '../../routes'

import { Header } from '../../components/Header/MobileHeader'
// import styled from 'styled-components'
import Text from '../../components/Text'
import { DonutLoader } from '../../components/Loader'
import Input, { RichContent, Label, Slider } from '../../components/Input'
import Hr from '../../components/Hr'
import Button from '../../components/Button'
import Image from '../../components/Image'
import ProgressBar from '../../components/ProgressBar'
import { Row, Col } from '../../components/Layout'
import smartupIcon from '../../images/smartup.png'
import successImg from '../../images/market_success.png'
import Chart from './Chart'
import DropToUpload from '../../components/DropToUpload'
import { useLang } from '../../language'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import * as actions from '../../actions/createMarket'
import { toToken } from '../../lib/util'
// import { createMarket } from '../../actions/market'

function ColorTextBox({ title, subtitle, primary, secondary, dark }) {
  return (
    <Col flex={1} bgDark borderRadius="4px" overflowHidden>
      <Col spacingS height="80px">
        <Text XL wordSpaceM>
          {title}
        </Text>
        <Text S>{subtitle}</Text>
      </Col>
      <Row flex={1} height="8px" bgPrimary={primary} bgSecondary={secondary} bgLight={dark} />
    </Col>
  )
}

// const optionsSpeed = ['Slow', 'Standard', 'Fast']
const CreateMarket = ({
  createMarketState: { 
    activeIndex, 
    name, desc, detail,
    symbol, period, unitPrice, unit, reserveRatio,
    error, isFetching, isReady, marketId, 
    avatarHash, avatarUploading,
    coverHash, coverUploading,
  }, 
  setActiveIndex, create, onChangeName, onChangeDesc, onChangeDetail, reset, get, 
  onChangeAvatar, onChangeCover,
  onChangePrice, onChangeUnit, onChangeReserveRatio, 
  onChangeSymbol, onChangePeriod
}) => {
  useEffect( () => {
    (!isReady || activeIndex < 0) && get()
    // return reset
  }, [])
  const [{ createMarket: createMarketText }] = useLang()
  if(!isReady) return <DonutLoader page />  
  function next() { setActiveIndex(activeIndex + 1) }
  function back() { setActiveIndex(activeIndex - 1) }
  const Next = ({disabled}) =>  <Button label={createMarketText.next} primary extended onClick={next} disabled={disabled || isFetching} />
  const Back = () =>  <Button label={createMarketText.back} primary extended onClick={back} disabled={isFetching} />
  const onChangeProgress = tab => setActiveIndex(tab)
  const options = [createMarketText.tab.basicInfo, createMarketText.tab.equation, createMarketText.tab.deposit]
  const totalAmount = unitPrice * unit
    return (
    <Col flex={1}>
      <Text hiddenMobile center BottomS TopS L>{createMarketText.createMarket}</Text>
      <Header center><Text>{createMarketText.createMarket}</Text></Header>
      <Hr />
      {
        activeIndex >= 0 && 
        <ProgressBar options={options} activeIndex={activeIndex} onClick={!isFetching && onChangeProgress} />
      }

      <Col LeftM RightM flex={1}>
      {
        activeIndex === 0 ? 
          <>
            <Input background XL value={name} onChange={onChangeName} disabled={isFetching} label={createMarketText.marketName} error={error.name} description={createMarketText.nameDes}  />
            <Input background L line={3} value={desc} onChange={onChangeDesc} disabled={isFetching} label={createMarketText.marketOverview} error={error.desc} description={createMarketText.overviewDes} />
            <RichContent isJs editor value={detail} onBlur={onChangeDetail} label={createMarketText.marketDetail} error={error.detail} description={createMarketText.detailDes} />
            <Label>{createMarketText.marketAvatar}</Label>
            <DropToUpload MarginBottomM onChoose={onChangeAvatar} isLoading={avatarUploading} error={error.avatarHash} value={avatarHash} imageHeight='100px' imageWidth='100px' />
            <Label>{createMarketText.marketCover}</Label>
            <DropToUpload MarginBottomM onChoose={onChangeCover} isLoading={coverUploading} error={error.coverHash} value={coverHash} imageHeight={['auto', '300px']} imageWidth={['100%', '450px']} />
            <Row spacingTopL right>
              <Next />
            </Row>
          </>
        :
          activeIndex === 1 ? 
          <>
            <Input background L value={symbol} onChange={onChangeSymbol} disabled={isFetching} label={createMarketText.symbol} error={error.symbol} description={createMarketText.symbolDes} />
            <Input number background L decimal={8} value={unitPrice} onChange={onChangePrice} disabled={isFetching} label={createMarketText.issuePrice} error={error.unitPrice} description={createMarketText.issuePriceDes} />
            <Input number background L decimal={0} value={unit} onChange={onChangeUnit} disabled={isFetching} label={createMarketText.issueUnit} error={error.unit} description={createMarketText.issueUnitDes} />
            {/* <Input number background L value={reserveRatio} onChange={onChangeReserveRatio} disabled={isFetching} label={createMarketText.reserveRatio} error={error.reserveRatio} description={createMarketText.reserveRatioDes} /> */}
            <Input number background L decimal={0} value={period} onChange={onChangePeriod} disabled={isFetching} label={createMarketText.period} error={error.period} description={createMarketText.periodDes} />
            <Label>{createMarketText.reserveRatio}</Label>
            <Row BottomXL>
              <ColorTextBox title={toToken(totalAmount * reserveRatio)} subtitle="Basic Price" primary />
              <Col width="20px" />
              <ColorTextBox title={toToken(totalAmount * (1 - reserveRatio))} subtitle="Available Fund" secondary />
              <Col width="20px" />
              <ColorTextBox title={toToken(totalAmount)} subtitle="Total Amount" dark />
            </Row>
            <Slider value={reserveRatio} max={1} onChange={onChangeReserveRatio} disabled={isFetching} displayTextFn={t => (+t*100).toFixed(2)+'%' } />
            <Row spacingTopL spaceBetween>
              <Back />
              <Next />
            </Row>
          </>
        :
          activeIndex === 2 ? 
          <>
            <Label>{createMarketText.createDeposit}</Label>
            <Row centerVertical>
              <Image source={smartupIcon} M />
              <Col flex={1} spacingRightXS spacingLeftXS>
                <Input background L disabled value={'2500'} />
              </Col>
              <Text rightText>SmartUp</Text>
            </Row>
            <Row spacingTopL spaceBetween>
              <Back />
              <Button label={createMarketText.create} primary onClick={create} extended disabled={isFetching} />
            </Row>
          </>
        :
        <>
            <Col center centerVertical flex={1}>
              <Image source={successImg} size={'150px'} />
              <Col spacingTopL spacingBottomL>
                <Text XL wordSpaceL center> {createMarketText.creating} </Text>
              </Col>
              <Link>
                {
                  ({goto}) =>
                <Button label={createMarketText.preview} primary onClick={()=>goto.trading({id: marketId})} extended />
                }
              </Link>
            </Col>
          </>
      }
        <Col right BottomL>
          { error.api && <Text S error>{error.api}</Text> }
        </Col>
      </Col>
    </Col>
  )
}

const mapStateToProps = state => ({
  createMarketState: state.createMarket,
});
const mapDispatchToProps = {
  ...actions
  // setActiveIndex, create, onChangeName, onChangeDesc, reset, get, onChangeAvatar, onChangeCover,
  // onChangePrice, onChangeUnit, onChangeReserveRatio, 
} 

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CreateMarket));