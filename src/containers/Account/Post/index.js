import React, { Fragment } from 'react'

import { Row, Col } from '../../../components/Layout'
import DiscussionItem from '../../Market/DiscussionItem'
import Text from '../../../components/Text'
import Hr from '../../../components/Hr'

const posts = [ {
  "id" : 9098959200980992,
  "postId" : 9098959200980992,
  "type" : "market",
  "photo" : "QmQqW9bwkjUkm92Dp9wVWdCwZbzHXMymtrWWCcqGhgeNzm",
  "marketAddress" : "0xb822B98e02397e9F1dD4C6237e63257dd1f7C4D2",
  "marketId" : "2halepvlo1s",
  "userAddress" : "0x1A3a50565EB671c08D607a4095761c6c6dAAFf5D",
  "title" : "ccmcmc",
  "description" : "rdfxd",
  "createTime" : "2019-04-27 14:36:00",
  "isLiked" : null,
  "isDisliked" : true
}, {
  "id" : 9103764199837696,
  "postId" : 9103764199837696,
  "type" : "market",
  "photo" : "QmQqW9bwkjUkm92Dp9wVWdCwZbzHXMymtrWWCcqGhgeNzm",
  "marketAddress" : "0xb822B98e02397e9F1dD4C6237e63257dd1f7C4D2",
  "marketId" : "2halepvlo1s",
  "userAddress" : "0x1A3a50565EB671c08D607a4095761c6c6dAAFf5D",
  "title" : "cmo3",
  "description" : "dmfro",
  "createTime" : "2019-04-27 14:55:06",
  "isLiked" : true,
  "isDisliked" : null
} ]

export default () => 
  <Col>
    <Text center VS>Created post</Text>
    <Hr />
    {posts.map(post => 
      <Fragment key={post.postId}>
        <DiscussionItem post={post} />
        <Hr />
      </Fragment>
    )}
  </Col>
