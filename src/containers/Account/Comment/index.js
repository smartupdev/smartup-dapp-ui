import React, { Fragment }  from 'react'

import { Row, Col } from '../../../components/Layout'
import DiscussionComment from '../../Market/Discussion/Comment'
import Text from '../../../components/Text'
import Hr from '../../../components/Hr'

const replys = [ {
  "id" : 9146123868442624,
  "replyId" : 9146123868442624,
  "postId" : 9098959200980992,
  "fatherId" : 0,
  "userAddress" : "0x1A3a50565EB671c08D607a4095761c6c6dAAFf5D",
  "content" : "cmcmcm",
  "createTime" : "2019-04-27 17:43:25",
  "childrenPage" : {
    "list" : [ ],
    "rowCount" : 0,
    "pageSize" : 10,
    "pageNumb" : 0,
    "pageCount" : 1,
    "hasNextPage" : true
  },
  "isLiked" : null,
  "isDisliked" : null
}, {
  "id" : 9146191388348416,
  "replyId" : 9146191388348416,
  "postId" : 9098959200980992,
  "fatherId" : 0,
  "userAddress" : "0x1A3a50565EB671c08D607a4095761c6c6dAAFf5D",
  "content" : "rkewdo",
  "createTime" : "2019-04-27 17:43:41",
  "childrenPage" : {
    "list" : [ ],
    "rowCount" : 0,
    "pageSize" : 10,
    "pageNumb" : 0,
    "pageCount" : 1,
    "hasNextPage" : true
  },
  "isLiked" : null,
  "isDisliked" : null
}]

export default () => 
  <Col>
    <Text center VS>Your comment</Text>
    <Hr />
    {replys.map(reply => 
      <Fragment key={reply.replyId}>
        <DiscussionComment reply={reply} />
        <Hr />
      </Fragment>
    )}
  </Col>