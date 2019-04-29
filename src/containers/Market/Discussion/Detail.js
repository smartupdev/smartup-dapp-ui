import React, { useEffect, useState } from 'react'

import DiscussionItem from './Item'
import DiscussionComment from './Comment'
import { Row, Col } from '../../../components/Layout'
import Text from '../../../components/Text'
import TextInput from '../../../components/Input'
import Avatar from '../../../components/Avatar'
import Button from '../../../components/Button'
import { DonutLoader } from '../../../components/Loader'
import { Bookmarked, Share, Like, Dislike, Reply } from '../../../components/Icon'

import { shorten, toAgo } from '../../../lib/util'
import theme from '../../../theme'

import { getUrlParams } from '../../../routes'
import { connect } from 'react-redux'
import { getPost, onChangeNewComment, reply, getReplyList, toggleLikeReply, toggleDislikeReply } from '../../../actions/post'

function DiscussionDetail({
  post, gettingDetail, getDetailError, 
  newComment, replying, replyError,
  gettingReply, replys,
  getPost, getReplyList, reply, onChangeNewComment,
  loggedIn, username, userAvatar,
  toggleLikeReply, toggleDislikeReply,
}) {
  const { postId } = getUrlParams()
  useEffect( () => {
    getPost(postId)
    getReplyList(postId)
  }, [])

  if(getDetailError) return <Text>{getDetailError.message}</Text>
  if(gettingDetail || !post) return <DonutLoader page />

  return (
    <Col>
      <DiscussionItem post={post} isDetailView />
      <Col spacingM>
      {
        loggedIn ? 
          <Row top>
            <Avatar icon={userAvatar} username={username} />
            <Col flex={1} LeftS>
              <TextInput background value={newComment} onChange={onChangeNewComment} disabled={replying} line={4} />
              <Col right TopBase>
                <Button primary HXL label='Save' onClick={reply} disabled={replying} />
                {replyError && <Text S error>{replyError.message}</Text>}
              </Col>
            </Col>
          </Row>
        :
          <Text center note>Please login to comment</Text>
      }
      </Col>
      {!!replys.length && 
        replys.map(reply => <DiscussionComment reply={reply} key={reply.id} />)
      }
    </Col>
  )
}

const mapStateToProps = state => {
  const { 
    newComment, replying, replyError,
    replys, gettingReply, getReplyError, 
    detail: post, gettingDetail, getDetailError, 
  } = state.post
  const { loggedIn, userName: username, userAvatar } = state.user
  return {
    newComment, replying, replyError,
    replys, gettingReply, getReplyError,
    post, gettingDetail, getDetailError,
    loggedIn, username, userAvatar
  }
}

const mapDispatchToProps = {
  getPost, onChangeNewComment, reply, getReplyList, toggleLikeReply, toggleDislikeReply
}

export default connect(mapStateToProps, mapDispatchToProps)(DiscussionDetail);