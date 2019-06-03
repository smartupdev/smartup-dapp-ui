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

import React, { useRef } from 'react'
import Text, { A } from '../Text'
import { Editor, convertFromRaw, convertToRaw, EditorState, CompositeDecorator, RichUtils, DefaultDraftBlockRenderMap } from 'draft-js'
import Immutable from 'immutable'
import { markdownToDraft, draftToMarkdown } from 'markdown-draft-js';
// const linkRegex = /https?:\/\/\S+/g
// const linkRegex = /https?:\/\/\S+/
// const boldRegex = /\[B\].+\[\/B]/
// const combineRegex = /(https?:\/\/\S+)|(\[B\].+\[\/B])/

const decorator = new CompositeDecorator([
  {
    strategy: linkMarkupStrategy,
    component: Link,
  }
])

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
    
function toRaw(editorState) {
  return draftToMarkdown(
    convertToRaw(
      editorState.getCurrentContent()
    )
  )
}
function toRich(s) {
  return EditorState.createWithContent(
    convertFromRaw(
      markdownToDraft(s, {
        remarkablePreset: {
          linkify: true
        }
      })
    ),
    decorator
  )
}

const blockRenderMap = Immutable.Map({
  'unstyled': {
    element: 'div',
    wrapper: <Text />,
  }
});

const extendedBlockRenderMap = DefaultDraftBlockRenderMap.merge(blockRenderMap);

export default 
  ({ onChange = console.log, children, disabled, ...rest }) => {
    const ref = React.useRef(null);
    const editorState = toRich(children)
    window.e = editorState
    return (
      <Editor
        ref={ref}
        editorState={editorState}
        onChange={onChange}
        readOnly={disabled}
        blockRenderMap={extendedBlockRenderMap}
        // blockRendererFn={block => {
        //   const type = block.getType()
        //   console.log(type)
        //   window.b = block
        //   if(type === 'unstyled') {
        //     return {
        //       component: (p) => {
        //         return <Text>{block.getText()}</Text>
        //       },
        //     }
        //   }
        // }}
        // blockStyleFn={block => {
        //   if (block.getType() === "atomic") {
        //     return "atomic-block";
        //   }
        // }}
        // customStyleMap={{
        //   SELECTED: {
        //     background: "#e2f2ff"
        //   }
        // }}
        // plugins={plugins}
        {...rest}
      />
    )
  // }
  // <Text newline {...rest}>
  //   {Children.map(children, text => 
  //     typeof text === 'string' ?
  //     text
  //     .split(combineRegex)
  //     .map( t => 
  //       linkRegex.test(t) ? <A href={t}>{t}</A> :
  //       boldRegex.test(t) ? <Span bold inline>{t.slice(3, -4)}</Span> :
  //       t
  //     )
  //       : text
  //   )}
  // </Text>
  }

