import React from 'react'
import { Row, Col } from '../../../components/Layout'
import Text from '../../../components/Text'
import Avatar from '../../../components/Avatar'
import { Bookmarked, Share, Like, Dislike, Reply } from '../../../components/Icon'
import { Link } from '../../../routes'

import { toToken, toAgo, toFullDate, shorten } from '../../../lib/util'
import theme from '../../../theme'
import { connect } from 'react-redux'
import { toggleLikePost, toggleDislikePost, toggleFollowPost } from '../../../actions/post'

function DiscussionItem ({ post, isDetailView, toggleLikePost, toggleDislikePost, toggleFollowPost }) {
  const { id, authorName, time, title, content, isCollect, isLiked, isDisliked, numberOfLike = 1000, numberOfDislike = 2000, numberOfComment = 3000, marketId, lastReply } = post
  function like(e) {
    e.preventDefault(); e.stopPropagation();
    toggleLikePost({id, isLiked, isDisliked})
  }
  function dislike(e) {
    e.preventDefault(); e.stopPropagation();
    toggleDislikePost({id, isLiked, isDisliked})
  }
  return (
    <Link>
      {({ goto }) => 
        <Row spaceBetween spacingM onClick={isDetailView ? undefined : () => goto.discussionDetail({ postId: id, id: marketId })}>
          <Col flex={1} overflowHidden RightXL>
            <Text S note>{`Posted by ${shorten(authorName)}, about ${toAgo(time)}`}</Text>
            <Text VXS>{title}</Text>
            {
              isDetailView ?
                <Text S note BottomS>{content}</Text>
              :
                lastReply && 
                <Row centerVertical BottomS>
                  <Avatar XS icon={lastReply.avatarIpfsHash} />
                  <Text S note textOverflow>{lastReply.content}</Text>
                </Row>
            }
            <Row centerVertical>
              <Like onClick={like} S color={isLiked ? theme.green : theme.white} MarginRightBase /><Text RightM>{numberOfLike}</Text>
              <Dislike onClick={dislike} S color={isDisliked ? theme.red : theme.white} MarginRightBase /><Text RightM>{numberOfDislike}</Text>
              <Reply S color={theme.white} MarginRightBase /><Text RightM>{numberOfComment}</Text>
            </Row>
          </Col>
          <Row>
            <Share S color={theme.white} MarginRightS />
            <Bookmarked S color={theme.white} checked={isCollect} onClick={(e) => toggleFollowPost(e, id, isCollect)} />
          </Row>
        </Row>
      }
    </Link>
  )
}

const mapDispatchToProps = {
  toggleLikePost, toggleDislikePost, toggleFollowPost
}

export default connect(null, mapDispatchToProps)(DiscussionItem)