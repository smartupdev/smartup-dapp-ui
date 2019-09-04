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
import Text from '../../components/Text'
import { Comment, CommunityMember, Bookmarked as BookmarkedIcon, Share as ShareIcon, Copy, Add } from '../../components/Icon'
import Search from '../../components/Search'
import Hr from '../../components/Hr'
import Button from '../../components/Button'
import ButtonMore from '../../components/ButtonMore'
import Avatar from '../../components/Avatar'

import {AddDiscussion} from './Discussion'

import { withToast } from '../../components/Toast'
import { copy } from '../../lib/util'
import { share as copyShareLink } from '../../alphaWebService'

// import lang, { currentLang } from '../../lang'
import { useLang } from '../../language'

const Market = ({ 
  get, toggleSavedMarket, getMarketPost, onChangeKeyword, resetDetail, // from action
  market, postKeyword,  // from store
  location, goto, 
  addToast
}) => {
  const [{ marketTab: marketTabText }] = useLang()
  let TABS = [
    { label: marketTabText.trade, value: 'trading' },
    { label: marketTabText.general, value: 'general' },
    { label: marketTabText.discussion, value: 'discussion' },
    { label: marketTabText.proposal, value: 'proposal' },
    { label: marketTabText.flag, value: 'flag' },
  ]
  if(market.stage === -1) 
    TABS.push({ label: 'Dissolve', value: 'dissolve', dot: true })
  const id = getUrlParams().id
  useEffect(() => {
    get(id)
  }, [id])
  useEffect(() => {
    return resetDetail
  }, []) // id

  const activeIndex = TABS.findIndex(t => location.pathname.includes(t.value))
  
  function MarketName() {
    return (
      <Row centerVertical onClick={() => { addToast(`Market address copied to clipboard.`); copy(market.address) }}>
        <Avatar long icon={market.avatar} username={`${market.name} (${id})`} />
        <Copy S MarginLeftXS color='#fff' />
      </Row>
    )
  }
  function CommentButton() { return <Button label={market.numberOfComments} icon={Comment} onClick={() => goto.discussion()} /> }
  function SubButton() { return <Button label={market.numberOfSub} icon={CommunityMember} iconSize='14px' onClick={console.debug} /> }
  function Share() { 
    return (
      <ShareIcon S color={theme.white} onClick={() => {
        copyShareLink({id: market.id}, routeMap.trading.path)
        addToast(`Link copied to clipboard.`)
      }} />
    )
  }
  function Bookmarked(props) {
    return <BookmarkedIcon S onClick={() => toggleSavedMarket(market)} checked={market.following} {...props} />
  }

  const isDiscussion = getPath() === routeMap.discussion.path
  const DiscussionSearch = id => { // please use this by DiscussionSearch(), don't use <DiscussionSearch />. 
    return isDiscussion && <Search id={id} bgColor bottom='1px' top='1px' right='30px' value={postKeyword} customBgColor={theme.bgColor} onChange={onChangeKeyword} onSearch={() => getMarketPost()} />
  }
  
  if(market.error) return <Text error spacingM center>{market.error.message}</Text>
  if(market.getting) return <DonutLoader page />
  // if (!id) return null

  return (
    <Col flex={1}>
      <Header>
        <MarketName />
      </Header>
      <Dropdown options={TABS} selectedIndex={activeIndex} onChange={index => goto[TABS[index].value]()} width='100%' hiddenDesktop  />
      <Hr hiddenDesktop />
      <Row hiddenDesktop relative centerVertical spaceBetween fitHeight>
        <Row>
          <CommentButton />
          <SubButton />
        </Row>
        {DiscussionSearch('discussion-mobile')}
        <ButtonMore icons={isDiscussion ? [Share, Bookmarked, AddDiscussion] : [Share, Bookmarked]} />
      </Row>
      <Hr hiddenDesktop />
      <Row fitHeight hiddenMobile spaceBetween VXS HS bgLight>
        <MarketName />
        <Row centerVertical>
          <CommentButton />
          <SubButton />
          <Share />
          <Bookmarked MarginLeftS />
        </Row>
      </Row>
      <Row fitHeight hiddenMobile relative>
        <Col>
          <Tab tabs={TABS} activeIndex={activeIndex} onClick={index => goto[TABS[index].value]()} width='100px' />
        </Col>
        <Col flex={1} spaceBetween>
          <Hr />
          {isDiscussion && 
            <Row right centerVertical>
              {DiscussionSearch('discussion-desktop')}
              <Col absolute absRight='0' absTop='1px' absBottom='1px' HS bgColor centerVertical>
                <AddDiscussion />
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
  market: state.market,
  postKeyword: state.post.keyword,
});

const mapDispatchToProps = {
  get, toggleSavedMarket, onChangeKeyword, getMarketPost, resetDetail
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withToast(withLink(Market))))