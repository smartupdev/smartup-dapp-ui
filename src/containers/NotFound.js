import React from 'react'
import Image from '../components/Image'
import Text from '../components/Text'
import { Col } from '../components/Layout'
import PageNotFoundImage from '../images/404.png'
function NotFound() {
  return (
    <Col center centerVertical HS flex={1}>
      <Image source={PageNotFoundImage} size={'300px'} />
      <Text center XL note VS bold>OH MY GOSH! YOU FOUND IT!!!</Text>
      <Text center note>Looks like the page you're trying to visit doesn't exists.</Text>
      <Text center note>Please check the URL and try your luck again.</Text>
    </Col>
  )
}
export default NotFound;