import React, { Fragment, useEffect, useState } from 'react'

import { Row, Col } from '../../../components/Layout'
import DiscussionComment from '../../Market/Discussion/Comment'
import Text from '../../../components/Text'
import Hr from '../../../components/Hr'
import Panel from '../../../components/Panel'
import ScrollLoader from '../../../components/ScrollLoader'

import { connect } from 'react-redux'
import { getCollectedReplys, getCreatedReplys, reset } from '../../../actions/personalCenter'

export function ReplyBody({ replys, loadMore, hasMore, isLoading }) {
  return (
    <>
    {
      replys.map(reply => 
        <Fragment key={reply.id}>
          <DiscussionComment reply={reply} post={reply.post} marketId={reply.marketId} />
          <Hr />
        </Fragment>
      )
    }
    <ScrollLoader isButton loadMore={loadMore} hasMore={hasMore} isLoading={isLoading} />
    </>
  )
}
function Index({
  collectedReplys, gettingCollectedReplys, collectedReplysError,
  createdReplys, gettingCreatedReplys, createdReplysError,
  getCollectedReplys, getCreatedReplys, reset,
  createdReplysHasNextPage, collectedReplysHasNextPage
}) {
  const [expandCreated, setExpandCreated] = useState(true)
  const [expandSaved, setExpandSaved] = useState(false)
  useEffect( () => {
    getCollectedReplys()
    getCreatedReplys()
    return reset
  }, [])

  return (
    <Col>
      <Panel
        maxHeight='1000vh'
        expandedDark
        expanded={expandCreated}
        onClick={() => setExpandCreated(!expandCreated)}
        error={createdReplysError}
        loading={gettingCreatedReplys}
        header='Created comments'
        body={<ReplyBody replys={createdReplys} loadMore={getCreatedReplys} hasMore={createdReplysHasNextPage} isLoading={gettingCreatedReplys} />} />
      <Panel
        maxHeight='1000vh'
        expandedDark
        expanded={expandSaved}
        onClick={() => setExpandSaved(!expandSaved)}
        error={collectedReplysError}
        loading={gettingCollectedReplys}
        header='Saved comments'
        body={<ReplyBody replys={collectedReplys} loadMore={getCollectedReplys} hasMore={collectedReplysHasNextPage} isLoading={gettingCollectedReplys} />} />
    </Col>
  )
} 

const mapStateToProps = state => ({
  createdReplys: state.personalCenterPost.createdReplys,
  gettingCreatedReplys: state.personalCenterPost.gettingCreatedReplys,
  createdReplysError: state.personalCenterPost.createdReplysError,
  createdReplysHasNextPage: state.personalCenterPost.createdReplysHasNextPage,
  collectedReplys: state.personalCenterPost.collectedReplys,
  gettingCollectedReplys: state.personalCenterPost.gettingCollectedReplys,
  collectedReplysError: state.personalCenterPost.collectedReplysError,
  collectedReplysHasNextPage: state.personalCenterPost.collectedReplysHasNextPage,
});

const mapDispatchToProps = {
  getCollectedReplys, getCreatedReplys, reset
}

export default connect(mapStateToProps, mapDispatchToProps)(Index);
