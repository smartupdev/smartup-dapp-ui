import React, { Fragment, useEffect } from 'react'

import { Row, Col } from '../../../components/Layout'
import Text from '../../../components/Text'
import Hr from '../../../components/Hr'
import ScrollLoader from '../../../components/ScrollLoader'
import { Add } from '../../../components/Icon'

import DiscussionItem from './Item'

import { connect } from 'react-redux'
import { getMarketPost } from '../../../actions/post'

function Disussion({ getMarketPost, post }) {
  const { posts, gettingPost, getPostError, keyword, hasNextPage, } = post
  useEffect( () => {
    getMarketPost()
  }, [])
  // if(gettingPost) return <DonutLoader page />
  if(getPostError) return <Text>{getPostError.messsage}</Text>
  if(!posts.length) return (
    <Col center centerVertical flex={1} >
      <Row centerVertical>
        {
          keyword ? 
            <Text>No result found.</Text> 
          : 
            <>
              <Text>Click</Text>
              <Add primary LeftS RightS S />
              <Text>to create a new post.</Text>
            </>
        }
      </Row>
    </Col>
  )
  return (
    <>
      {
        posts.map( post =>
          <Fragment key={post.id}>
            <DiscussionItem post={post} />
            <Hr />
          </Fragment>
        )
      }
      <ScrollLoader isButton isLoading={gettingPost} loadMore={() => getMarketPost(true)} hasMore={hasNextPage} />
    </>

  )  
}

const mapStateToProps = state => ({
  post: state.post,
});
const mapDispatchToProps = {
  getMarketPost
}

export default connect(mapStateToProps, mapDispatchToProps)(Disussion);