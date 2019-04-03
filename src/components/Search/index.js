import React, { useState } from 'react'
import { Search } from '../../components/Icon'
import Text from '../../components/Text'
import Input from '../../components/Input'
import { Col, Row } from '../../components/Layout'
import styled, { css } from 'styled-components'

const Container = styled.div`
  position: absolute;
  cursor: pointer;
  right: ${p => p.theme.spacingS};
  :focus-within { 
    left: ${p => p.theme.spacingS};
    transition: 0.5s;
  }
  top: 0;
  bottom: 0;
  svg {
    fill: ${p => p.theme.colorSecondary}
  }
`
const Dump = styled.div`
  height: ${p => p.theme.imageSizeL};
`

export default () => {
  return (
    <>
    <Dump />
    <Container>
      <Row centerVertical fullHeight spaceBetween>
        <Input id="search" placeholder='Search' size={6} />
        {/* <Text note>Search</Text> */}
        <label htmlFor="search">
         <Search S leftText />
        </label>
      </Row>
    </Container>
    </>
  )
}