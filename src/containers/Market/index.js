import React, { useEffect } from 'react'

import { Link, getUrlParams, routeMap, getPath, MarketRoutes } from '../../routes'

import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { get, toggleSavedMarket, resetDetail } from '../../actions/market'
import { onChangeKeyword, getMarketPost } from '../../actions/post'

import theme from '../../theme'
import { DonutLoader } from '../../components/Loader'
import { Row, Col } from '../../components/Layout'
import Tab from '../../components/Tab'
import { Comment, CommunityMember, Bookmarked, Share, Copy, Add } from '../../components/Icon'
import Text from '../../components/Text'
import Search from '../../components/Search'
import Hr from '../../components/Hr'
import Button from '../../components/Button'
import Avatar from '../../components/Avatar'

import { ToastConsumer } from 'react-toast-notifications'
import { copy } from '../../lib/util'
import { share } from '../../alphaWebService'

import lang, { currentLang } from '../../lang'

const TABS = [
  { label: lang.marketTab.trade[currentLang], value: 'trading' },
  { label: lang.marketTab.general[currentLang], value: 'general' },
  { label: lang.marketTab.discussion[currentLang], value: 'discussion' },
  { label: lang.marketTab.proposal[currentLang], value: 'proposal' },
  { label: lang.marketTab.flag[currentLang], value: 'flag' },
]

const Market = ({ get, toggleSavedMarket, getting, location, market, getMarketPost, onChangeKeyword, postKeyword, resetDetail }) => {
  const id = getUrlParams().id
  useEffect(() => {
    get(id)
  }, [id])
  useEffect(() => {
    return resetDetail
  }, [])
  if(getting) return <DonutLoader page />
  if (!market) return null

  const activeIndex = TABS.findIndex(t => location.pathname.includes(t.value))
  return (
    <Col>
      <Row spaceBetween spacingTopXS spacingBottomXS spacingRightS spacingLeftS color={theme.bgColorLight}>
        <Row centerVertical>
          <Avatar icon={market.avatar} />
          <Text>{`${market.name} (${market.id})`}</Text>
          <ToastConsumer>
            {
              ({add}) => 
                <Copy S MarginLeftXS color='#fff' onClick={() => { add(`Market address copied to clipboard.`, { appearance: 'info', autoDismiss: true }); copy(market.address) }} />
            }
          </ToastConsumer>
        </Row>
        <Row centerVertical>
          <Link>
            {
              ({ goto, location }) =>
                <Button label={market.numberOfComments} icon={Comment} onClick={() => goto.discussion()} />
            }
          </Link>
          <Link>
            {
              ({ goto, location }) =>
                <Button label={market.numberOfSub} icon={CommunityMember} iconSize='14px' onClick={console.debug} />
            }
          </Link>
          <ToastConsumer>
            {
              ({add}) => // TODO: Clear up 
                <Share S color={theme.white} onClick={() => {
                  share({id: market.id}, routeMap.trading.path)
                  add(`Link copied to clipboard.`, { appearance: 'info', autoDismiss: true })
                }} />
            }
          </ToastConsumer>

          <Bookmarked S MarginLeftS onClick={() => toggleSavedMarket(market)} checked={market.following} />
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
            getPath() === routeMap.discussion.path && 
            <Row right centerVertical>
              <Search backgroundColor={theme.bgColor} bottom='1px' top='1px' right='30px' value={postKeyword} onChange={onChangeKeyword} onSearch={() => getMarketPost()} />
              <Link>
                { ({ goto }) => 
                <Col absolute absRight='0' absTop='1px' absBottom='1px' HS backgroundColor={theme.bgColor} centerVertical>
                  <Add primary={!!market.address} S color={market.address ? undefined : theme.colorSecondary} disabled={!market.address} onClick={() => market.address && goto.discussionCreate()} />
                </Col>
                }
              </Link>
            </Row>
          }
          <Hr />
        </Col>
      </Row>
      <MarketRoutes />
    </Col>
  )
}

const mapStateToProps = state => ({
  market: state.market.currentMarket,
  getting: state.market.gettingMarket,
  postKeyword: state.post.keyword,
});

const mapDispatchToProps = {
  get, toggleSavedMarket, onChangeKeyword, getMarketPost, resetDetail
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Market))