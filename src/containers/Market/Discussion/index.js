import React, { Fragment, useEffect, useRef } from 'react'

import { Row, Col } from '../../../components/Layout'
import Text from '../../../components/Text'
import Hr from '../../../components/Hr'
import ScrollLoader from '../../../components/ScrollLoader'
import { Add } from '../../../components/Icon'

import DiscussionItem from './Item'

import { connect } from 'react-redux'
import { getMarketPost } from '../../../actions/post'
import { useLang } from '../../../language'

function Discussion({ getMarketPost, post, market }) {
  const { posts, gettingPost, getPostError, keyword, hasNextPage, } = post
  useEffect( () => {
    getMarketPost()
  }, [])
  const [lang] = useLang()
  const ref = useRef()
  // if(gettingPost) return <DonutLoader page />
  if(getPostError) return <Text>{getPostError.message}</Text>
  if(!posts.length) return (
    <Col center centerVertical flex={1} >
      <Row centerVertical>
        {
          keyword ? 
            <Text>{lang.discussion.noResult}</Text> 
          : 
            <>
              <Text>{lang.discussion.create.click}</Text>
              <Add primary LeftS RightS S />
              <Text>{lang.discussion.create.newPost}</Text>
            </>
        }
      </Row>
      {!(market && market.address) &&
       <Text HS>{lang.discussion.preview} </Text>
      }
    </Col>
  )
  return (
    <Col ref={ref} flex={1} overflowAuto>
      {
        posts.map( post =>
          <Fragment key={post.id}>
            <DiscussionItem post={post} />
            <Hr />
          </Fragment>
        )
      }
      <ScrollLoader target={ref} isLoading={gettingPost} loadMore={() => getMarketPost(true)} hasMore={hasNextPage} />
    </Col>

  )  
}

const mapStateToProps = state => ({
  post: state.post,
  market: state.market.currentMarket,
});
const mapDispatchToProps = {
  getMarketPost
}

export default connect(mapStateToProps, mapDispatchToProps)(Discussion);