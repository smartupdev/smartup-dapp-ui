import React from 'react'
import Text from '../../components/Text'
import Image from '../../components/Image'
import { Col } from '../../components/Layout'
import coming from '../../images/coming_soon.png'

import { useLang, lang } from '../../language'

export default () => {
  const [currentLang] = useLang()
  console.log(lang)
  return (
    <Col center centerVertical height={'80vh'}>
      <Image source={coming} size={'250px'} />
      <Text center VM note>Dispute function is under development, coming soon in later 2019!</Text>
    </Col>
  )
}