import React, { useEffect } from 'react'

import { withLink, getUrlParams, routeMap, getPath, MarketRoutes } from '../../routes'

import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { get, toggleSavedMarket, resetDetail } from '../../actions/market'
import { onChangeKeyword, getMarketPost } from '../../actions/post'

import theme from '../../theme'
import { DonutLoader } from '../../components/Loader'
import { Header } from '../../components/Header/MobileHeader'
import { Dropdown } from '../../components/Input'
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

// import lang, { currentLang } from '../../lang'
import { useLang } from '../../language'

const Market = ({ 
  get, toggleSavedMarket, getting, location, market, getMarketPost, onChangeKeyword, postKeyword, resetDetail,
  goto
}) => {
  const [lang] = useLang()
  const TABS = [
    { label: lang.marketTab.trade, value: 'trading' },
    { label: lang.marketTab.general, value: 'general' },
    { label: lang.marketTab.discussion, value: 'discussion' },
    { label: lang.marketTab.proposal, value: 'proposal' },
    { label: lang.marketTab.flag, value: 'flag' },
  ]
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
  
  function MarketName() {
    return (
      <ToastConsumer>
      {
        ({add}) => 
          <Row centerVertical onClick={() => { add(`Market address copied to clipboard.`, { appearance: 'info', autoDismiss: true }); copy(market.address) }}>
            <Avatar long icon={market.avatar} username={`${market.name} (${market.id})`} />
            <Copy S MarginLeftXS color='#fff' />
          </Row>
      }
      </ToastConsumer>
    )
  }

  function CommentButton() { return <Button label={market.numberOfComments+'000'} icon={Comment} onClick={() => goto.discussion()} /> }
  function SubButton() { return <Button label={market.numberOfSub+'000'} icon={CommunityMember} iconSize='14px' onClick={console.debug} /> }

  return (
    <Col flex={1}>
      <Header>
        <MarketName />
      </Header>
      <Dropdown options={TABS} selectedIndex={activeIndex} onChange={index => goto[TABS[index].value]()} width='100vw' hiddenDesktop  />
      <Hr />
      <Row hiddenDesktop relative>
        <CommentButton />
        <SubButton />
        <Search id='discussion-mobile' backgroundColor={theme.bgColor} value={postKeyword} onChange={onChangeKeyword} onSearch={() => getMarketPost()} />
      </Row>
      <Hr />
      <Row hiddenMobile spaceBetween VXS HS color={theme.bgColorLight}>
        <MarketName />
        <Row centerVertical>
          <CommentButton />
          <SubButton />
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
      <Row hiddenMobile relative>
        <Col>
          <Tab tabs={TABS} activeIndex={activeIndex} onClick={index => goto[TABS[index].value]()} width='100px' />
        </Col>
        <Col flex={1} spaceBetween>
          <Hr />
          {
            getPath() === routeMap.discussion.path && 
            <Row right centerVertical>
              <Search id='discussion' backgroundColor={theme.bgColor} bottom='1px' top='1px' right='30px' value={postKeyword} onChange={onChangeKeyword} onSearch={() => getMarketPost()} />
              <Col absolute absRight='0' absTop='1px' absBottom='1px' HS backgroundColor={theme.bgColor} centerVertical>
                <Add primary={!!market.address} S color={market.address ? undefined : theme.colorSecondary} disabled={!market.address} onClick={() => market.address && goto.discussionCreate()} />
              </Col>
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withLink(Market)))