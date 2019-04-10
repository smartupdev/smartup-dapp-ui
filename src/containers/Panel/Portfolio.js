import React, { useState } from 'react'
import styled, { css } from 'styled-components'

import { connect } from 'react-redux'
import { toggleExpandedBookmark, toggleExpandedMarket, toggleExpandedWallet } from '../../actions/panel'

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
import { toToken } from '../../lib/util'
import theme from '../../theme';
import ethIcon from '../../images/eth.png';
import smartupIcon from '../../images/smartup.png';
import { Close, Trade, People } from '../../components/Icon';
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

const walletList = [
  { id: 245465, ct: 879.22, volume: 0.009 },
  { id: 245463, ct: 39.42, volume: -0.023 },
  { id: 245464, ct: 87.22, volume: 0.009 },
  { id: 245462, icon: CommentIcon, ct: 87.22, volume: 0.02313 },
]

const bookmarks = [
  { id: 1, name: 'DUBLER STUDIO KIT' },
  { id: 2, name: 'DUBLER STUDIO KIT' },
]

const TableName = [
  { label: '', value: 'icon', layoutStyle: { width: '18px' }, component: ({ value }) => <Avatar XS icon={value} /> },
  { label: portfilioText.wallet.id[currentLang], value: 'id', },
  { label: portfilioText.wallet.ct[currentLang], value: 'ct', component: ({ value }) => <Text S>{`${value} CT`}</Text> },
  {
    label: portfilioText.wallet.volume[currentLang], value: 'volume', component: ({ value }) =>
      <Text S style={{ color: value >= 0 ? theme.green : theme.red }}>{`${value < 0 ? '' : '+'}${(value * 100).toFixed(2)}%`}</Text>
  },
  {
    label: '', value: 'action', layoutStyle: { width: '40px' }, component: ({ record }) =>
      <Button icon={Trade} primary light condensed />
  },
]

const Portfilio = ({
  ethBalance, sutBalance,
  expandedWallet, expandedMarket, expandedBookmark,
  toggleExpandedBookmark, toggleExpandedMarket, toggleExpandedWallet
}) => {
  return (
    <Col>
      <Col center>
        <Col spacingTop={theme.spacingXS} spacingBottom={theme.spacingXS}>
          <Row bottom spacingBottom={theme.spacingXS}>
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
            <Col spacingBottom={theme.spacingXS} spacingLeft={theme.spacingS} spacingRight={theme.spacingS}>
              <Table S noBorderCol model={TableName} values={walletList} />
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
                <Text L wordSpaceM bold>834,585,923</Text>
              </InfoBlock>
              <InfoBlock>
                <Text S spaceBottom>{portfilioText.marketInfo.totalMarket[currentLang]}</Text>
                <Text L wordSpaceM bold>1,547</Text>
              </InfoBlock>
              <InfoBlock>
                <Text S spaceBottom>{portfilioText.marketInfo.totalDiscussion[currentLang]}</Text>
                <Text L wordSpaceM bold>2,364</Text>
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
              bookmarks.map(({ name, id }, index) =>
                <BookmarkBlock spaceBetween centerVertical key={index}>
                  <Text S>{name}</Text>
                  <Close XS onClick={() => console.log(id)} />
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
  ethBalance: state.metamask.ethBalance,
  sutBalance: state.metamask.sutBalance,
  expandedWallet: state.panel.expandedWallet,
  expandedMarket: state.panel.expandedMarket,
  expandedBookmark: state.panel.expandedBookmark,
});

const mapDispatchToProps = { 
  toggleExpandedBookmark, toggleExpandedMarket, toggleExpandedWallet
}

export default connect(mapStateToProps, mapDispatchToProps)(Portfilio);