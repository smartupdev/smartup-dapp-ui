import React from 'react'
import Text from 'components/Text'
import Avatar from 'components/Avatar'
import { Col } from 'components/Layout'
import { toDateTime, toToken, toAgo } from '../../lib/util'
import { useLang } from '../../language'

export function AvatarTable({ record, ...rest }) {
  return <Avatar icon={record.userAvatar} username={record.username}  {...rest} />
}

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

export function LabelText({ label, text, width, right, sut, ...rest }) {
  return (
    <Col BottomS width={width} right={right} {...rest}>
      <Text S note BottomXXS>{label}</Text>
      <Text sut={sut}>{text}</Text>
    </Col>
  )
}
