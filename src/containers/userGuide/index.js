import React, { useState, useEffect, Fragment, useRef } from 'react'
import { useScroll, getElementById } from '../../lib/react'
import { mainId } from '../../containers/App'

import Text from '../../components/Text'
import { RichContent } from '../../components/Input'
import Image from '../../components/Image'
import Cover from '../../images/user_guide_cover.gif'
import BG from '../../images/user_guide_bg.png'
import { Row, Col } from '../../components/Layout'
import { useLang } from '../../language'
const TextBody = ({children}) => <RichContent disabled newline VXS note>{children}</RichContent>

const userGuideId = 'user-guide-id'

export default () => {
  const [gifSource] = useState(`${Cover}?a=${Math.random()}`)
  const [leftMenuY] = useScroll(userGuideId, mainId)
  const [lang] = useLang()

  const installChrome = lang.userGuide.installChrome
  const installMetamask = lang.userGuide.installMetamask  
  const addEth = lang.userGuide.addEth  
  const addSut = lang.userGuide.addSut
  const loginTxt = lang.userGuide.loginTxt
  const personalCenterTxt = lang.userGuide.personalCenterTxt
  const notificationTxt = lang.userGuide.notificationTxt
  const createMktTxt = lang.userGuide.createMktTxt  
  const tradeTxt = lang.userGuide.tradeTxt
  const mktDiscussionTxt = lang.userGuide.mktDiscussionTxt

  const general = lang.userGuide.faqGeneral
  const creator = lang.userGuide.faqCreator
  const investor = lang.userGuide.faqInvestor

  const sections = [
    { title: lang.userGuide.tab.getstarted, sections: [
      { title: lang.userGuide.tab.installChrome, body: installChrome },
      { title: lang.userGuide.tab.installMetamask, body: installMetamask },
      { title: lang.userGuide.tab.addEth, body: addEth },
      { title: lang.userGuide.tab.addSut, body: addSut },
    ]},
    { title: lang.userGuide.tab.loginSetting, sections: [
      { title: lang.userGuide.tab.login, body: loginTxt },
      { title: lang.userGuide.tab.setting, body: personalCenterTxt },
      { title: lang.userGuide.tab.notification, body: notificationTxt },
    ]},
    { title: lang.userGuide.tab.market, sections: [
      { title: lang.userGuide.tab.createMkt, body: createMktTxt },
      { title: lang.userGuide.tab.trade, body: tradeTxt },
      { title: lang.userGuide.tab.mktdiscussion, body: mktDiscussionTxt },
    ] },
    { title: lang.userGuide.tab.faq, sections: [
      { title: lang.userGuide.tab.general, body: general },
      { title: lang.userGuide.tab.creator, body: creator },
      { title: lang.userGuide.tab.investor, body: investor },
    ] },
  ]

  const refs = sections.map(({ sections }) => ({
    title: useRef(),
    sections: sections.map(() => useRef())
  }))  
  function scrollTo(index, j) {
    const ele = typeof j === 'number' ? refs[index].sections[j] : refs[index].title
    getElementById(mainId).scrollTo(0, ele.current.offsetTop)
  }

  return (
    <Col flex={1} fitHeight style={{ backgroundImage: `url("${BG}")`, backgroundRepeat: 'repeat-y', backgroundSize: `100% auto`}}>
      <Image source={gifSource} style={{ width: '100%', height: 'inherit' }} />
      <Row flex={1}>
        <Col LeftL RightXL id={userGuideId} overflowAuto style={{ maxHeight: '100vh', paddingTop: leftMenuY < 0 ? Math.abs(leftMenuY) : 0 }}>
          {
            sections.map( ({title, sections}, index) => 
              <Fragment key={title}>
                <Text note TopS onClick={() => scrollTo(index)}>{title}</Text>
                {sections.map( ({title}, j) => 
                  <Text note TopXS LeftL key={title} onClick={() => scrollTo(index, j)}>{title}</Text>
                )}
              </Fragment>
            )
          }
        </Col>
        <Col flex={1} LeftXL RightS>
          {
            sections.map( ({title, sections}, index) => 
              <Fragment key={title}>
                <Text note XL ref={refs[index].title}>{title}</Text>
                {sections.map( ({title, body}, j) => 
                  <Col key={title} ref={refs[index].sections[j]}>
                    <Text primary L TopS>{title}</Text>
                    {typeof body === 'string' ? <TextBody>{body}</TextBody> : body}
                  </Col>
                )}
              </Fragment>
            )
          }
        </Col>
      </Row>
    </Col>
  )
}