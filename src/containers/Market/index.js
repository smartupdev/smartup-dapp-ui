import React, { useState, useEffect } from 'react'

import { Link } from '../../routes'

import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { get, collectMarket } from '../../actions/market'

import theme from '../../theme'
import { DonutLoader } from '../../components/Loader'
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

const Market = ({ get, collectMarket, getting, location, market }) => {
  const [copied, setCopy] = useState(false)
  const id = new URLSearchParams(location.search).get('id')
  useEffect(() => {
    get(id)
  }, [id])
  if(getting) return <DonutLoader page />
  if (!market) return null

  return (
    <Col>
      <Row spaceBetween spacingTopXS spacingBottomXS spacingRightS spacingLeftS color={theme.bgColorLight}>
        <Row centerVertical>
          <Avatar icon={market.icon} />
          <Text MarginLeftXS>{`${market.name} (${market.id})`}</Text>
          <Copy S MarginLeftXS color={copied ? '#aaa' : '#fff'} onClick={() => { setCopy(true); copyToClipboard(market.address) }} />
        </Row>
        <Row centerVertical>
          <Button label={market.numberOfComments} icon={Comment} />
          <Button label={market.numberOfSub} icon={People} />
          <Share S color={theme.white} onClick={() => console.log(market.id)} />
          <Bookmarked S MarginLeftS onClick={() => collectMarket(market)} checked={market.following} />
        </Row>
      </Row>
      <Link>
        {
          ({ goto, location }) =>
            <Tab tabs={TABS} activeIndex={TABS.findIndex(t => location.pathname.includes(t.value))} onClick={index => goto[TABS[index].value]({ id: market.id })} width='100px' />
        }
      </Link>
    </Col>
  )
}

const mapStateToProps = state => ({
  market: state.market.currentMarket,
  getting: state.market.gettingMarket,
});

const mapDispatchToProps = {
  get, collectMarket
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Market))