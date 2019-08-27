import React from 'react'
import Text from 'components/Text'
import { toDateTime, toToken } from '../../lib/util'

export function DateText({ value, ...rest }) {
  return <Text center {...rest}>{toDateTime(value)}</Text>
}

export function TokenText({ value, ...rest }) {
  return <Text center {...rest}>{toToken(value)}</Text>
}