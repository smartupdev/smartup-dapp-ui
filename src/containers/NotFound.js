import React from 'react'
import Image from '../components/Image'
import Text from '../components/Text'
import { Col } from '../components/Layout'
import PageNotFoundImage from '../images/404.png'
import { useLang } from '../language.js'
function NotFound() {
  const [lang] = useLang()
  return (
    <Col center centerVertical HS flex={1}>
      <Image source={PageNotFoundImage} size={'300px'} />
      <Text center XL note VS bold>{lang.notFound.omg}</Text>
      <Text center note>{lang.notFound.notExist}</Text>
      <Text center note>{lang.notFound.tryAgain}</Text>
    </Col>
  )
}
export default NotFound;