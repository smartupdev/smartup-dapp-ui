import React, { Fragment } from 'react'
import { WithMarket } from '../../routes'
import { Row, Col } from '../../components/Layout'
import Text from '../../components/Text'
import Hr from '../../components/Hr'
import theme from '../../theme'
import Icon, { Comment, Trade, People, More, Bookmarked, Share } from '../../components/Icon'

import { toToken, toAgo, toFullDate } from '../../lib/util'

const content = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent volutpat augue at egestas tincidunt. Morbi congue scelerisque euismod. Suspendisse pretium leo dui, sit amet pellentesque risus luctus at. Aliquam rutrum enim id interdum laoreet. Cras eget neque quis felis scelerisque bibendum. Curabitur ullamcorper tortor at risus dignissim, id scelerisque purus porttitor. In hac habitasse platea dictumst. Mauris sit amet laoreet elit, vitae convallis nulla. Pellentesque id maximus dui.
Vivamus finibus, nulla et pharetra faucibus, est diam egestas neque, nec efficitur mi risus at augue. Mauris iaculis metus quis nibh aliquet, quis lobortis mauris porta. Mauris volutpat enim vel ex blandit eleifend. Quisque fringilla aliquam porta. Quisque tempus, lacus et feugiat viverra, mauris mi maximus justo, ut varius magna risus vitae augue. Cras imperdiet dapibus arcu, in ultricies libero vestibulum eu. Vestibulum sollicitudin, orci nec aliquam euismod, risus sapien aliquet magna, vel porta quam nulla id erat.`

const title = `Neque porro quisquam est qui dolorem ipsum quia dolor sit amet`

const posts = [
  { id: 1, authorName: 'Smart', time: 1553734586643, title, content, numberOfLike: 1000, numberOfDislike: 1000, numberOfComment: 1000 },
  { id: 2, authorName: 'Smart', time: 1553734586643, title, content, numberOfLike: 1000, numberOfDislike: 1000, numberOfComment: 1000 },
  { id: 3, authorName: 'Smart', time: 1553734586643, title, content, numberOfLike: 1000, numberOfDislike: 1000, numberOfComment: 1000 },
  { id: 4, authorName: 'Smart', time: 1553734586643, title, content, numberOfLike: 1000, numberOfDislike: 1000, numberOfComment: 1000 },
  { id: 5, authorName: 'Smart', time: 1553734586643, title, content, numberOfLike: 1000, numberOfDislike: 1000, numberOfComment: 1000 },
  { id: 6, authorName: 'Smart', time: 1553734586643, title, content, numberOfLike: 1000, numberOfDislike: 1000, numberOfComment: 1000 },
]

// 'Posted by Smart, about 3 hours ago'

export default function() {
  return posts.map( ({ id, authorName, time, title, content, numberOfLike, numberOfDislike, numberOfComment }) =>
    <Fragment key={id}>
      <Row spaceBetween spacingM>
        <Col flex={1} overflowHidden RightXL>
          <Text S note>{`Posted by ${authorName}, about ${toAgo(time)}`}</Text>
          <Text VXS>{title}</Text>
          <Text S note textOverflow>{content}</Text>
        </Col>
        <Row>
          <Share S color={theme.white} MarginRightS />
          <Bookmarked S color={theme.white} />
        </Row>
      </Row>
      <Hr />
    </Fragment>
  )  
}