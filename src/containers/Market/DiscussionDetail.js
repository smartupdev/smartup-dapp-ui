import React, { useEffect, useState } from 'react'

import DiscussionItem from './DiscussionItem'
import { Row, Col } from '../../components/Layout'
import Text from '../../components/Text'
import TextInput from '../../components/Input'
import Avatar from '../../components/Avatar'
import Button from '../../components/Button'
import { DonutLoader } from '../../components/Loader'

import { getUrlParams } from '../../routes'
import { connect } from 'react-redux'
import { getPost } from '../../actions/post'

function DiscussionDetail({
  post, getting, error, 
  getPost,
  loggedIn, username, userAvatar
}) {
  const [text, setText] = useState('')

  const { postId } = getUrlParams()
  useEffect( () => {
    getPost(postId)
  }, [])

  if(error) return <Text>{error.message}</Text>
  if(getting || !post) return <DonutLoader page />

  return (
    <Col>
      <DiscussionItem post={post} />
      <Col spacingM>
      {
        loggedIn && 
        <Row top>
          <Avatar icon={userAvatar} username={username} />
          <Col flex={1} LeftS>
            <TextInput background value={text} onChange={setText} line={4} />
            <Col right TopBase>
              <Button primary HXL label='Save' />
            </Col>
          </Col>
        </Row>
      }
      </Col>
    </Col>
  )
}

const mapStateToProps = state => ({
  post: state.post.detail,
  getting: state.post.gettingDetail,
  error: state.post.getDetailError,
  loggedIn: state.user.loggedIn,
  username: state.user.userName,
  userAvatar: state.user.userAvatar
});
const mapDispatchToProps = {
  getPost
}

export default connect(mapStateToProps, mapDispatchToProps)(DiscussionDetail);