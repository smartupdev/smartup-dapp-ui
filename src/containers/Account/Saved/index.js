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
import { useLang } from '../../../language'
function Index({
  collectedPost: { posts: collectedPosts, getting: gettingCollectedPosts, error: collectedPostsError, hasNextPage: collectedPostsHasNextPage, },
  collectedMarket: { markets: collectedMarkets, getting: gettingCollectedMarmkets, error: collectedMarketsError, hasNextPage: collectedMarketsHasNextPage, },
  collectedReply: { replys: collectedReplys, getting: gettingCollectedReplys, error: collectedReplysError, hasNextPage: collectedReplysHasNextPage, },
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
  const [lang] = useLang()
  return (
    <Col>
      <Panel
        expandedDark
        expanded={expandMarket}
        onClick={() => setExpandMarket(!expandMarket)}
        header={lang.personalCentre.inMarket.saved}
        error={collectedMarketsError}
        loading={gettingCollectedMarmkets}
        body={
          <>
            <MarketTable markets={collectedMarkets} hasMore={collectedMarketsHasNextPage} loadMore={getCollectedMarkets} isLoading={gettingCollectedMarmkets} />
            <Hr />
          </>
        } />
      <Panel
        expandedDark
        expanded={expandPost}
        onClick={() => setExpandPost(!expandPost)}
        error={collectedPostsError}
        loading={gettingCollectedPosts}
        header={lang.personalCentre.inPost.saved}
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
          <ScrollLoader isButton loadMore={getCollectedPosts} hasMore={collectedPostsHasNextPage} isLoading={gettingCollectedPosts} noResult={!collectedPosts.length} />
          </>
        }/>
      <Panel
        expandedDark
        expanded={expandReply}
        onClick={() => setExpandReply(!expandReply)}
        header={lang.personalCentre.inComment.saved}
        error={collectedReplysError}
        loading={gettingCollectedReplys}
        body={<ReplyBody replys={collectedReplys} loadMore={getCollectedReplys} hasMore={collectedReplysHasNextPage} isLoading={gettingCollectedReplys} />} />
    </Col>
  )  
}

const mapStateToProps = state => ({
  collectedReply: state.userSavedReply,
  collectedPost: state.userSavedPost,
  collectedMarket: state.userSavedMarket,  
});

const mapDispatchToProps = {
  getCollectedPosts, getCollectedReplys, getCollectedMarkets, reset
}

export default connect(mapStateToProps, mapDispatchToProps)(Index);