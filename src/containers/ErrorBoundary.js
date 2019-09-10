import React, { Component } from 'react'
import Image from '../components/Image'
import Text from '../components/Text'
import { Col } from '../components/Layout'
import PageImage from '../images/error.png'
import { LangConsumer } from '../language.js'
import { log } from '../lib/util'
export default class ErrorBoundary extends Component {
  state = { error: null }

  componentDidCatch(error, errorInfo) {
    log.error('Unexpected Error')
    log.error(error)
    log.error(errorInfo)
    this.setState({ error })
    // TODO: send error to server
  }

  render() {
    if (this.state.error) 
      return ( 
        <LangConsumer>
          { ([lang]) => 
            <Col center centerVertical HS flex={1}>
              <Image source={PageImage} size={'300px'} />
              <Text center XL note VS bold>{'奇怪了，錯誤出現'}</Text>
              <Text center note>{'請重新整理並再次嘗試'}</Text>
              <Text center note>{'錯誤訊息：' + this.state.error.message}</Text>
            </Col>  
          }
        </LangConsumer>
      )
    return this.props.children; 
  }
}