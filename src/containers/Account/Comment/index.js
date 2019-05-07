import React, { Fragment, useEffect, useState } from 'react'

import { Row, Col } from '../../../components/Layout'
import DiscussionComment from '../../Market/Discussion/Comment'
import Text from '../../../components/Text'
import Hr from '../../../components/Hr'
import Panel from '../../../components/Panel'
import ScrollLoader from '../../../components/ScrollLoader'

import { Link } from '../../../routes'

import { connect } from 'react-redux'
import { getCollectedReplys, getCreatedReplys, reset } from '../../../actions/personalCenter'

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

  function ReplyBody({ reply }) {
    return (
      <Link>
        {({ goto }) =>
          <Fragment key={reply.id}>
            <DiscussionComment reply={reply} onClick={() => goto.DiscussionDetail({ id: reply.id, })}  />
            <Hr />
          </Fragment>
        }
      </Link>
    )
  }

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
        body={
          <>
          {
            createdReplys.map(reply =>             
              <Fragment key={reply.id}>
                <DiscussionComment reply={reply} />
                <Hr />
              </Fragment>
            )
          }
          <ScrollLoader isButton loadMore={getCreatedReplys} hasMore={createdReplysHasNextPage} isLoading={gettingCreatedReplys} />
          </>
        } />
      <Panel
        maxHeight='1000vh'
        expandedDark
        expanded={expandSaved}
        onClick={() => setExpandSaved(!expandSaved)}
        error={collectedReplysError}
        loading={gettingCollectedReplys}
        header='Saved comments'
        body={
          <>
          {
            collectedReplys.map(reply => 
              <Fragment key={reply.id}>
                <DiscussionComment reply={reply} />
                <Hr />
              </Fragment>
            )
          }
          <ScrollLoader isButton loadMore={getCollectedReplys} hasMore={collectedReplysHasNextPage} isLoading={gettingCollectedReplys} />
          </>
        } />
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
