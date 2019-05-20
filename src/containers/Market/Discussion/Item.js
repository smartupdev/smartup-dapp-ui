import React from 'react'
import { Row, Col } from '../../../components/Layout'
import Text from '../../../components/Text'
import Avatar from '../../../components/Avatar'
import Image from '../../../components/Image'
import { Bookmarked, Share, Like, Dislike, Reply } from '../../../components/Icon'
import { Link, routeMap } from '../../../routes'

import { toAgo, shorten } from '../../../lib/util'
import theme from '../../../theme'
import { connect } from 'react-redux'
import { toggleLikePost, toggleDislikePost, toggleFollowPost } from '../../../actions/post'
import { ipfsHost } from '../../../actions/ipfs'

import { ToastConsumer } from 'react-toast-notifications'
import { share } from '../../../alphaWebService'
import { useLang } from '../../../language'

function DiscussionItem ({ loggedIn, post, isDetailView, toggleLikePost, toggleDislikePost, toggleFollowPost }) {
  const [lang] = useLang()
  const { id, username,userAddress, time, title, content, photo, isCollect, isLiked, isDisliked, numberOfLike = 1000, numberOfDislike = 2000, numberOfComment = 3000, marketId, lastReply } = post
  function like(e) {
    loggedIn &&
    toggleLikePost(e, {id, isLiked, isDisliked})
  }
  function dislike(e) {
    loggedIn &&
    toggleDislikePost(e, {id, isLiked, isDisliked})
  }
  return (
    <Link>
      {({ goto }) => 
        <Row spaceBetween spacingM onClick={isDetailView ? undefined : () => goto.discussionDetail({ postId: id, id: marketId })}>
          <Col flex={1} overflowHidden RightXL>
            <Text S note>{lang.discussion.post} {shorten(username || userAddress)}, {lang.discussion.about} {toAgo(time, lang.time.now, lang.time.min, lang.time.hour, lang.time.day)}</Text>
            <Text VXS>{title}</Text>
            {
              isDetailView ?
                <>
                { content && <Text S note BottomS>{content}</Text>}
                { photo &&  <Image source={ipfsHost + photo} actualSize BottomS />}
                </>
              :
                lastReply && 
                <Row centerVertical BottomS>
                  <Avatar XS icon={lastReply.userAvatar} />
                  <Text S note textOverflow>{lastReply.content}</Text>
                </Row>
            }
            <Row centerVertical>
              <Row onClick={like} disabled={!loggedIn}>
                <Like S color={isLiked ? theme.green : theme.white} MarginRightBase />
                <Text RightM>{numberOfLike}</Text>
              </Row>
              <Row onClick={dislike} disabled={!loggedIn}>
                <Dislike S color={isDisliked ? theme.red : theme.white} MarginRightBase />
                <Text RightM>{numberOfDislike}</Text>
              </Row>
                <Reply S color={theme.white} MarginRightBase />
                <Text RightM>{numberOfComment}</Text>
            </Row>
          </Col>
          <Row>
            <ToastConsumer>
              {
                ({add}) => <Share S color={theme.white} MarginRightS onClick={(e) => {
                  e.preventDefault(); e.stopPropagation();
                  share({postId: id, id: marketId}, routeMap.discussionDetail.path)
                  add('Link copied to clipboard.',{ appearance: 'info', autoDismiss: true })
                }} />
              }
            </ToastConsumer>
            <Bookmarked S color={theme.white} checked={isCollect} disabled={!loggedIn} onClick={(e) => loggedIn && toggleFollowPost(e, id, isCollect)} />
          </Row>
        </Row>
      }
    </Link>
  )
}


const mapStateToProps = state => ({
  loggedIn: state.user.loggedIn,
});

const mapDispatchToProps = {
  toggleLikePost, toggleDislikePost, toggleFollowPost
}

export default connect(mapStateToProps, mapDispatchToProps)(DiscussionItem)