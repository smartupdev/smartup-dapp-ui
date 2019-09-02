import React, { useRef } from 'react'
import { Search } from '../../components/Icon'
import Text from '../../components/Text'
import Input from '../../components/Input'
import { Row } from '../../components/Layout'
import { media } from '../../components/Theme'
import { useLang } from '../../language'
import { length, noHandle } from '../../lib/util'
import styled, { css } from 'styled-components'

const Container = styled.div`
  position: absolute;
  cursor: pointer;
  ${p => p.backgroundColor &&
    p.backgroundColor instanceof Array ?
    media(`background-color: ${p.backgroundColor[0]}`, `background-color: ${p.backgroundColor[1]}`) :
    css`background-color: ${p.backgroundColor}`
  };
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
    ${media('width: 0;')}
    :focus {
      width: 2000px;
    }
    padding-right: 2px;
    ${media(`
      ::-webkit-input-placeholder {
        opacity: 0;
      }
    `)}
  }
`
const Dump = styled(Text).attrs(() => ({
  MarginLeftXS: true,
  RightBase: true,
  S: true,
}))`
  visibility: hidden;
  height: ${p => p.theme.imageSizeL};
  min-width: 30px;
  margin-right: ${p => p.theme.imageSizeS};
` // magic number

// MUST set relative outside
export default ({ backgroundColor, value, onChange, onSearch, top, bottom, right }) => {
  const [{ search: searchText }] = useLang()
  const inputRef = useRef(null)
  const size = Math.min( Math.max(length(searchText), length(value)), 20 )
  function onClickIcon(e) {
    document.activeElement === inputRef.current ? 
      inputRef.current.blur() : inputRef.current.focus()
    noHandle(e)
  }
  return (
    <>
      <Dump>{value && value.slice(0, 20)}</Dump>
      <Container backgroundColor={backgroundColor} top={top} bottom={bottom} right={right}>
        <Row centerVertical fullHeight spaceBetween>
          <Input inputRef={inputRef} value={value} size={size} placeholder={searchText} onChange={onChange} onBlur={onSearch} S backgroundColor={backgroundColor} />
          <Search S RightXS onMouseDown={onClickIcon} />
        </Row>
      </Container>
    </>
  )
}