import React from 'react'
import { Row, Col } from '../../components/Layout'
import Text from '../../components/Text'
import { Bookmarked, Share, Like, Dislike, Reply } from '../../components/Icon'

import { toToken, toAgo, toFullDate, shorten } from '../../lib/util'
import theme from '../../theme'

export default function ({ post, onClick }) {
  const { id, authorName, time, title, content, numberOfLike = 1000, numberOfDislike = 2000, numberOfComment = 3000 } = post
  return (
    <Row spaceBetween spacingM onClick={onClick}>
      <Col flex={1} overflowHidden RightXL>
        <Text S note>{`Posted by ${shorten(authorName)}, about ${toAgo(time)}`}</Text>
        <Text VXS>{title}</Text>
        <Text S note textOverflow>{content}</Text>
        <Row centerVertical TopM>
          <Like S color={theme.green} MarginRightBase /><Text RightM>{numberOfLike}</Text>
          <Dislike S color={theme.red} MarginRightBase /><Text RightM>{numberOfDislike}</Text>
          <Reply S color={theme.white} MarginRightBase /><Text RightM>{numberOfComment}</Text>
        </Row>
      </Col>
      <Row>
        <Share S color={theme.white} MarginRightS />
        <Bookmarked S color={theme.white} />
      </Row>
    </Row>
  )
}