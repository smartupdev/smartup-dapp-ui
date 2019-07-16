import React from 'react'
import Text from '../components/Text'
import { useLang } from '../language'
export default function () {
  const [{ noResult }] = useLang()
  return (
    <Text note center VS>{noResult}</Text>
  )
}