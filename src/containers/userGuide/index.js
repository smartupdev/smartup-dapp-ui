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
  const [{ userGuide: { 
    title,
    installChrome, installMetamask, addEth, addSut, loginTxt, personalCenterTxt, notificationTxt, createMktTxt, tradeTxt, mktDiscussionTxt,
    faqGeneral: general, faqCreator: creator, faqInvestor: investor,
    tab
  } }] = useLang()

  const sections = [
    { title: tab.getstarted, sections: [
      { title: tab.installChrome, body: installChrome },
      { title: tab.installMetamask, body: installMetamask },
      { title: tab.addEth, body: addEth },
      { title: tab.addSut, body: addSut },
    ]},
    { title: tab.loginSetting, sections: [
      { title: tab.login, body: loginTxt },
      { title: tab.setting, body: personalCenterTxt },
      { title: tab.notification, body: notificationTxt },
    ]},
    { title: tab.market, sections: [
      { title: tab.createMkt, body: createMktTxt },
      { title: tab.trade, body: tradeTxt },
      { title: tab.mktdiscussion, body: mktDiscussionTxt },
    ] },
    { title: tab.faq, sections: [
      { title: tab.general, body: general },
      { title: tab.creator, body: creator },
      { title: tab.investor, body: investor },
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
      <Text center VXL XL newline>{title}</Text>
      <Row flex={1}>
        <Col LeftL RightXL id={userGuideId} hiddenMobile overflowAuto style={{ paddingTop: leftMenuY < 0 ? Math.abs(leftMenuY) : 0 }}>
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