/*
  # H1
  ## H2
  ### H3
  #### H4
  ##### H5
  ###### H6
  italics:        _text_
  bold:           **text**
  bold + italics: **_text_**
  Strikethrough:  ~~text~~
  code:           `text`
  Blockquote:    > text
  link:           [link](https://test.com)
  img:            ![alt text](img.png "text")
  videos:         [![IMAGE ALT TEXT HERE](img.jpg)](http://vidoes)
*/

import React, { useRef, useEffect, useState } from 'react'
import styled, {css} from 'styled-components'
import { TextStyle } from '../TextInput'
import { StaticToolbar, toolbarPlugin } from './Toolbar'
import { imagePlugins, AlignmentTool } from './Image'
import 'draft-js-alignment-plugin/lib/plugin.css'
import 'draft-js-focus-plugin/lib/plugin.css'
// import createLinkifyPlugin from 'draft-js-linkify-plugin'
// import 'draft-js-linkify-plugin/lib/plugin.css'

import { InputWrapper } from '../Common'

import Editor from 'draft-js-plugins-editor'
import { SelectionState, convertFromRaw, convertToRaw, EditorState, CompositeDecorator, DefaultDraftBlockRenderMap } from 'draft-js'
import Text, { A } from '../../Text'
import { Col } from '../../Layout'
import Immutable from 'immutable'
import { markdownToDraft, draftToMarkdown } from 'markdown-draft-js';
// const linkRegex = /https?:\/\/\S+/g
// const linkRegex = /https?:\/\/\S+/
// const boldRegex = /\[B\].+\[\/B]/
// const combineRegex = /(https?:\/\/\S+)|(\[B\].+\[\/B])/

// const linkifyPlugin = createLinkifyPlugin({
//   component: (props) => (
//     <a {...props} style={{ color: 'red' }} onClick={() => alert('Clicked on Link!')} />
//   )
// })

const decorator = new CompositeDecorator([
  {
    strategy: linkMarkupStrategy,
    component: Link,
  },
])

const plugins = [toolbarPlugin, ...imagePlugins]

const Box = styled.div.attrs(p => ({background: p.editor}))`
  ${TextStyle}
  padding: 0;
  cursor: text;
  ${p => p.editor && css`
    min-height: 150px; 
    max-height: 400px; 
    overflow: auto; 
    padding: 0 8px 8px 8px`}
`
function linkMarkupStrategy(contentBlock, callback, contentState) {
  contentBlock.findEntityRanges(
    (character) => {
      const entityKey = character.getEntity()
      return (
        entityKey !== null &&
        contentState.getEntity(entityKey).getType() === 'LINK'
      );
    },
    callback
  )
}

function Link({ children, entityKey, contentState }) {
  const data = contentState.getEntity(entityKey).getData()  
  return <A href={data.url || children} target="_blank">{children}</A>
}
    
function toRaw(editorState, isJs) {
  return (isJs ? JSON.stringify : draftToMarkdown)(
    convertToRaw(
      editorState.getCurrentContent()
    )
  )
}

const emptyEditor = EditorState.createEmpty()
function toRich(s, isJs) {
  return !s ? EditorState.createEmpty() : EditorState.createWithContent(
    convertFromRaw(
      isJs ? JSON.parse(s) :
      markdownToDraft(
        s.replace(/\n +/g, n => n.replace(/ /g, '&nbsp;')).replace(/[^\n]\n\n/g, n => n + '\n') // TODO
        , {
        remarkablePreset: {
          linkify: true
        },
        preserveNewlines: true
      })
      ),
    decorator
  )
}

const blockRenderMap = Immutable.Map({
  'unstyled': {
    element: 'div',
    wrapper: <Text note />,
  }
});

const extendedBlockRenderMap = DefaultDraftBlockRenderMap.merge(blockRenderMap);

export default 
  ({ onChange, onBlur,
    isJs, editor, 
    value, children, disabled, 
    label, error, description,
    ...rest
  }) => {
    const refEditor = useRef(null)
    const [editorState, setEditorState] = useState(emptyEditor)
    const [editorError, setError] = useState(null)
    const displayError = editorError ? editorError.message : error
    window.r = refEditor
    useEffect( () => {
      setEditorState(toRich(value || children, isJs))
      const elms = document.getElementsByClassName('draftJsEmojiPlugin__button__qi1gf')
      if (elms.length) 
        for (let index = 0; index < elms.length; index++) 
          elms[index].setAttribute('tabindex', -1)
    }, [])
    return (
      <InputWrapper label={label} error={displayError} description={description}>
        <Box onClick={() => refEditor.current.focus()} {...rest} editor={editor}>
          {editor && <StaticToolbar editorState={editorState} onChange={setEditorState} onError={setError} /> }
          {/* <div onClick={() => setView(true)}>view</div> */}
          <Editor
            ref={refEditor}
            editorState={editorState}
            onChange={editorState => {(onChange || setEditorState)(editorState); setError(null)}}
            onBlur={() => onBlur(toRaw(editorState, isJs))}
            readOnly={disabled}
            blockRenderMap={extendedBlockRenderMap}
            // onTab={console.log}
            // decorator={decorator}
            plugins={plugins}
          />
          <AlignmentTool />
          {/* <div onClick={() => setEditorState(toRich(value || children, isJs))} >{JSON.stringify(value)}</div> */}
        </Box>
      </InputWrapper>
    )
  }

