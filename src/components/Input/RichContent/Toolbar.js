import React from 'react'
import styled from 'styled-components'
import { Col, Row } from '../../Layout'
import Button from '../../Button'
import Text from '../../Text'

import { RichUtils } from 'draft-js'
import createToolbarPlugin from 'draft-js-static-toolbar-plugin'
import { addImage } from './Image'
import Uploader from '../../Uploader'
import { noHandle } from '../../../lib/util'

export const toolbarPlugin = createToolbarPlugin()
// const {Toolbar} = toolbarPlugin

const TopToolbarBox = styled(Row).attrs(p => ({ wrap: 'true' }))`
  position: sticky;
  top: 0;
  background-color: ${p => p.theme.bgColorLight }
  padding-bottom: 6px;
  padding-top: 10px;
  margin-bottom: 8px;
  border-bottom: solid 1px ${p => p.theme.borderColor}
`

const BLOCK_TYPES = [
  {label: 'Heading 1', style: 'header-one'},
  {label: 'Heading 2', style: 'header-two'},
  // {label: 'H3', style: 'header-three'},
  // {label: 'H4', style: 'header-four'},
  // {label: 'H5', style: 'header-five'},
  // {label: 'H6', style: 'header-six'},
  {label: 'Blockquote', style: 'blockquote'},
  {label: 'UL', style: 'unordered-list-item'},
  {label: 'OL', style: 'ordered-list-item'},
  {label: 'Code Block', style: 'code-block'},
]

const INLINE_STYLES = [
  { style: 'UNDERLINE', label: 'U' },
  { style: 'BOLD', label: 'B' },
  { style: 'ITALIC', label: 'I' },
  // { type: 'CODE', label: 'Monospace' },
]

const StyledText = styled(Text).attrs(p => ({
  nowrap: true,
  HXS: true,
}))`
  cursor: pointer;
`
export function StaticToolbar({ editorState, onChange, onError }) {
  function onClickStyle(e, type) { onClick(e, type, RichUtils.toggleInlineStyle) }
  function onClickBlock(e, type) { onClick(e, type, RichUtils.toggleBlockType) }
  function onClickImage(hash) { 
    onChange(addImage(editorState, hash)) 
  }
  function onClick(e, type, func) {
    noHandle(e)
    onChange(func(editorState, type))

  }
  const currentStyle = editorState.getCurrentInlineStyle()
  const currentType = editorState
    .getCurrentContent()
    .getBlockForKey(editorState.getSelection().getStartKey())
    .getType()
  return (
    <TopToolbarBox>
      {BLOCK_TYPES.map( ({style, label}) => 
        <StyledText key={style} primary={style === currentType} onMouseDown={e => onClickBlock(e, style)}>{label}</StyledText>
      )}
      {INLINE_STYLES.map( ({style, label}) => 
        <StyledText key={style} primary={currentStyle.has(style)} onMouseDown={e => onClickStyle(e, style)}>{label}</StyledText>
      )}
      <Uploader onChoose={onClickImage} onError={onError}>
        { ({openFinder, uploading}) => 
          <StyledText onMouseDown={e => {openFinder(); noHandle(e) }}>{uploading ? 'Uploading...' : 'Image'}</StyledText> }
      </Uploader>
    </TopToolbarBox>
  )
}