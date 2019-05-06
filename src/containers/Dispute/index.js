import React, { useEffect, useRef, useState } from 'react'
import Image from '../../components/Image'
import Text from '../../components/Text'
import Panel from '../../components/Panel'
import { Row, Col } from '../../components/Layout'
import lang, { currentLang } from '../../lang'
import theme from '../../theme'
import { Information } from '../../components/Icon'
import Table from '../../components/Table'
import { More } from '../../components/Icon'
import smartupIcon from '../../images/smartup.png'

const faqText = lang.faq

const _DescOne = () =>
<Col>
<Text L bold wordSpaceL>{'this is title h1'}</Text>
<Text M wordSpaceL>{'this is title h2'}</Text>
<Image source={smartupIcon} photo cover />
</Col>

const faqs = [{
  id:0,
  title:'What is the difference between CMS users and Project users?',
  desc:_DescOne
},{
  id:1,
  title:'CMS(Content Management System) Users',
  desc:_DescOne
},{
  id:2,
  title:'How to invite other CMS Users to your project',
  desc:_DescOne
},{
  id:3,
  title:'How to invite other CMS Users to your project',
  desc:_DescOne
}];

const _Title = ({ value }) =><Text M wordSpaceM>{value}</Text>
const _More = ({ isExpanded }) => <More reverse={isExpanded} XS color={theme.white} />

const TableExpand = ({ record }) => {
  return record.desc();
}

const TableName = [
  { label: '',   value: 'title',   sortable: false,  component: _Title},
  { label: '', value: 'action', sortable: false,  component: _More, layoutStyle: { width: `calc( ${theme.iconSizeM} + 15px )`, right: true } },

]
export default function () {

  const [expandedRecords, setExpandedRecords] = useState([0])
  const onClickRecord = ({ record, key, index, isExpanded }) => {
    setExpandedRecords(
      isExpanded ? expandedRecords.filter(r => r !== record.id) : [record.id]
    )
  }

  return (
    <Col>
      <Row center centerVertical flex={1} >
        <Information S color={theme.white} style={{marginBottom:-10,marginTop:10}}/>
        <Text LeftS M center wordSpaceS style={{marginBottom:-10,marginTop:10}}>{faqText.title[currentLang]}</Text>
      </Row>
      <Table
        S
        inset
        onClick={onClickRecord}
        model={TableName}
        values={faqs}
        expandedRecords={expandedRecords}
        expandCompoent={TableExpand}
      />
    </Col>
  );
}