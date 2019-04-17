import React, { useState } from 'react'

import { Link, WithMarket } from '../../routes'

import theme from '../../theme'
import { Row, Col } from '../../components/Layout'
import Tab from '../../components/Tab'
import Icon, { Comment, Trade, People, More, Bookmarked, Share, Copy } from '../../components/Icon'
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
const copyToClipboard = str => {
  const el = document.createElement('textarea');
  el.value = str;
  el.setAttribute('readonly', '');
  el.style.position = 'absolute';
  el.style.left = '-9999px';
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
};
const marketAddress = '0xF6f7C3CDbA6ef2E9fFF12b1702481f99CA6Cd38c';

const Market = () => {
  const [copied, setCopy] = useState(false)
  return (
    <WithMarket>
      { market =>
      <Col>
        <Row spaceBetween spacingTopXS spacingBottomXS spacingRightS spacingLeftS color={theme.bgColorLight}>
          <Row centerVertical>
            <Avatar icon={market.icon} />
            <Text>{`${market.name} (${market.id})`}</Text>
            <Col spacingLeftXS onClick={() => {setCopy(true); copyToClipboard(marketAddress)}}>
              <Copy S color={copied ? '#aaa' : '#fff'} />
            </Col>
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