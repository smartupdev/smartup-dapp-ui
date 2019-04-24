import React, { useEffect } from 'react'
import styled, { css } from 'styled-components'

import { connect } from 'react-redux'
import { toggleExpandedBookmark, toggleExpandedMarket, toggleExpandedWallet } from '../../actions/panel'
import { getMarketGlobal,getCtAccountInMarket,collectMarket } from '../../actions/market'
import { getUserCollectLists } from '../../actions/collect'


import CommentIcon from '../../images/018-planet-earth-2.svg'
import Avatar from '../../components/Avatar'
import Hr from '../../components/Hr'
import Panel from '../../components/Panel'
import Table from '../../components/Table'
import Image from '../../components/Image'
import Text from '../../components/Text'
import Button from '../../components/Button'
import { Row, Col } from '../../components/Layout'
import lang, { currentLang } from '../../lang'
import { Link } from '../../routes'
import { toToken } from '../../lib/util'
import theme from '../../theme';
import ethIcon from '../../images/eth.png';
import smartupIcon from '../../images/smartup.png';
import { Close, Trade } from '../../components/Icon';
const portfilioText = lang.panel.portfilio

const InfoBlock = styled(Col)`
  margin: 0 ${p => p.theme.spacingS};
  padding: ${p => `${p.theme.spacingS} ${p.theme.spacingS}`};
  ${p => !p.first &&
    css`border-top: ${p => p.theme.borderColor} solid 1px;`
  }
`
const BookmarkBlock = styled(Row)`
  padding: ${p => `${p.theme.spacingS} ${p.theme.spacingS} ${p.theme.spacingS} calc( ${p.theme.spacingS} * 2)`};
  ${p => !p.first &&
    css`border-bottom: ${p => p.theme.borderColor} solid 1px;`
  }

`

// const walletList = [
//   { id: 245465, ct: 879.22, volume: 0.009 },
//   { id: 245463, ct: 39.42, volume: -0.023 },
//   { id: 245464, ct: 87.22, volume: 0.009 },
//   { id: 245462, icon: CommentIcon, ct: 87.22, volume: 0.02313 },
// ]

const TableName = [
  { label: '', value: 'icon', layoutStyle: { width: '18px' }, component: ({ value }) => <Avatar XS icon={value} /> },
  { label: portfilioText.wallet.id[currentLang], value: 'marketId', },
  { label: portfilioText.wallet.ct[currentLang], value: 'ctAmount', component: ({ value }) => <Text S>{`${value}`}</Text> },
  {
    label: portfilioText.wallet.volume[currentLang], value: 'latelyChange', component: ({ value }) =>
      <Text S style={{ color: value >= 0 ? theme.green : theme.red }}>{`${value < 0 ? '' : '+'}${(value * 100).toFixed(2)}%`}</Text>
  },
  {
    label: '', value: 'action', layoutStyle: { width: '40px' }, component: ({ record }) =>
      <Link>
        { ({goto}) => <Button icon={Trade} primary light condensed onClick={() => goto.trading({id: record.id})} /> }
      </Link>
  },
]

const Portfilio = ({
  ethBalance, sutBalance,marketGlobal,collects,ctInMarket,
  expandedWallet, expandedMarket, expandedBookmark,
  toggleExpandedBookmark, toggleExpandedMarket, toggleExpandedWallet,
  getMarketGlobal,getUserCollectLists,getCtAccountInMarket,collectMarket
}) => {
  useEffect(() => {
    getMarketGlobal()
    getUserCollectLists()
    getCtAccountInMarket()
  }, [])
  const {sutAmount,marketCount,latelyPostCount} = marketGlobal
  return (
    <Col>
      <Col center>
        <Col TopXS BottomXS>
          <Row bottom BottomXS>
            <Image size={theme.fontSizeXL} rightText source={ethIcon} />
            <Text L wordSpaceS>{toToken(ethBalance)}</Text>
            <Text S>ETH</Text>
          </Row>
          <Row bottom>
            <Image size={theme.fontSizeXL} rightText source={smartupIcon} />
            <Text L wordSpaceS>{toToken(sutBalance)}</Text>
            <Text S>SmartUp</Text>
          </Row>
        </Col>
      </Col>
      <Hr />
      <Panel
        dark={expandedWallet}
        expanded={expandedWallet}
        onClick={toggleExpandedWallet}
        header={portfilioText.wallet.title[currentLang]}
        body={
          <>
            <Col BottomXS LeftS RightS>
              <Table S noBorderCol model={TableName} values={ctInMarket} />
            </Col>
            <Hr />
          </>
        }
      />
      <Panel
        expanded={expandedMarket}
        dark={expandedMarket}
        onClick={toggleExpandedMarket}
        header={portfilioText.marketInfo.title[currentLang]}
        body={
          <>
            <Col>
              <InfoBlock first>
                <Text S spaceBottom>{portfilioText.marketInfo.totalSmartup[currentLang]}</Text>
                <Text L wordSpaceM bold>{sutAmount}</Text>
              </InfoBlock>
              <InfoBlock>
                <Text S spaceBottom>{portfilioText.marketInfo.totalMarket[currentLang]}</Text>
                <Text L wordSpaceM bold>{marketCount}</Text>
              </InfoBlock>
              <InfoBlock>
                <Text S spaceBottom>{portfilioText.marketInfo.totalDiscussion[currentLang]}</Text>
                <Text L wordSpaceM bold>{latelyPostCount}</Text>
              </InfoBlock>
            </Col>
            <Hr />
          </>
        }
      />
      <Panel
        expanded={expandedBookmark}
        dark={expandedBookmark}
        onClick={toggleExpandedBookmark}
        header={portfilioText.bookmark.title[currentLang]}
        body={
          <Col>
            {
              collects.map(({ name, marketId }, index) =>
                <BookmarkBlock spaceBetween centerVertical key={index}>
                  <Text S>{name}</Text>
                  <Close XS onClick={() => collectMarket({id: marketId, following: true})} />
                </BookmarkBlock>
              )
            }
          </Col>
        }
      />
    </Col>
  )
}

const mapStateToProps = state => ({
  ethBalance: state.user.ethBalance,
  sutBalance: state.user.sutBalance,
  expandedWallet: state.panel.expandedWallet,
  expandedMarket: state.panel.expandedMarket,
  expandedBookmark: state.panel.expandedBookmark,
  marketGlobal: state.market.marketGlobal,
  collects: state.collect.collects,
  ctInMarket: state.market.ctInMarket,
});

const mapDispatchToProps = { 
  toggleExpandedBookmark, toggleExpandedMarket, toggleExpandedWallet,
  getMarketGlobal,getUserCollectLists,getCtAccountInMarket,collectMarket,
}

export default connect(mapStateToProps, mapDispatchToProps)(Portfilio);