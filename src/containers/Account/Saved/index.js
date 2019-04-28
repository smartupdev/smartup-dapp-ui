import React, { Fragment, useState } from 'react'

import DiscussionItem from '../../Market/DiscussionItem'
import DiscussionComment from '../../Market/DiscussionComment'

import { Row, Col } from '../../../components/Layout'
import Text from '../../../components/Text'
import Panel from '../../../components/Panel'
import Hr from '../../../components/Hr'

export default () => {
  const [expandMarket, setExpandMarket] = useState(true)
  const [expandPost, setExpandPost] = useState(false)
  const [expandReply, setExpandReply] = useState(false)
  return (
    <Col>
      <Panel
        expanded={expandMarket}
        onClick={() => setExpandMarket(!expandMarket)}
        header='Saved market'
        body={
          <Fragment>
            <Text center VM note>Under development</Text>
            <Hr />
          </Fragment>
        }/>

      <Panel
        expanded={expandPost}
        onClick={() => setExpandPost(!expandPost)}
        header='Created post'
        body={posts.map(post =>
          <Fragment key={post.postId}>
            <DiscussionItem post={post} />
            <Hr />
          </Fragment>
        )}/>
      <Panel
        expanded={expandReply}
        onClick={() => setExpandReply(!expandReply)}
        header='Your comment'
        body={replys.map(reply =>
          <Fragment key={reply.replyId}>
            <DiscussionComment reply={reply} />
            <Hr />
          </Fragment>
        )}/>
    </Col>
  )  
}

const posts = [{
  "id": 9098959200980992,
  "postId": 9098959200980992,
  "type": "market",
  "photo": "QmQqW9bwkjUkm92Dp9wVWdCwZbzHXMymtrWWCcqGhgeNzm",
  "marketAddress": "0xb822B98e02397e9F1dD4C6237e63257dd1f7C4D2",
  "marketId": "2halepvlo1s",
  "userAddress": "0x1A3a50565EB671c08D607a4095761c6c6dAAFf5D",
  "title": "ccmcmc",
  "description": "rdfxd",
  "createTime": "2019-04-27 14:36:00",
  "isLiked": null,
  "isDisliked": true
}, {
  "id": 9103764199837696,
  "postId": 9103764199837696,
  "type": "market",
  "photo": "QmQqW9bwkjUkm92Dp9wVWdCwZbzHXMymtrWWCcqGhgeNzm",
  "marketAddress": "0xb822B98e02397e9F1dD4C6237e63257dd1f7C4D2",
  "marketId": "2halepvlo1s",
  "userAddress": "0x1A3a50565EB671c08D607a4095761c6c6dAAFf5D",
  "title": "cmo3",
  "description": "dmfro",
  "createTime": "2019-04-27 14:55:06",
  "isLiked": true,
  "isDisliked": null
}]


const replys = [{
  "id": 9146123868442624,
  "replyId": 9146123868442624,
  "postId": 9098959200980992,
  "fatherId": 0,
  "userAddress": "0x1A3a50565EB671c08D607a4095761c6c6dAAFf5D",
  "content": "cmcmcm",
  "createTime": "2019-04-27 17:43:25",
  "childrenPage": {
    "list": [],
    "rowCount": 0,
    "pageSize": 10,
    "pageNumb": 0,
    "pageCount": 1,
    "hasNextPage": true
  },
  "isLiked": null,
  "isDisliked": null
}, {
  "id": 9146191388348416,
  "replyId": 9146191388348416,
  "postId": 9098959200980992,
  "fatherId": 0,
  "userAddress": "0x1A3a50565EB671c08D607a4095761c6c6dAAFf5D",
  "content": "rkewdo",
  "createTime": "2019-04-27 17:43:41",
  "childrenPage": {
    "list": [],
    "rowCount": 0,
    "pageSize": 10,
    "pageNumb": 0,
    "pageCount": 1,
    "hasNextPage": true
  },
  "isLiked": null,
  "isDisliked": null
}]
