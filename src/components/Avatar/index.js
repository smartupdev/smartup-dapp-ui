import React from 'react'
// import styled, { css } from 'styled-components'
import { People } from '../../components/Icon'
import Image from '../../components/Image'
import theme from '../../theme'

export default ({ icon, ...rest }) => 
 icon ? 
  <Image source={icon} cover MarginRightXS {...rest} /> : 
  <People color={theme.white} round MarginRightXS {...rest} /> 

