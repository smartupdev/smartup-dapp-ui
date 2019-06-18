import React, { useState, useEffect, Fragment, useRef } from 'react'
import styled, { css } from 'styled-components'
import theme from '../../theme'
// import { spacingCss, onClickCss, fontCss, responsiveCss } from '../../components/Theme'

import { useScroll, getElementById } from '../../lib/react'
import { mainId } from '../App'

import Panel from '../../components/Panel'
import Text from '../../components/Text'
import { RichContent, Dropdown } from '../../components/Input'
import Image from '../../components/Image'
import Cover from '../../images/user_guide_cover.gif'
import BG from '../../images/user_guide_bg.png'
import { Row, Col } from '../../components/Layout'
import { useLang } from '../../language'

const Box = styled(Col)`
  flex: 1;
  min-height: fit-content;
  background-image: url( ${BG} );
  background-repeat: repeat-y;
  background-size: 100% auto;
`

export function Mobile({ sections, coverPhoto, title, TextBody }) {
  const [selectedIndex, setIndex] = useState(0)
  const [expanded, setExpanded] = useState([])
  function toggleExpand(index) {
    let t = [...expanded]
    t[index] = !t[index]
    setExpanded(t)
  }
  const currentSections = sections[selectedIndex].sections
  return (
    <Box hiddenDesktop>
      <Dropdown absolute absLeft='0' absRight='0' zIndex={1} backgroundColor={theme.bgColor} options={sections.map(({ title }) => ({ label: title, value: title }))} selectedIndex={selectedIndex} onChange={i => setIndex(i)} width="100%" />
      <Col MarginVL width='100%' />
      {coverPhoto}
      <Text center VXL XL newline>{title}</Text>
      <Col flex={1} BottomL>
        {currentSections.map(({ title, body }, index) => (
          <Panel 
            key={title}  
            bottomLine
            expanded={expanded[index]}
            onClick={() => toggleExpand(index)}
            header={title}
            body={<Col HM VXS><TextBody>{body}</TextBody></Col>} />
        ))}
      </Col>
    </Box>
  )
}

export function Desktop({ sections, coverPhoto, title, TextBody }) {
  const userGuideId = 'user-guide-id'
  const [leftMenuY] = useScroll(userGuideId, mainId)
  const refs = sections.map(({ sections }) => ({
    title: useRef(),
    sections: sections.map(() => useRef())
  }))  
  function scrollTo(index, j) {
    const ele = typeof j === 'number' ? refs[index].sections[j] : refs[index].title
    getElementById(mainId).scrollTo(0, ele.current.offsetTop)
  }

  return (
    <Box hiddenMobile>
      {coverPhoto}
      <Text center VXL XL newline>{title}</Text>
      <Row flex={1}>
        <Col LeftL RightXL id={userGuideId} overflowAuto style={{ paddingTop: leftMenuY < 0 ? Math.abs(leftMenuY) : 0 }}>
          {sections.map(({ title, sections }, index) => (
            <Fragment key={title}>
              <Text note TopS onClick={() => scrollTo(index)}>
                {title}
              </Text>
              {sections.map(({ title }, j) => (
                <Text note TopXS LeftL key={title} onClick={() => scrollTo(index, j)}>
                  {title}
                </Text>
              ))}
            </Fragment>
          ))}
        </Col>
        <Col flex={1} LeftXL RightS>
          {sections.map(({ title, sections }, index) => (
            <Fragment key={title}>
              <Text note XL ref={refs[index].title}>{title}</Text>
              {sections.map(({ title, body }, j) => (
                <Col key={title} ref={refs[index].sections[j]}>
                  <Text primary L TopS>
                    {title}
                  </Text>
                  {typeof body === 'string' ? <TextBody>{body}</TextBody> : body}
                </Col>
              ))}
            </Fragment>
          ))}
        </Col>
      </Row>
    </Box>
  )
}
