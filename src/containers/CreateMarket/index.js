import React, { useState } from 'react'
import styled from 'styled-components'
import Text from '../../components/Text'
import Input from '../../components/Input'
import Hr from '../../components/Hr'
import Button from '../../components/Button'
import Image from '../../components/Image'
import ProgressBar from '../../components/ProgressBar'
import { Row, Col } from '../../components/Layout'
import ethIcon from '../../images/eth.png';
import smartupIcon from '../../images/smartup.png';
import successImg from '../../images/market_success.png';
import { connect } from 'react-redux';
import { setActiveIndex } from '../../actions/createMarket'

const options = ['Basic Information', 'Price Equation', 'Deposit']
const CreateMarket = ({activeIndex, setActiveIndex}) => {
  function next() { setActiveIndex(1) }
  function back() { setActiveIndex(-1) }
  const Label = ({ children }) => <Text S spaceV>{children}</Text>
  return (
    <Col>
      <Col center spacingBottomXS spacingTopXS>
        <Text center>CREATE MARKET</Text>
      </Col>
      <Hr />
      {
        activeIndex < options.length && 
        <ProgressBar options={options} activeIndex={activeIndex} onClick={setActiveIndex} />
      }

      <Col spacingLeftS spacingRightS>
      {
        activeIndex === 0 ? 
          <>
            <Label>Market Name</Label>
            <Input background XL />
            <Text S right>Capital sensitive, 3-20 characters, community name cannot be changed.</Text>
            <Label>Market description</Label>
            <Input background L line={3} />
            <Text S right>150 characters to help new members get to know your community.</Text>
            <Row spacingTopL right>
              <Button label='Next' primary extended onClick={next} />
            </Row>
          </>
        :
          activeIndex === 1 ? 
          <>
            <Label>Price equation of the market token</Label>
            <Input background L />
            <Label>Preview price movement</Label>
            <Col>I am a graph</Col>
            <Row spacingTopL spaceBetween>
              <Button label='Back' primary extended onClick={back} />
              <Button label='Next' primary extended onClick={next} />
            </Row>
          </>
        :
          activeIndex === 2 ? 
          <>
            <Label>Market creation deposit</Label>
            <Row centerVertical>
              <Image source={smartupIcon} M />
              <Col flex={1} spacingRightXS spacingLeftXS>
                <Input background L disabled value={'1000'} />
              </Col>
              <Text rightText>SmartUp</Text>
            </Row>
            <Col spacingTopM>
              <Label>Trading speed</Label>
              <Row centerVertical>
                <Col spacingRightXS>
                  <Image source={ethIcon} M />
                </Col>
                <Label>ETH needed for trading: </Label>
                <Col flex={1} spacingLeftXS>
                  <Input background L />
                </Col>
              </Row>
              <Row spacingTopL spaceBetween>
                <Button label='Back' primary extended onClick={back} />
                <Button label='Create' primary width={'80px'} onClick={next} extended />
              </Row>
            </Col>
          </>
        :
        <>
            <Col center centerVertical height={'80vh'}>
              <Image source={successImg} size={'150px'} />
              <Col spacingTopL spacingBottomL>
                <Text XL wordSpaceL center>MAKRET IS CREATED SUCCESSFULLY!</Text>
              </Col>
              <Button label='Explore Market' primary onClick={next} extended />
            </Col>
          </>
      }
      </Col>
    </Col>
  )
}

const mapStateToProps = state => ({
  activeIndex: state.createMarket.activeIndex,
});
const mapDispatchToProps = {
  setActiveIndex,
} 

export default connect(mapStateToProps, mapDispatchToProps)(CreateMarket);