import React, { Fragment, useEffect, useState } from 'react'

import DiscussionItem from '../../Market/Discussion/Item'
import DiscussionComment from '../../Market/Discussion/Comment'
import MarketTable from '../../Market/Table/ListView'

import { Row, Col } from '../../../components/Layout'
import Text from '../../../components/Text'
import Panel from '../../../components/Panel'
import Hr from '../../../components/Hr'

import { connect } from 'react-redux'
import { getCollectedPosts, getCollectedReplys, reset } from '../../../actions/personalCenter'

function Index({
  collectedPosts, gettingCollectedPosts, collectedPostsError,
  collectedMarkets, gettingCollectedMarmkets, collectedMarketsError,
  collectedReplys, gettingCollectedReplys, collectedReplysError,
  getCollectedPosts, getCollectedReplys, reset
}) {
  useEffect(() => {
    getCollectedReplys()
    getCollectedPosts()
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
        header='Saved market'
        error={collectedMarketsError}
        loading={gettingCollectedMarmkets}
        body={
          <MarketTable markets={collectedMarkets} />
        } />
      {expandMarket && <Hr />}
      <Panel
        expandedDark
        expanded={expandPost}
        onClick={() => setExpandPost(!expandPost)}
        error={collectedPostsError}
        loading={gettingCollectedPosts}
        header='Created post'
        body={collectedPosts.map(post =>
          <Fragment key={post.postId}>
            <DiscussionItem post={post} />
            <Hr />
          </Fragment>
        )}/>
      <Panel
        expandedDark
        expanded={expandReply}
        onClick={() => setExpandReply(!expandReply)}
        header='Your comment'
        error={collectedReplysError}
        loading={gettingCollectedReplys}
        body={
          collectedReplys.map(reply => 
            <Fragment key={reply.id}>
              <DiscussionComment reply={reply} />
              <Hr />
            </Fragment>
          )
        } />
    </Col>
  )  
}

const mapStateToProps = state => ({
  collectedReplys: state.personalCenterPost.collectedReplys,
  gettingCollectedReplys: state.personalCenterPost.gettingCollectedReplys,
  collectedReplysError: state.personalCenterPost.collectedReplysError,

  collectedPosts: state.personalCenterPost.collectedPosts,
  gettingCollectedPosts: state.personalCenterPost.gettingCollectedPosts,
  collectedPostsError: state.personalCenterPost.collectedPostsError,

  collectedMarkets: state.personalCenterMarket.tradedMarkets,
  gettingCollectedMarmkets: state.personalCenterMarket.gettingTradedMarmkets,
  collectedMarketsError: state.personalCenterMarket.tradedMarketsError,
});

const mapDispatchToProps = {
  getCollectedPosts, getCollectedReplys, reset
}

export default connect(mapStateToProps, mapDispatchToProps)(Index);