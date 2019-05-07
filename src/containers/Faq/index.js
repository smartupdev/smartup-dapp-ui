import React, { useEffect, useRef, useState } from 'react'
import Image from '../../components/Image'
import Text from '../../components/Text'
import Panel from '../../components/Panel'
import { Row, Col } from '../../components/Layout'
import lang, { currentLang } from '../../lang'
import theme from '../../theme'
import { Faq, More } from '../../components/Icon'
import Table from '../../components/Table'
import Hr from '../../components/Hr'
import smartupIcon from '../../images/smartup.png'

const faqText = lang.faq

function Ans({ ansTitle, ansContent, image }) {
  return (
    <Col>
      <Text L bold wordSpaceL>{ansTitle}</Text>
      { image && <Image source={image} TopS actualSize /> }
      <Text M wordSpaceL TopS BottomS>{ansContent}</Text>
    </Col>
  )
}

const faqs = [
  {
    title: 'What is the difference between CMS users and Project users?',
    ansTitle: 'i am title', 
    ansContent: 'i am content', 
    image: null
  },
  {
    title: 'CMS(Content Management System) Users',
    ansTitle: 'i am title', 
    ansContent: 'i am content', 
    image: null
  },
  {
    title: 'How to invite other CMS Users to your project',
    ansTitle: 'i am title', 
    ansContent: 'i am content', 
    image: null
  },
  {
    title: 'How to invite other CMS Users to your project',
    ansTitle: 'i am title', 
    ansContent: 'i am content', 
    image: null
  }
];

export default function () {
  const [expandedRecord, setExpandedRecord] = useState(0)
  return (
    <Col>
      <Row center centerVertical VS >
        <Faq S color={theme.white}  />
        <Text LeftS M center wordSpaceS>{faqText.title[currentLang]}</Text>
      </Row>
      <Hr />
      {
        faqs.map( (faq, index) => 
          <Panel
            key={index}
            header={faq.title}
            body={<Ans {...faq} />}
            expandedDark
            expanded={expandedRecord === index}
            onClick={() => setExpandedRecord(index)}
          />
        )
      }
    </Col>
  );
}