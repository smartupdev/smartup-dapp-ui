import React, { useState } from 'react'

import { Link, WithMarket } from '../../routes'

import theme from '../../theme'
import { Row, Col } from '../../components/Layout'
import Tab from '../../components/Tab'
import Icon, { Comment, Trade, People, More, Bookmarked, Share } from '../../components/Icon'
import Text from '../../components/Text'
import Button from '../../components/Button'
import Avatar from '../../components/Avatar'

import lang, { currentLang } from '../../lang'

const TABS = [
  { label: lang.marketTab.trade[currentLang], value: 'trading' },
  { label: lang.marketTab.general[currentLang], value: 'general' },
  { label: lang.marketTab.discussion[currentLang], value: 'discussion' },
  { label: lang.marketTab.proposal[currentLang], value: 'proposal' },
  { label: lang.marketTab.flag[currentLang], value: 'flag' },
]

const Market = () => {
  return (
    <WithMarket>
      { market =>
      <Col>
        <Row spaceBetween spacingTopXS spacingBottomXS spacingRightS spacingLeftS color={theme.bgColorLight}>
          <Row centerVertical>
            <Avatar icon={market.icon} />
            <Text>{market.name}</Text>
          </Row>
          <Row centerVertical>
            <Button label={market.numberOfComments} icon={Comment} />
            <Button label={market.numberOfSub} icon={People} />
            <Share S color={theme.white} rightText onClick={() => console.log(market.id)} />
            <Bookmarked S onClick={() => console.log(market.id)} checked={market.following} />
          </Row>
        </Row>
        <Link>
          {
            ({ goto, location }) => 
              <Tab tabs={TABS} activeIndex={TABS.findIndex(t => location.pathname.includes(t.value))} onClick={index=>goto[TABS[index].value]({id: market.id}) } width='100px' />
          }
        </Link>
      </Col>
      }
    </WithMarket>
  )
}

export default Market