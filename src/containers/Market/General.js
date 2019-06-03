import React from 'react'

// import Table from '../../components/Table'
import { ENV } from '../../config'
import Image from '../../components/Image'
import Text from '../../components/Text'
import Panel from '../../components/Panel'
import { Row, Col } from '../../components/Layout'
// import lang, { currentLang } from '../../lang'
import { useLang } from '../../language'
import theme from '../../theme';
import { Information } from '../../components/Icon';
import { connect } from 'react-redux'
import { toggleExpandedInfo, toggleExpandedRule, toggleExpandedSub } from '../../actions/general';
import moment from 'moment';


// const subs = [{ rank: 1, name: 'Tony', ct: '180.29' }, { rank: 2, name: 'Tony', ct: '180.29' }, { rank: 3, name: 'Tony', ct: '180.29' },
// { rank: 4, name: 'Tony', ct: '180.29' }, { rank: 5, name: 'Tony', ct: '180.29' }]

// const SubTableName = [
//   { label: generalText.table.rank[currentLang], value: 'rank', layoutStyle: { width: '80px', center: true }, component: ({ value }) => <Text S>{`${value}`}</Text> },
//   { label: generalText.table.name[currentLang], value: 'name', layoutStyle: { width: '80px', center: true }, component: ({ value }) => <Text S>{`${value}`}</Text> },
//   { label: generalText.table.ct[currentLang], value: 'ct', layoutStyle: { width: '160px', center: true }, component: ({ value }) => <Text S>{`${value}`}</Text> },
// ]

// const rules = [
//   {id:1, title: '1.NO US Internal News or Policies', desc: '' },
//   {id:2, title: '2.NO Memes, Gifs, unlabeled NSFW images', desc: 'NO Memes, Gifs, unlabeled NSFW imagesNO Memes, Gifs, unlabeled NSFW imagesNO Memes, Gifs, unlabeled NSFW imagesNO Memes, Gifs, unlabeled NSFW imagesNO Memes, Gifs, unlabeled NSFW imagesNO Memes, Gifs, unlabeled NSFW images' },
// ]

// const ruleTableName = [
//   { label: '', value: 'title', component: ({ value }) => <Text S>{`${value}`}</Text> },
// ]

const InfoBody = ({ info }) => {
  const [lang] = useLang()
  const generalText = lang.general
    return (
    <Row BottomS TopS>
      <Col LeftXS RightXS>
        <Image source={ENV.ipfsHost + info.cover} photo cover style={{ height: 'auto' }} />
      </Col>
      <Col>
        <Row BottomM>
          <Col RightM>
            <Text XS note>{generalText.createTime}</Text>
            <Text M wordSpaceM spacingTopBase>{moment(info.createTime).format('DD MMM YYYY')}</Text>
          </Col>
          <Col>
            <Text XS note>{generalText.creator}</Text>
            <Text M wordSpaceM spacingTopBase>{info.creator.name || info.creator.userAddress}</Text>
          </Col>
        </Row>
        <Col>
          <Text XS note>{generalText.overview}</Text>
          <Text M spacingTopBase>{info.description}</Text>
        </Col>
      </Col>
    </Row>
  )
}

// const TableExpand = ({record})=>{
//   return(
//     <Text S>{record.desc}</Text>
//   );
// }

// const RuleBody = ({ rules,expandedRecords }) => {
//   return (<Row BottomXS LeftS RightS spaceBetween>
//     <Table
//       S
//       inset
//       model={ruleTableName} 
//       values={rules}
//       expandedRecords={expandedRecords}
//       expandCompoent={TableExpand} />
//   </Row>);
// }

// const SubBody = ({ subs }) => {
//   return (<Row BottomXS LeftS RightS spaceBetween>
//     <Table S model={SubTableName} values={subs} />
//     <Table S model={SubTableName} values={subs} />
//     <Table S model={SubTableName} values={subs} />
//   </Row>);
// }

const TitleIcon = ({ title }) => {
  return (
    <Row centerVertical>
      <Information S color={theme.white} />
      <Text M wordSpaceS LeftS>{title}</Text>
    </Row>
  )
}

const General = ({ expandedInfo, expandedRule, expandedSub, toggleExpandedInfo, 
  toggleExpandedRule, toggleExpandedSub,market,gettingMarket }) => {
    const [lang] = useLang()
    const generalText = lang.general
  if(!market || gettingMarket) return null
  return (
    <Col>
      <Panel
        dark={expandedInfo}
        expanded={expandedInfo}
        onClick={toggleExpandedInfo}
        header={<TitleIcon title={generalText.info} />}
        body={<InfoBody info={market} />}
      />
      {/* <Panel
        dark={expandedRule}
        expanded={expandedRule}
        onClick={toggleExpandedRule}
        header={<TitleIcon title={generalText.rule[currentLang]} />}
        body={<RuleBody rules={rules} expandedRecords={[2]}/>}
      /> */}
      {/* <Panel
        dark={expandedSub}
        expanded={expandedSub}
        onClick={toggleExpandedSub}
        header={<TitleIcon title={generalText.sub[currentLang]} />}
        body={<SubBody subs={subs} />}
      /> */}
    </Col>
  );
}

const mapStateToProps = state => ({
  expandedInfo: state.general.expandedInfo,
  expandedRule: state.general.expandedRule,
  expandedSub: state.general.expandedSub,
  market: state.market.currentMarket,
  gettingMarket: state.market.gettingMarket,
});

const mapDispatchToProps = {
  toggleExpandedInfo, toggleExpandedRule, toggleExpandedSub
}

export default connect(mapStateToProps, mapDispatchToProps)(General);