import React from 'react'
import Text from 'components/Text'
import { toDateTime, toToken, toAgo } from '../../lib/util'
import { useLang } from '../../language'

export function DateText({ value, ...rest }) {
  return <Text center {...rest}>{toDateTime(value)}</Text>
}

export function TokenText({ value, ...rest }) {
  return <Text center {...rest}>{toToken(value)}</Text>
}

export function DateAgoText({ value, ...rest }) {
  const [{ time: { now, min, hour, day } }] = useLang()
  return <Text {...rest}>{toAgo(value, now, min, hour, day)}</Text>
}