import React, { useState } from 'react'
import { Row, Col } from '../../components/Layout'
import Notification from '../../components/Notification'
import Search from '../../components/Search'
import Hr from '../../components/Hr'
// import { Menu1, Menu2, Menu3 } from '../../components/Icon'
import ethIcon from '../../images/eth.png';
import smartupIcon from '../../images/smartup.png';

const TYPES = {
  trade: {
    value: 'trade',
    image: smartupIcon,
  },
  announcement: {
    value: 'announcement',
    image: ethIcon
  },
  system: {
    value: 'system',
    image: ethIcon
  },
}

const typeValueToImage = Object.keys(TYPES).reduce((p, t) => ({
  ...p,
  [TYPES[t].value]: TYPES[t].image
}), {})

const notificaitons = [
  { id: 1, type: TYPES.trade.value, unread: true, sender: 'SMARTUP', title: 'Trade order', content: `You're drawn to be juror for dispute of idea rdv43w efr rfv r gf 43wsrf `, createdDateTime: 1554266225299, },
  { id: 2, type: TYPES.trade.value, unread: false, sender: 'SMARTUP', title: 'Trade order', content: `You're drawn to be juror for dispute of idea `, createdDateTime: 1553740797139, },
  { id: 3, type: TYPES.announcement.value, unread: true, sender: 'SMARTUP', title: 'Trade order', content: `You're drawn to be juror for dispute of idea`, createdDateTime: 1553740797139, },
]

export default () => {
  return (
    <Col>
      <Row>
        <Search />
      </Row>
      {
        notificaitons.map(n =>
          <Notification
            key={n.id}
            id={n.id}
            onClick={console.debug}
            image={typeValueToImage[n.type]}
            sender={n.sender}
            title={n.title}
            content={n.content}
            date={n.createdDateTime}
            unread={n.unread}
          />
        )
      }
      <Hr />
    </Col>
  )
}