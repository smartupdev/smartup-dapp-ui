import React from 'react'

import { Row, Col } from '../../../components/Layout'
import Text from '../../../components/Text'
import Avatar from '../../../components/Avatar'
import { Bookmarked, Share, Like, Dislike, Reply } from '../../../components/Icon'

import { shorten, toAgo } from '../../../lib/util'
import theme from '../../../theme'

import { connect } from 'react-redux'
import { toggleLikeReply, toggleDislikeReply, toggleFollowReply } from '../../../actions/post'

function DiscussionComment({ 
  reply: {id, userAvatar, username, userAddress, content, isDisliked, isLiked, createTime, isCollect, numberOfLike, numberOfDislike },
  toggleLikeReply, toggleDislikeReply, toggleFollowReply
}) {
  return (
    <Row key={id} top spacingM>
      <Col TopXS>
        <Avatar icon={userAvatar} username={username || userAddress} />
      </Col>
      <Col LeftS TopBase>
        <Col bgLight spacingXS round fitWidth>
          <Text note newline>{content}</Text>
        </Col>
        <Row centerVertical TopXS>
          <Row centerVertical onClick={(e) => toggleLikeReply(e, { id, isLiked, isDisliked })}>
            <Like S color={isLiked ? theme.green : theme.white} MarginRightBase />
            <Text RightM>{numberOfLike}</Text>
          </Row>
          <Row centerVertical onClick={(e) => toggleDislikeReply(e, { id, isLiked, isDisliked })}>
            <Dislike S color={isDisliked ? theme.red : theme.white} MarginRightBase />
            <Text RightM>{numberOfDislike}</Text>
          </Row>
          <Text note>{toAgo(createTime)}</Text>
        </Row>
      </Col>
      <Row flex={1} right TopXS LeftXS>
        <Share S color={theme.white} MarginRightS />
        <Bookmarked S color={theme.white} checked={isCollect} onClick={(e) => toggleFollowReply(e, id, isCollect)} />
      </Row>
    </Row>
  )
}


const mapDispatchToProps = {
  toggleLikeReply, toggleDislikeReply, toggleFollowReply
}

export default connect(null, mapDispatchToProps)(DiscussionComment);