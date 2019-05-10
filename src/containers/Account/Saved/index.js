import React, { Fragment, useEffect, useState } from 'react'

import DiscussionItem from '../../Market/Discussion/Item'
import MarketTable from '../../Market/Table/ListView'
import { ReplyBody } from '../Comment'

import { Col } from '../../../components/Layout'
import Panel from '../../../components/Panel'
import Hr from '../../../components/Hr'
import ScrollLoader from '../../../components/ScrollLoader'

import { connect } from 'react-redux'
import { getCollectedPosts, getCollectedReplys, getCollectedMarkets, reset } from '../../../actions/personalCenter'

function Index({
  collectedPosts, gettingCollectedPosts, collectedPostsError, collectedPostsHasNextPage,
  collectedMarkets, gettingCollectedMarmkets, collectedMarketsError, collectedMarketsHasNextPage,
  collectedReplys, gettingCollectedReplys, collectedReplysError, collectedReplysHasNextPage,
  getCollectedPosts, getCollectedReplys, getCollectedMarkets, reset
}) {
  useEffect(() => {
    getCollectedReplys()
    getCollectedPosts()
    getCollectedMarkets()
    return reset
  }, [])

  const [expandMarket, setExpandMarket] = useState(true)
  const [expandPost, setExpandPost] = useState(false)
  const [expandReply, setExpandReply] = useState(false)
  return (
    <Col>
      <Panel
        expandedDark
        expanded={expandMarket}
        onClick={() => setExpandMarket(!expandMarket)}
        header='Saved markets'
        error={collectedMarketsError}
        loading={gettingCollectedMarmkets}
        body={
          <MarketTable markets={collectedMarkets} hasMore={collectedMarketsHasNextPage} loadMore={getCollectedMarkets} isLoading={gettingCollectedMarmkets} />
        } />
      {expandMarket && <Hr />}
      <Panel
        expandedDark
        expanded={expandPost}
        onClick={() => setExpandPost(!expandPost)}
        error={collectedPostsError}
        loading={gettingCollectedPosts}
        header='Saved posts'
        body={
          <>
          {
            collectedPosts.map(post =>
              <Fragment key={post.postId}>
                <DiscussionItem post={post} />
                <Hr />
              </Fragment>
            )
          }
          <ScrollLoader isButton loadMore={getCollectedPosts} hasMore={collectedPostsHasNextPage} isLoading={gettingCollectedPosts} />
          </>
        }/>
      <Panel
        expandedDark
        expanded={expandReply}
        onClick={() => setExpandReply(!expandReply)}
        header='Saved comments'
        error={collectedReplysError}
        loading={gettingCollectedReplys}
        body={<ReplyBody replys={collectedReplys} loadMore={getCollectedReplys} hasMore={collectedReplysHasNextPage} isLoading={gettingCollectedReplys} />} />
    </Col>
  )  
}

const mapStateToProps = state => ({
  collectedReplys: state.personalCenterPost.collectedReplys,
  gettingCollectedReplys: state.personalCenterPost.gettingCollectedReplys,
  collectedReplysError: state.personalCenterPost.collectedReplysError,
  collectedReplysHasNextPage: state.personalCenterPost.collectedReplysHasNextPage,

  collectedPosts: state.personalCenterPost.collectedPosts,
  gettingCollectedPosts: state.personalCenterPost.gettingCollectedPosts,
  collectedPostsError: state.personalCenterPost.collectedPostsError,
  collectedPostsHasNextPage: state.personalCenterPost.collectedPostsHasNextPage,

  collectedMarkets: state.personalCenterMarket.collectedMarkets,
  gettingCollectedMarmkets: state.personalCenterMarket.gettingCollectedMarmkets,
  collectedMarketsError: state.personalCenterMarket.collectedMarketsError,
  collectedMarketsHasNextPage: state.personalCenterMarket.collectedMarketsHasNextPage,
});

const mapDispatchToProps = {
  getCollectedPosts, getCollectedReplys, getCollectedMarkets, reset
}

export default connect(mapStateToProps, mapDispatchToProps)(Index);