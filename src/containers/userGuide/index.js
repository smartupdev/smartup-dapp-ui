import React, { useState } from 'react'

import { RichContent } from '../../components/Input'
import Image from '../../components/Image'
import Cover from '../../images/user_guide_cover.gif'
import { useLang } from '../../language'

import { Desktop, Mobile } from './Main'

const TextBody = ({children, ...rest}) => <RichContent disabled newline VXS note {...rest}>{children}</RichContent>

export default () => {
  const [gifSource] = useState(`${Cover}?a=${Math.random()}`)
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

  const props = {
    coverPhoto: <Image source={gifSource} style={{ width: '100%', height: 'inherit' }} />,
    sections: sections,
    title: title,
    TextBody: TextBody,
  }

  return (
    <>
      <Desktop {...props} />
      <Mobile {...props} />
    </>
  )
}