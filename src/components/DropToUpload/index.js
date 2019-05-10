import React, { useEffect, useRef, useState } from 'react'
import { Col } from '../Layout'
import { CloseWithCircle } from '../Icon'
import Text from '../Text'
import Button from '../Button'
import Image from '../Image'
import { DonutLoader } from '../Loader'
import theme from '../../theme'
import styled, { css } from 'styled-components'
import { ipfsHost } from '../../actions/ipfs'

const Box = styled(Col)`
  border: dashed 1px ${p => p.theme.borderColor};
  height: ${p => p.height};
  ${p => p.dragging && css`background-color: ${p.theme.bgColorDark};`}
  ${p => !p.show && css`display: none;`}
`

const HiddenFile = styled.input`
  display: none;
`

const ImageBox = styled(Col)`
  ${p => !p.show && css`display: none;`}
`
const TextWrapper = styled(Col)`
  ${ImageBox}:hover &{
    display: flex;
  }
  display: none;
  position: absolute;
  top: 0; bottom: 0;
  right: 0; left: 0;
  background-color: rgba(100, 100, 100, .5)
`

// const IconWrapper = styled(Col)`
//   position: absolute;
//   right: -6px; top: -6px;
// `

export default function ({ 
  height = '200px', imageWidth = '100%', imageHeight = '200px', actualSize,
  value, onChoose = console.log, isLoading = false, 
  error,
  ...rest }) {
  let dragCounter = 0
  const boxRef = useRef(null)
  const inputRef = useRef(null)
  const [dragging, setDragging] = useState(false)
  const disabled = isLoading || value
  function nohandle(e) { e.preventDefault(); e.stopPropagation(); }
  function handleDragIn(e) {
    nohandle(e)
    dragCounter++
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0 && !disabled) {
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
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0 && !disabled) {
      onChoose(e.dataTransfer.files)
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
    <>
      <ImageBox show={value} center relative fitHeight>
        <Col relative fitHeight>
          <Image source={value && (ipfsHost + value)} cover width={imageWidth} height={imageHeight} actualSize={actualSize} />
          <TextWrapper centerVertical center onClick={() => onChoose()}>
            {/* <Text center>Click here to delete</Text> */}
            <CloseWithCircle M color={theme.black}  />
          </TextWrapper>
        </Col>
        {/* <Col relative>
          <IconWrapper>
            <Close round M />
          </IconWrapper>
        </Col> */}
      </ImageBox>
      <Box ref={boxRef} dragging={dragging} height={height} center centerVertical show={!value} {...rest}>
        {
          isLoading ?
            <>
              <DonutLoader page />
              <Text note TopS>Uploading file</Text>
            </>
            :
            <>
              <Text BottomS note>Drag a file here</Text>
              <Button primary LeftXL RightXL label='Choose file to upload' onClick={(e) => inputRef.current.click()} />
              <HiddenFile accept="image/x-png,image/gif,image/jpeg,image/png" type='file' id="browse" name="browse" ref={inputRef} value={''} onChange={e => onChoose(e.target.files)} />
              {error && <Text error S TopS>{error.message}</Text>}
            </>
        }
      </Box>
    </>
  )
} 