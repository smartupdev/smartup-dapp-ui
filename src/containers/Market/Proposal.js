import React from 'react'
import Text from '../../components/Text'
import Image from '../../components/Image'
import { Col } from '../../components/Layout'
import coming from '../../images/coming_soon.png'
import { useLang } from '../../language'
export default function() {
  const [lang] = useLang()
  console.log(lang.proposal)
  return (
    <Col center centerVertical height={'80vh'}>
      <Image source={coming} size={'250px'} />
      <Text center VM note> {lang.proposal.notReady} </Text>
    </Col>
  )  
}