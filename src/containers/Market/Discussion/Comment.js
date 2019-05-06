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
  loggedIn,
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
          <Row centerVertical disabled={!loggedIn} onClick={(e) => loggedIn && toggleLikeReply(e, { id, isLiked, isDisliked })}>
            <Like S color={isLiked ? theme.green : theme.white} MarginRightBase />
            <Text RightM>{numberOfLike || 0}</Text>
          </Row>
          <Row centerVertical disabled={!loggedIn} onClick={(e) => loggedIn && toggleDislikeReply(e, { id, isLiked, isDisliked })}>
            <Dislike S color={isDisliked ? theme.red : theme.white} MarginRightBase />
            <Text RightM>{numberOfDislike || 0}</Text>
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

const mapStateToProps = state => ({
  loggedIn: state.user.loggedIn,
});

const mapDispatchToProps = {
  toggleLikeReply, toggleDislikeReply, toggleFollowReply
}

export default connect(mapStateToProps, mapDispatchToProps)(DiscussionComment);