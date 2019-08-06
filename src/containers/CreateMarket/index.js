import React, { useEffect, useState } from 'react'
import { Link } from '../../routes'

import { Header } from '../../components/Header/MobileHeader'
// import styled from 'styled-components'
import Text from '../../components/Text'
import { DonutLoader } from '../../components/Loader'
import Input, { RichContent, Label } from '../../components/Input'
import Hr from '../../components/Hr'
import Button from '../../components/Button'
import Image from '../../components/Image'
import ProgressBar from '../../components/ProgressBar'
import { Row, Col } from '../../components/Layout'
import smartupIcon from '../../images/smartup.png';
import successImg from '../../images/market_success.png';
import Chart from './Chart'
import DropToUpload from '../../components/DropToUpload'
import { useLang } from '../../language'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import * as actions from '../../actions/createMarket'
// import { createMarket } from '../../actions/market'

// const optionsSpeed = ['Slow', 'Standard', 'Fast']
const CreateMarket = ({
  createMarketState: { 
    activeIndex, 
    name, desc, detail,
    unitPrice, unit, reserveRatio,
    error, isFetching, isReady, marketId, 
    avatarHash, avatarUploading,
    coverHash, coverUploading,
  }, 
  setActiveIndex, create, onChangeName, onChangeDesc, onChangeDetail, reset, get, 
  onChangeAvatar, onChangeCover,
  onChangePrice, onChangeUnit, onChangeReserveRatio, 
}) => {
  useEffect( () => {
    (!isReady || activeIndex < 0) && get()
    // return reset
  }, [])
  const [lang] = useLang()
  if(!isReady) return <DonutLoader page />  
  function next() { setActiveIndex(activeIndex + 1) }
  function back() { setActiveIndex(activeIndex - 1) }
  const Next = ({disabled}) =>  <Button label={lang.createMarket.next} primary extended onClick={next} disabled={disabled || isFetching} />
  const Back = () =>  <Button label={lang.createMarket.back} primary extended onClick={back} disabled={isFetching} />
  const onChangeProgress = tab => setActiveIndex(tab)
  const options = [lang.createMarket.tab.basicInfo, lang.createMarket.tab.equation, lang.createMarket.tab.deposit]
    return (
    <Col flex={1}>
      <Text hiddenMobile center BottomS TopS L>{lang.createMarket.createMarket}</Text>
      <Header center><Text>{lang.createMarket.createMarket}</Text></Header>
      <Hr />
      {
        activeIndex >= 0 && 
        <ProgressBar options={options} activeIndex={activeIndex} onClick={!isFetching && onChangeProgress} />
      }

      <Col LeftM RightM flex={1}>
      {
        activeIndex === 0 ? 
          <>
            <Input background XL value={name} onChange={onChangeName} disabled={isFetching} label={lang.createMarket.marketName} error={error.name} description={lang.createMarket.nameDes}  />
            <Input background L line={3} value={desc} onChange={onChangeDesc} disabled={isFetching} label={lang.createMarket.marketOverview} error={error.desc} description={lang.createMarket.overviewDes} />
            <RichContent isJs editor value={detail} onBlur={onChangeDetail} label={lang.createMarket.marketDetail} error={error.detail} description={lang.createMarket.detailDes} />
            <Label>{lang.createMarket.marketAvatar}</Label>
            <DropToUpload MarginBottomM onChoose={onChangeAvatar} isLoading={avatarUploading} error={error.avatarHash} value={avatarHash} imageHeight='100px' imageWidth='100px' />
            <Label>{lang.createMarket.marketCover}</Label>
            <DropToUpload MarginBottomM onChoose={onChangeCover} isLoading={coverUploading} error={error.coverHash} value={coverHash} imageHeight={['auto', '300px']} imageWidth={['100%', '450px']} />
            <Row spacingTopL right>
              <Next />
            </Row>
          </>
        :
          activeIndex === 1 ? 
          <>
            <Label>{lang.createMarket.issuePrice}</Label>
            <Input number background L value={unitPrice} onChange={onChangePrice} disabled={isFetching} />
            <Text S right error={error.unitPrice}>{error.unitPrice || lang.createMarket.issuePriceDes}</Text>
            <Label>{lang.createMarket.issueUnit}</Label>
            <Input number background L value={unit} onChange={onChangeUnit} disabled={isFetching} />
            <Text S right error={error.unit}>{error.unit || lang.createMarket.issueUnitDes}</Text>
            <Label>{lang.createMarket.reserveRatio}</Label>
            <Input number background L value={reserveRatio} onChange={onChangeReserveRatio} disabled={isFetching} />
            <Text S right error={error.reserveRatio}>{error.reserveRatio || lang.createMarket.reserveRatioDes}</Text>
            <Row spacingTopL spaceBetween>
              <Back />
              <Next />
            </Row>
          </>
        :
          activeIndex === 2 ? 
          <>
            <Label>{lang.createMarket.createDeposit}</Label>
            <Row centerVertical>
              <Image source={smartupIcon} M />
              <Col flex={1} spacingRightXS spacingLeftXS>
                <Input background L disabled value={'2500'} />
              </Col>
              <Text rightText>SmartUp</Text>
            </Row>
            <Row spacingTopL spaceBetween>
              <Back />
              <Button label={lang.createMarket.create} primary onClick={create} extended disabled={isFetching} />
            </Row>
          </>
        :
        <>
            <Col center centerVertical flex={1}>
              <Image source={successImg} size={'150px'} />
              <Col spacingTopL spacingBottomL>
                <Text XL wordSpaceL center> {lang.createMarket.creating} </Text>
              </Col>
              <Link>
                {
                  ({goto}) =>
                <Button label={lang.createMarket.preview} primary onClick={()=>goto.trading({id: marketId})} extended />
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