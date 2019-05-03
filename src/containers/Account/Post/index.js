import React, { Fragment, useEffect, useState } from 'react'

import { Row, Col } from '../../../components/Layout'
import DiscussionItem from '../../Market/Discussion/Item'
import Text from '../../../components/Text'
import Hr from '../../../components/Hr'
import Panel from '../../../components/Panel'

import { connect } from 'react-redux'
import { getCollectedPosts, getCreatedPosts, reset } from '../../../actions/personalCenter'

function Index({ 
  createdPosts, collectedPosts, 
  reset, getCollectedPosts, getCreatedPosts,
  gettingCreatedPosts, createdPostsError,
  gettingCollectedPosts, collectedPostsError
 }) {
  const [expandCreated, setExpandCreated] = useState(true)
  const [expandSaved, setExpandSaved] = useState(false)
  useEffect( () => {
    getCollectedPosts()
    getCreatedPosts()
    return reset
  }, [])
  return (
    <Col>
      <Panel
        maxHeight='1000vh'
        expandedDark
        expanded={expandCreated}
        onClick={() => setExpandCreated(!expandCreated)}
        error={createdPostsError}
        loading={gettingCreatedPosts}
        header='Created posts'
        body={
          createdPosts.map(post => 
            <Fragment key={post.postId}>
              <DiscussionItem post={post} />
              <Hr />
            </Fragment>
          )
        } />
      <Panel
        maxHeight='1000vh'
        expandedDark
        expanded={expandSaved}
        onClick={() => setExpandSaved(!expandSaved)}
        error={collectedPostsError}
        loading={gettingCollectedPosts}
        header='Saved posts'
        body={
          collectedPosts.map(post => 
            <Fragment key={post.postId}>
              <DiscussionItem post={post} />
              <Hr />
            </Fragment>
          )
        } />
    </Col>
  )
} 

const mapStateToProps = state => ({
  createdPosts: state.personalCenterPost.createdPosts,
  collectedPosts: state.personalCenterPost.collectedPosts,
  gettingCreatedPosts: state.personalCenterPost.gettingCreatedPosts,
  createdPostsError: state.personalCenterPost.createdPostsError,
  gettingCollectedPosts: state.personalCenterPost.gettingCollectedPosts,
  collectedPostsError: state.personalCenterPost.collectedPostsError,
});

const mapDispatchToProps = {
  getCollectedPosts, getCreatedPosts, reset
}

export default connect(mapStateToProps, mapDispatchToProps)(Index);
