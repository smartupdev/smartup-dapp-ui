import React, { useRef } from 'react'
import { Search } from '../../components/Icon'
import Text from '../../components/Text'
import Input from '../../components/Input'
import { Row } from '../../components/Layout'
import { media, colorCss } from '../../components/Theme'
import { useLang } from '../../language'
import { length, noHandle } from '../../lib/util'
import styled, { css } from 'styled-components'

const Container = styled.div`
  ${colorCss}
  position: absolute;
  cursor: pointer;
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
  MarginLeftM: true,
  VS: true,
  RightBase: true,
  S: true,
}))`
  visibility: hidden;
  height: ${p => p.theme.imageSizeXS};
  ${media(null, p => `
    min-width: ${p.size * 6 + 6 + 2}px;
  `)}
  margin-right: ${p => p.theme.imageSizeS};
`

// MUST set relative outside
export default ({ customBgColor, value, onChange, onSearch, top, bottom, right }) => {
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
      <Dump size={size}>{value && value.slice(0, 20)}</Dump>
      <Container customBgColor={customBgColor} top={top} bottom={bottom} right={right}>
        <Row centerVertical fullHeight spaceBetween>
          <Input inputRef={inputRef} value={value} size={size} placeholder={searchText} onChange={onChange} onBlur={onSearch} S />
          <Search S RightXS onMouseDown={onClickIcon} />
        </Row>
      </Container>
    </>
  )
}