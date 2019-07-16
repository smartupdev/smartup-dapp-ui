import React, { Fragment, useEffect, useState } from 'react'

import { Col } from '../../../components/Layout'
import DiscussionItem from '../../Market/Discussion/Item'
// import Text from '../../../components/Text'
import Hr from '../../../components/Hr'
import Panel from '../../../components/Panel'
import ScrollLoader from '../../../components/ScrollLoader'

import { connect } from 'react-redux'
import { getCollectedPosts, getCreatedPosts, reset } from '../../../actions/personalCenter'
import { useLang } from '../../../language'
function Index({ 
  createdPost: {posts: createdPosts, getting: gettingCreatedPosts, error: createdPostsError, hasNextPage: createdPostsHasNextPage},
  collectedPost: {posts: collectedPosts, getting: gettingCollectedPosts, error: collectedPostsError, hasNextPage: collectedPostsHasNextPage},
  reset, getCollectedPosts, getCreatedPosts,
 }) {
  const [expandCreated, setExpandCreated] = useState(true)
  const [expandSaved, setExpandSaved] = useState(false)
  useEffect( () => {
    getCollectedPosts()
    getCreatedPosts()
    return reset
  }, [])
  const [lang] = useLang()
  return (
    <Col>
      <Panel
        maxHeight='1000vh'
        expandedDark
        expanded={expandCreated}
        onClick={() => setExpandCreated(!expandCreated)}
        error={createdPostsError}
        loading={gettingCreatedPosts}
        header={lang.personalCentre.inPost.created}
        body={
          <>
            {createdPosts.map(post => 
              <Fragment key={post.postId}>
                <DiscussionItem post={post} />
                <Hr />
              </Fragment>
            )}
            <ScrollLoader isButton loadMore={getCreatedPosts} hasMore={createdPostsHasNextPage} isLoading={gettingCreatedPosts} noResult={!createdPosts.length} />
          </>
        } />
      <Panel
        maxHeight='1000vh'
        expandedDark
        expanded={expandSaved}
        onClick={() => setExpandSaved(!expandSaved)}
        error={collectedPostsError}
        loading={gettingCollectedPosts}
        header={lang.personalCentre.inPost.saved}
        body={
          <>
            {collectedPosts.map(post => 
              <Fragment key={post.postId}>
                <DiscussionItem post={post} />
                <Hr />
              </Fragment>
            )}
            <ScrollLoader isButton loadMore={getCollectedPosts} hasMore={collectedPostsHasNextPage} isLoading={gettingCollectedPosts} noResult={!collectedPosts.length} />
          </>
        } />
    </Col>
  )
} 

const mapStateToProps = state => ({
  createdPost: state.userCreatedPost,
  collectedPost: state.userSavedPost,
});

const mapDispatchToProps = {
  getCollectedPosts, getCreatedPosts, reset
}

export default connect(mapStateToProps, mapDispatchToProps)(Index);
