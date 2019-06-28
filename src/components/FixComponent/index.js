import React, { cloneElement } from 'react'

export default ({ children }) => 
  <>
    { cloneElement(children, { style: {visibility: 'hidden', minHeight: 'fit-content'} }) }
    { cloneElement(children, { style: {position: 'absolute', top: 0} }) }
  </>
