import React, { useEffect, useRef, useState } from 'react'
import { Col } from '../Layout'
import Text from '../Text'
import Button from '../Button'
import { DonutLoader } from '../Loader'
import styled, { css } from 'styled-components'

const Box = styled(Col)`
  border: dashed 1px ${p => p.theme.borderColor};
  height: ${p => p.height};
  ${p => p.dragging && css`
    background-color: ${p.theme.bgColorDark};
  `}
`

const ImageBox = styled(Col)`

`

export default function ({ height = '200px', onDrop = console.log, isLoading = false }) {
  let dragCounter = 0
  const boxRef = useRef(null);
  const [dragging, setDragging] = useState(false)
  function nohandle(e) { e.preventDefault(); e.stopPropagation(); }
  function handleDragIn(e) {
    nohandle(e)
    dragCounter++
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0 && !isLoading) {
      setDragging(true)
    }
  }
  function handleDragOut(e) {
    nohandle(e)
    dragCounter--
    if (dragCounter > 0) return
    setDragging(false)
  }
  function handleDrop(e) {
    nohandle(e)
    setDragging(false)
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0 && !isLoading) {
      onDrop(e.dataTransfer.files)
      e.dataTransfer.clearData()
      dragCounter = 0
    }
  }
  useEffect(() => {
    const target = boxRef.current
    target.addEventListener('dragenter', handleDragIn)
    target.addEventListener('dragleave', handleDragOut)
    target.addEventListener('dragover', nohandle)
    target.addEventListener('drop', handleDrop)
    return () => {
      target.removeEventListener('dragenter', handleDragIn)
      target.removeEventListener('dragleave', handleDragOut)
      target.removeEventListener('dragover', nohandle)
      target.removeEventListener('drop', handleDrop)
    }
  }, [])

  return (
    <Box ref={boxRef} dragging={dragging} height={height} center centerVertical>
      <ImageBox>
        {
          isLoading ?
            <>
              <DonutLoader page />
              <Text note TopS>Uploading file</Text>
            </>
            :
            <>
              <Text BottomS note>Drag and drop a File Here</Text>
              <Button primary label='Browse' />
            </>
        }
      </ImageBox>
    </Box>
  )
} 