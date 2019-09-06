import React, { useEffect, useRef } from 'react'

import DiscussionItem from './Item'
import DiscussionComment from './Comment'
import { Row, Col } from '../../../components/Layout'
import Text from '../../../components/Text'
import TextInput from '../../../components/Input'
import Avatar from '../../../components/Avatar'
import Button from '../../../components/Button'
import { DonutLoader } from '../../../components/Loader'

import ScrollLoader from '../../../components/ScrollLoader'

import { usePolling } from '../../../lib/react'

import { getUrlParams } from '../../../routes'
import { connect } from 'react-redux'
import { getPost, onChangeNewComment, reply, getReplyList, } from '../../../actions/post'
import { useLang } from '../../../language'

function DiscussionDetail({
  post, gettingDetail, getDetailError, 
  newComment, replying, replyError,
  gettingReply, replys,
  getPost, getReplyList, reply, onChangeNewComment,
  loggedIn, username, userAvatar,
  replyHasMore
}) {
  const { postId } = getUrlParams()
  useEffect( () => {
    getPost(postId)
  }, [])
  usePolling((_, first) => getReplyList(postId, false, first), 30000)
  const [lang] = useLang()
  const ref = useRef()
  if(getDetailError) return <Text>{getDetailError.message}</Text>
  if(gettingDetail || !post) return <DonutLoader page />
    return (
    <Col overflowAuto ref={ref} flex={1}>
      <DiscussionItem post={post} isDetailView />
      <Col spacingM>
      {
        loggedIn ? 
          <Row directions={['column', 'row']}>
            <Col top TopS RightS left>
              <Avatar icon={userAvatar} username={username} />
            </Col>
            <Col flex={1} TopS>
              <TextInput background value={newComment} onChange={onChangeNewComment} disabled={replying} line={4} />
              <Col right TopBase>
                <Button primary HXL label= {lang.discussion.reply} onClick={reply} disabled={replying} />
                {replyError && <Text S error>{replyError.message}</Text>}
              </Col>
            </Col>
          </Row>
        :
          <Text center note>{lang.discussion.loginToComment}</Text>
      }
      </Col>
      {!!replys.length && 
        replys.map(reply => <DiscussionComment reply={reply} key={reply.id} />)
      }
      <ScrollLoader target={ref} loadMore={() => getReplyList(postId, true)} isLoading={gettingReply} hasMore={replyHasMore} />
    </Col>
  )
}

const mapStateToProps = state => {
  const { 
    newComment, replying, replyError,
    replys, gettingReply, getReplyError, 
    detail: post, gettingDetail, getDetailError, 
    replyHasMore,
  } = state.post
  const { loggedIn, displayName: username, avatarHash: userAvatar } = state.user
  return {
    newComment, replying, replyError,
    replys, gettingReply, getReplyError,
    post, gettingDetail, getDetailError,
    loggedIn, username, userAvatar,
    replyHasMore
  }
}

const mapDispatchToProps = {
  getPost, onChangeNewComment, reply, getReplyList, 
}

export default connect(mapStateToProps, mapDispatchToProps)(DiscussionDetail);