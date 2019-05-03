import React, { Fragment, useEffect } from 'react'

import { Row, Col } from '../../../components/Layout'
import Text from '../../../components/Text'
import Hr from '../../../components/Hr'
import Button from '../../../components/Button'
import { DonutLoader } from '../../../components/Loader'
import TableFooter from '../../../components/TableFooter'
import ScrollLoader from '../../../components/ScrollLoader'
import { Link } from '../../../routes'
import Icon, { Comment, Trade, People, More, Bookmarked, Add, Share, Like, Dislike, Reply } from '../../../components/Icon'

import DiscussionItem from './Item'

import { connect } from 'react-redux'
import { getMarketPost } from '../../../actions/post'

import theme from '../../../theme'
import { toToken, toAgo, toFullDate, shorten } from '../../../lib/util'

const content = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent volutpat augue at egestas tincidunt. Morbi congue scelerisque euismod. Suspendisse pretium leo dui, sit amet pellentesque risus luctus at. Aliquam rutrum enim id interdum laoreet. Cras eget neque quis felis scelerisque bibendum. Curabitur ullamcorper tortor at risus dignissim, id scelerisque purus porttitor. In hac habitasse platea dictumst. Mauris sit amet laoreet elit, vitae convallis nulla. Pellentesque id maximus dui.
Vivamus finibus, nulla et pharetra faucibus, est diam egestas neque, nec efficitur mi risus at augue. Mauris iaculis metus quis nibh aliquet, quis lobortis mauris porta. Mauris volutpat enim vel ex blandit eleifend. Quisque fringilla aliquam porta. Quisque tempus, lacus et feugiat viverra, mauris mi maximus justo, ut varius magna risus vitae augue. Cras imperdiet dapibus arcu, in ultricies libero vestibulum eu. Vestibulum sollicitudin, orci nec aliquam euismod, risus sapien aliquet magna, vel porta quam nulla id erat.`

const title = `Neque porro quisquam est qui dolorem ipsum quia dolor sit amet`

// const posts = [
//   { id: 1, authorName: 'Smart', time: 1553734586643, title, content, numberOfLike: 1000, numberOfDislike: 1000, numberOfComment: 1000 },
//   { id: 2, authorName: 'Smart', time: 1553734586643, title, content, numberOfLike: 1000, numberOfDislike: 1000, numberOfComment: 1000 },
//   { id: 3, authorName: 'Smart', time: 1553734586643, title, content, numberOfLike: 1000, numberOfDislike: 1000, numberOfComment: 1000 },
//   { id: 4, authorName: 'Smart', time: 1553734586643, title, content, numberOfLike: 1000, numberOfDislike: 1000, numberOfComment: 1000 },
//   { id: 5, authorName: 'Smart', time: 1553734586643, title, content, numberOfLike: 1000, numberOfDislike: 1000, numberOfComment: 1000 },
//   { id: 6, authorName: 'Smart', time: 1553734586643, title, content, numberOfLike: 1000, numberOfDislike: 1000, numberOfComment: 1000 },
// ]

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