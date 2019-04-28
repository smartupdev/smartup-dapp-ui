import React, { useEffect, useState } from 'react'

import DiscussionItem from './DiscussionItem'
import { Row, Col } from '../../components/Layout'
import Text from '../../components/Text'
import TextInput from '../../components/Input'
import Avatar from '../../components/Avatar'
import Button from '../../components/Button'
import { DonutLoader } from '../../components/Loader'
import { Bookmarked, Share, Like, Dislike, Reply } from '../../components/Icon'

import { shorten, toAgo } from '../../lib/util'
import theme from '../../theme'

import { getUrlParams } from '../../routes'
import { connect } from 'react-redux'
import { getPost, onChangeNewComment, reply, getReplyList, toggleLikeReply, toggleDislikeReply } from '../../actions/post'

function DiscussionDetail({
  post, gettingDetail, getDetailError, 
  newComment, replying,
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
        loggedIn && 
        <Row top>
          <Avatar icon={userAvatar} username={username} />
          <Col flex={1} LeftS>
            <TextInput background value={newComment} onChange={onChangeNewComment} disabled={replying} line={4} />
            <Col right TopBase>
              <Button primary HXL label='Save' onClick={reply} disabled={replying} />
            </Col>
          </Col>
        </Row>
      }
      {!!replys.length && 
      replys.map( ({ id, userAvatar, username, userAddress, content, isDisliked, isLiked, createTime }) => 
        <Row key={id} top TopS BottomXS>
          <Col TopXS>
            <Avatar icon={userAvatar} username={username || shorten(userAddress)} />
          </Col>
          <Col LeftS TopBase>
            <Col bgLight spacingXS round fitWidth>
              <Text note newline>{content}</Text>
            </Col>
            <Row centerVertical TopXS>
              <Like S color={isLiked ? theme.green : theme.white} MarginRightBase onClick={() => toggleLikeReply({id, isLiked, isDisliked})} />
              <Dislike S color={isDisliked ? theme.red : theme.white} MarginRightBase onClick={() => toggleDislikeReply({id, isLiked, isDisliked})}/>
              <Text note>{toAgo(createTime)}</Text>
            </Row>
          </Col>
          <Row flex={1} right TopXS>
            <Share S color={theme.white} MarginRightS />
            <Bookmarked S color={theme.white} />
          </Row>
        </Row>
      )
      
      // JSON.stringify(replys)
      }
      </Col>
    </Col>
  )
}

const mapStateToProps = state => {
  const { 
    newComment, replying, 
    replys, gettingReply, getReplyError, 
    detail: post, gettingDetail, getDetailError, 
  } = state.post
  const { loggedIn, userName: username, userAvatar } = state.user
  return {
    newComment, replying,
    replys, gettingReply, getReplyError,
    post, gettingDetail, getDetailError,
    loggedIn, username, userAvatar
  }
}

const mapDispatchToProps = {
  getPost, onChangeNewComment, reply, getReplyList, toggleLikeReply, toggleDislikeReply
}

export default connect(mapStateToProps, mapDispatchToProps)(DiscussionDetail);