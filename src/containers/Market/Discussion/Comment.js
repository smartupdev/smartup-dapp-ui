import React from 'react'

import { Link } from '../../../routes'

import { Row, Col } from '../../../components/Layout'
import Text from '../../../components/Text'
import Avatar from '../../../components/Avatar'
import { Bookmarked, Like, Dislike } from '../../../components/Icon'

import { toAgo } from '../../../lib/util'
import { useLang } from '../../../language'

import theme from '../../../theme'

import { connect } from 'react-redux'
import { toggleLikeReply, toggleDislikeReply, toggleFollowReply } from '../../../actions/post'

function DiscussionComment({ 
  loggedIn,
  post, marketId,// for personal center
  reply: {id, userAvatar, username, userAddress, content, isDisliked, isLiked, createTime, isCollect, numberOfLike, numberOfDislike },
  toggleLikeReply, toggleDislikeReply, toggleFollowReply
}) {
  const [{ time: { now, min, hour, day } }] = useLang()
  return (
    <Row key={id} spacingM>
      <Col>
        {post && 
          <Link>
            {({ goto }) =>
              <Text L wordSpaceS onClick={() => goto.discussionDetail({ id: marketId, postId: post.postId })}>{post.title}</Text>
            }
          </Link>
        }
        <Row>
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
              <Text note>{toAgo(createTime, now, min, hour, day)}</Text>
            </Row>
          </Col>
        </Row>
      </Col>
      <Row flex={1} right TopXS LeftXS>
        {/* <Share S color={theme.white} MarginRightS /> */}
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