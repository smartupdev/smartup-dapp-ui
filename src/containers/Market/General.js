import React from 'react'

// import Table from '../../components/Table'
import { ENV } from '../../config'
import Image from '../../components/Image'
import Text from '../../components/Text'
import Panel from '../../components/Panel'
import Hr from '../../components/Hr'
import { Row, Col } from '../../components/Layout'
// import lang, { currentLang } from '../../lang'
import { useLang } from '../../language'
import theme from '../../theme';
import { Information } from '../../components/Icon';
import { connect } from 'react-redux'
import { toggleExpandedInfo, toggleExpandedRule, toggleExpandedSub } from '../../actions/general';
import moment from 'moment';

const InfoBody = ({ info }) => {
  const [{general: generalText}] = useLang()
  return (
    <>
      <Row VS directions={['column', 'row']}>
        <Col width={['100', '400px']} HS>
          <Image source={ENV.ipfsHost + info.cover} style={{ height: 'auto', width: '100%' }} />
        </Col>
        <Col HS TopS>
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
            <Text M spacingTopBase newline>{info.description}</Text>
          </Col>
        </Col>
      </Row>
      <Hr />
    </>
  )
}

const Title = ({ title }) => {
  return (
    <>
      <Row centerVertical center VXS>
        <Information S color={theme.white} />
        <Text M wordSpaceS LeftS>{title}</Text>
      </Row>
      <Hr />
    </>
  )
}

const General = ({ expandedInfo, expandedRule, expandedSub, toggleExpandedInfo, 
  toggleExpandedRule, toggleExpandedSub,market,gettingMarket }) => {
  const [{general: generalText}] = useLang()
  if(!market || gettingMarket) return null
  return (
    <Col>
      <Title title={generalText.info} />
      <InfoBody info={market} />
      {/* <Panel
        dark={expandedInfo}
        expanded={expandedInfo}
        onClick={toggleExpandedInfo}
        header={<TitleIcon title={generalText.info} />}
        body={<InfoBody info={market} />}
      /> */}
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