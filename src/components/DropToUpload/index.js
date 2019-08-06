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
import { useLang } from '../../language'
import Uploader from '../Uploader'
const Box = styled(Col)`
  border: dashed 1px ${p => p.theme.borderColor};
  height: ${p => p.height};
  ${p => p.dragging && css`background-color: ${p.theme.bgColorDark};`}
  ${p => !p.show && css`display: none;`}
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
  value, onChoose = console.log, error: userError,
  ...rest }) {
  const [{ dragFile }] = useLang()
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
      <Uploader onChoose={onChoose} disabled={value}>
        { ({ openFinder, error: _error = userError, uploading, dragRef, dragging }) => 
          <Box ref={dragRef} dragging={dragging} height={height} center centerVertical show={!value} {...rest}>
            {
              uploading ?
                <>
                  <DonutLoader page />
                  <Text note TopS> {dragFile.uploading} </Text>
                </>
                :
                <>
                  <Text BottomS note> {dragFile.dragFile} </Text>
                  <Button primary LeftXL RightXL label={dragFile.chooseFile} onClick={openFinder} />
                  {_error && <Text error S TopS>{_error.message || _error}</Text>}
                </>
            }
          </Box>
        }
      </Uploader>
    </>
  )
} 