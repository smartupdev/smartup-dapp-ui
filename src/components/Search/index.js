import React from 'react'
import { Search } from '../../components/Icon'
// import Text from '../../components/Text'
import Input from '../../components/Input'
import { Row } from '../../components/Layout'
import styled, { css } from 'styled-components'

const Container = styled.div`
  position: absolute;
  cursor: pointer;
  ${p => p.backgroundColor && css`background-color: ${p.backgroundColor}`};
  right: 0;
  max-width: 100%;
  transition: 0.3s;
  top: 0;
  bottom: 0;
  ${p => p.top && css`top: ${p.top};`}
  ${p => p.bottom && css`bottom: ${p.bottom};`}
  ${p => p.right && css`
    right: ${p.right}; 
    max-width: calc( 100% - ${p.right});`}
  svg {
    fill: ${p => p.theme.colorSecondary}
  }
  input {
    :focus {
      width: 2000px;
    }
    width: 44px;
  }
`
const Dump = styled.div`
  height: ${p => p.theme.imageSizeL};
  width: 80px; 
` // margin number

// MUST set relative outside
export default ({ id = '', backgroundColor, content, onChange, onSearch, top, bottom, right }) => {
  return (
    <>
      <Dump />
      <Container backgroundColor={backgroundColor} top={top} bottom={bottom} right={right}>
        <Row centerVertical fullHeight spaceBetween>
          <Input id={id + "search"} value={content} placeholder='Search' onChange={e => onChange(e.target.value)} onBlur={onSearch} />
          {/* <Text note>Search</Text> */}
          <label htmlFor={id + "search"}>
            <Search S RightXS />
          </label>
        </Row>
      </Container>
    </>
  )
}