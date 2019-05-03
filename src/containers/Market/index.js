import React, { useState, useEffect } from 'react'

import { Link, getUrlParams, routeMap } from '../../routes'

import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { get, collectMarket, resetDetail } from '../../actions/market'
import { onChangeKeyword, getMarketPost } from '../../actions/post'

import theme from '../../theme'
import { DonutLoader } from '../../components/Loader'
import { Row, Col } from '../../components/Layout'
import Tab from '../../components/Tab'
import Icon, { Comment, Trade, People, More, Bookmarked, Share, Copy, Add } from '../../components/Icon'
import Text from '../../components/Text'
import Search from '../../components/Search'
import Hr from '../../components/Hr'
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

const Market = ({ get, collectMarket, getting, location, market, getMarketPost, onChangeKeyword, postKeyword, resetDetail }) => {
  const [copied, setCopy] = useState(false)
  const id = getUrlParams().id
  useEffect(() => {
    get(id)
    return resetDetail
  }, [id])
  if(getting) return <DonutLoader page />
  if (!market) return null

  const activeIndex = TABS.findIndex(t => location.pathname.includes(t.value))
  return (
    <Col>
      <Row spaceBetween spacingTopXS spacingBottomXS spacingRightS spacingLeftS color={theme.bgColorLight}>
        <Row centerVertical>
          <Avatar icon={market.avatar} style={{ 'borderRadius':'50%'}}/>
          <Text>{`${market.name} (${market.id})`}</Text>
          <Copy S MarginLeftXS color={copied ? '#aaa' : '#fff'} onClick={() => { setCopy(true); copyToClipboard(market.address) }} />
        </Row>
        <Row centerVertical>
          <Link>
            {
              ({ goto, location }) =>
                <Button label={market.numberOfComments} icon={Comment} onClick={() => goto.discussion()} />
            }
          </Link>
          <Button label={market.numberOfSub} icon={People} />
          <Share S color={theme.white} onClick={() => console.log(market.id)} />
          <Bookmarked S MarginLeftS onClick={() => collectMarket(market)} checked={market.following} />
        </Row>
      </Row>
      <Row relative>
        <Col>
          <Link>
            {
              ({ goto, location }) =>
                <Tab tabs={TABS} activeIndex={activeIndex} onClick={index => goto[TABS[index].value]()} width='100px' />
            }
          </Link>
        </Col>
        <Col flex={1} spaceBetween>
          <Hr />
          {
            window.location.pathname === routeMap.discussion.path && 
            <Row right centerVertical>
              <Search backgroundColor={theme.bgColor} bottom='1px' top='1px' right='30px' value={postKeyword} onChange={onChangeKeyword} onSearch={() => getMarketPost()} />
              <Link>
                { ({ goto }) => 
                <Col absolute absRight='0' absTop='1px' absBottom='1px' HS backgroundColor={theme.bgColor} centerVertical>
                  <Add primary S onClick={() => goto.discussionCreate()} />
                </Col>
                }
              </Link>
            </Row>
          }
          <Hr />
        </Col>
      </Row>
    </Col>
  )
}

const mapStateToProps = state => ({
  market: state.market.currentMarket,
  getting: state.market.gettingMarket,
  postKeyword: state.post.keyword,
});

const mapDispatchToProps = {
  get, collectMarket, onChangeKeyword, getMarketPost, resetDetail
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Market))