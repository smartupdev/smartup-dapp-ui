// under development
import React, { useState, createContext } from 'react'
import styled, { css, keyframes } from 'styled-components'
// import { People } from '../Icon'
// import Image from '../Image'
import Text from '../Text'
import { Row } from '../Layout'
import theme from '../../theme'
// import { ipfsHost } from '../../actions/ipfs'
// import { shorten } from '../../lib/util'

const SnackbarContext = createContext();

function SnackbarProvider({children}) {
  return (
    <SnackbarContext.Provider value=''>{children}</SnackbarContext.Provider>
  )
}

const Snackbar = styled.div`
  visibility: hidden;
  min-width: 250px;
  margin-left: -125px;
  background-color: #333;
  color: #fff;
  text-align: center;
  border-radius: 2px;
  padding: 16px;
  position: fixed;
  z-index: 1;
  left: 50%;
  bottom: 30px;
  font-size: 1rem;
  ${ p => p.show && css`
    visibility: visible;
    animation: ${fadein} 0.5s, ${fadeout} 0.5s 2.5s;  
  `}
`

const fadein = keyframes`
  from  { bottom: 0;    opacity: 0; }
  to    { bottom: 30px; opacity: 1; }
`
const fadeout = keyframes`
  from {bottom: 30px; opacity: 1;}
  to {bottom: 0; opacity: 0;}
`

export default ({ message }) => {
  const [isActive, setIsActive] = useState(false)
  return (
    <Snackbar>
      <Text>{message}</Text>
    </Snackbar>
  )
}