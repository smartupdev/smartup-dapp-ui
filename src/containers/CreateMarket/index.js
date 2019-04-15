import React, { useEffect } from 'react'
// import styled from 'styled-components'
import Text from '../../components/Text'
import Input, { Selector } from '../../components/Input'
import Hr from '../../components/Hr'
import Button from '../../components/Button'
import Image from '../../components/Image'
import ProgressBar from '../../components/ProgressBar'
import { Row, Col } from '../../components/Layout'
import ethIcon from '../../images/eth.png';
import smartupIcon from '../../images/smartup.png';
import successImg from '../../images/market_success.png';
import Chart from './Chart'

import { connect } from 'react-redux';
import { setActiveIndex, onChangeName, onChangeDesc, reset } from '../../actions/createMarket'
import { createMarket } from '../../actions/market'

const options = ['Basic Information', 'Price Equation', 'Deposit']
const optionsSpeed = ['Slow', 'Standard', 'Fast']
const CreateMarket = ({
  createMarketState: { activeIndex, name, desc, error }, 
  setActiveIndex, createMarket, onChangeName, onChangeDesc, reset}) => {

  function next() { setActiveIndex(activeIndex + 1) }
  function back() { setActiveIndex(activeIndex - 1) }
  const Label = ({ children }) => <Text S spaceV>{children}</Text>
  const Next = ({disabled}) =>  <Button label='Next' primary extended onClick={next} disabled={disabled} />
  const Back = () =>  <Button label='Back' primary extended onClick={back} />
  const page1Ready = !(error.name || error.desc || !name || !desc)
  const page2Ready = page1Ready
  const onChangeProgress = tab => 
    tab === 0 && setActiveIndex(tab) ||
    tab === 1 && page1Ready && setActiveIndex(tab) ||
    tab === 2 && page2Ready && setActiveIndex(tab)
  
  useEffect( () => {
    return reset
  }, [])
  
  return (
    <Col>
      <Col center spacingBottomXS spacingTopXS>
        <Text center>CREATE MARKET</Text>
      </Col>
      <Hr />
      {
        activeIndex >= 0 && 
        <ProgressBar options={options} activeIndex={activeIndex} onClick={onChangeProgress} />
      }

      <Col spacingLeftS spacingRightS>
      {
        activeIndex === 0 ? 
          <>
            <Label>Market Name</Label>
            <Input background XL value={name} onChange={e => onChangeName(e.target.value)} />
            <Text S right error={error.name}>Capital sensitive, 3-20 characters, community name cannot be changed.</Text>
            <Label>Market description</Label>
            <Input background L line={3} value={desc} onChange={e => onChangeDesc(e.target.value)} />
            <Text S right error={error.desc}>150 characters to help new members get to know your community.</Text>
            <Row spacingTopL right>
              <Next disabled={!page1Ready} />
            </Row>
          </>
        :
          activeIndex === 1 ? 
          <>
            <Label>Price equation of the market token</Label>
            <Col spacingBottomXS>
              <Input background L disabled value={'f(x) = 0.000074999921875 * ln(x) + 0.000000000015625 * x'} />
            </Col>
            <Label>Preview price movement</Label>
            <Col spacingLeftL spacingRightL spacingTopM>
              <Chart />
            </Col>
            <Row spacingTopL spaceBetween>
              <Back />
              <Next />
            </Row>
          </>
        :
          activeIndex === 2 ? 
          <>
            <Label>Market creation deposit</Label>
            <Row centerVertical>
              <Image source={smartupIcon} M />
              <Col flex={1} spacingRightXS spacingLeftXS>
                <Input background L disabled value={'2500'} />
              </Col>
              <Text rightText>SmartUp</Text>
            </Row>
            {/* <Col spacingTopM>
              <Label>Trading speed</Label>
              <Row centerVertical>
                <Col flex={1} spacingLeftXS>
                  <Selector showLabel options={optionsSpeed} selectedIndex={1} onClick={console.log} />
                </Col>
                <Col spacingRightXS>
                  <Image source={ethIcon} M />
                </Col>
                <Label>ETH needed for trading: </Label>
                <Col flex={1} spacingLeftXS>
                  <Input background L />
                </Col>
              </Row>
            </Col> */}
            <Row spacingTopL spaceBetween>
              <Back />
              <Button label='Create' primary onClick={createMarket} extended />
            </Row>
          </>
        :
        <>
            <Col center centerVertical height={'80vh'}>
              <Image source={successImg} size={'150px'} />
              <Col spacingTopL spacingBottomL>
                <Text XL wordSpaceL center>MAKRET IS CREATED SUCCESSFULLY!</Text>
              </Col>
              <Button label='Explore Market' primary onClick={console.log} extended />
            </Col>
          </>
      }
      </Col>
    </Col>
  )
}

const mapStateToProps = state => ({
  createMarketState: state.createMarket,
});
const mapDispatchToProps = {
  setActiveIndex, createMarket, onChangeName, onChangeDesc, reset
} 

export default connect(mapStateToProps, mapDispatchToProps)(CreateMarket);