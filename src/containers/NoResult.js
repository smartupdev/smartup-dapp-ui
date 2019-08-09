import React from 'react'
import Text from '../components/Text'
import { useLang } from '../language'
export default function ({ text }) {
  const [{ noResult }] = useLang()
  return (
    <Text note center VS>{text || noResult}</Text>
  )
}