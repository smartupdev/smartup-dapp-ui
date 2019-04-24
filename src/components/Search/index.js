import React from 'react'
import { Search } from '../../components/Icon'
// import Text from '../../components/Text'
import Input from '../../components/Input'
import { Row } from '../../components/Layout'
import styled, {css} from 'styled-components'

const Container = styled.div`
  position: absolute;
  cursor: pointer;
  ${p => p.backgroundColor && css`background-color: ${p.backgroundColor}`};
  right: 0;
  max-width: 100%;
  transition: 0.3s;
  top: 0;
  bottom: 0;
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
export default ({ id = '', backgroundColor, onChange,onSearchClick}) => {
  return (
    <>
    <Dump />
    <Container backgroundColor={backgroundColor}>
      <Row centerVertical fullHeight spaceBetween>
        <Input id={id+"search"} placeholder='Search' onChange={e => onChange(e.target.value)}/>
        {/* <Text note>Search</Text> */}
        <label htmlFor={id+"search"}>
         <Search S RightXS onClick={onSearchClick} />
        </label>
      </Row>
    </Container>
    </>
  )
}