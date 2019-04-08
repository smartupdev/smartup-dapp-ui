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

const options = ['Basic Information', 'Price Equation', 'Deposit']
export default () => {
  const [activeIndex, setIndex] = useState(0)
  function next() { setIndex(activeIndex+1) }
  const Label = ({ children }) => <Text S spaceV>{children}</Text>
  return (
    <Col>
      <Col center spacingBottomXS spacingTopXS>
        <Text center>CREATE MARKET</Text>
      </Col>
      <Hr />
      {
        activeIndex < options.length && 
        <ProgressBar options={options} activeIndex={activeIndex} onClick={setIndex} />
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
          </>
        :
          activeIndex === 1 ? 
          <>
            <Label>Price equation of the market token</Label>
            <Input background L />
            <Label>Preview price movement</Label>
            <Col>I am a graph</Col>
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
              <Col right spacingTopL spacingRightS>
                <Button label='Create' primary width={'80px'} onClick={next} />
              </Col>
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
        <Col right spacingTopL spacingRightS>
          { activeIndex < options.length -1 && <Button label='Next' primary width={'80px'} onClick={next} /> }
        </Col>
    </Col>
  )
}