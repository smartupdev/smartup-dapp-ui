import React, { cloneElement } from 'react'

export default ({ children, left = 0 }) => 
  <>
    { cloneElement(children, { key: '1', style: {visibility: 'hidden', minHeight: 'fit-content', marginLeft: left} }) }
    { cloneElement(children, { key: '2', style: {position: 'absolute', left} }) }
  </>
