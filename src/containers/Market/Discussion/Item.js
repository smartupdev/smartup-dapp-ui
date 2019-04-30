import React from 'react'
import { Row, Col } from '../../../components/Layout'
import Text from '../../../components/Text'
import Avatar from '../../../components/Avatar'
import Image from '../../../components/Image'
import { Bookmarked, Share, Like, Dislike, Reply } from '../../../components/Icon'
import { Link } from '../../../routes'

import { toToken, toAgo, toFullDate, shorten } from '../../../lib/util'
import theme from '../../../theme'
import { connect } from 'react-redux'
import { toggleLikePost, toggleDislikePost, toggleFollowPost } from '../../../actions/post'
import { ipfsHost } from '../../../actions/ipfs'

function DiscussionItem ({ post, isDetailView, toggleLikePost, toggleDislikePost, toggleFollowPost }) {
  const { id, authorName, time, title, content, photo, isCollect, isLiked, isDisliked, numberOfLike = 1000, numberOfDislike = 2000, numberOfComment = 3000, marketId, lastReply } = post
  function like(e) {
    toggleLikePost(e, {id, isLiked, isDisliked})
  }
  function dislike(e) {
    toggleDislikePost(e, {id, isLiked, isDisliked})
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
                <>
                { content && <Text S note BottomS>{content}</Text>}
                { photo &&  <Image source={ipfsHost + photo} origin BottomS />}
                </>
              :
                lastReply && 
                <Row centerVertical BottomS>
                  <Avatar XS icon={lastReply.userAvatar} />
                  <Text S note textOverflow>{lastReply.content}</Text>
                </Row>
            }
            <Row centerVertical>
              <Row onClick={like}>
                <Like S color={isLiked ? theme.green : theme.white} MarginRightBase />
                <Text RightM>{numberOfLike}</Text>
              </Row>
              <Row onClick={dislike}>
                <Dislike S color={isDisliked ? theme.red : theme.white} MarginRightBase />
                <Text RightM>{numberOfDislike}</Text>
              </Row>
                <Reply S color={theme.white} MarginRightBase />
                <Text RightM>{numberOfComment}</Text>
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