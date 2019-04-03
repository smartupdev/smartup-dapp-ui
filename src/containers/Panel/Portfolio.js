import React, { useState } from 'react'
import styled, { css } from 'styled-components'

import CommentIcon from '../../images/018-planet-earth-2.svg'
import Hr from '../../components/Hr'
import Panel from '../../components/Panel'
import Table from '../../components/Table'
import Image from '../../components/Image'
import Text from '../../components/Text'
import Button from '../../components/Button'
import { Row, Col } from '../../components/Layout'
import lang, { currentLang } from '../../lang'
import theme from '../../theme';
import ethIcon from '../../images/eth.png';
import smartupIcon from '../../images/smartup.png';
import { Close, Trade } from '../../components/Icon';
const portfilioText = lang.panel.portfilio

const InfoBlock = styled(Col)`
  margin: 0 ${p => p.theme.spacingS};
  padding: ${p => `${p.theme.spacingS} ${p.theme.spacingS}` };
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
  { id: 245465, icon: CommentIcon, ct: 879.22, volume: 0.009 },
  { id: 245463, icon: CommentIcon, ct: 39.42, volume: -0.023 },
  { id: 245464, icon: CommentIcon, ct: 87.22, volume: 0.009 },
  { id: 245462, icon: CommentIcon, ct: 87.22, volume: 0.02313 },
]

const bookmarks = [
  { id: 1, name: 'DUBLER STUDIO KIT' },
  { id: 2, name: 'DUBLER STUDIO KIT' },
]

const TableName = [
  { label: '', value: 'icon', layoutStyle: { width: '16px' }, component: ({value}) => <Image XS source={value} /> },
  { label: portfilioText.wallet.id[currentLang], value: 'id', },
  { label: portfilioText.wallet.ct[currentLang], value: 'ct', component: ({value}) => <Text S>{`${value} CT`}</Text> },
  { label: portfilioText.wallet.volume[currentLang], value: 'volume', component: ({value}) => 
    <Text S style={{ color: value >= 0 ? theme.green : theme.red}}>{`${value < 0 ? '' : '+'}${(value*100).toFixed(2)}%`}</Text> 
  },
  { label: '', value: 'action', layoutStyle: { width: '40px' }, component: ({record}) => 
    <Button icon={Trade} primary light condensed />
  },
]

export default ({ethBalance, expandedWallet, setExpandedWallet, expandedMarket, setExpandedMarket, expandedBookmark, setExpandedBookmark }) => {
  return (
    <Col>
      <Col center>
        <Col spacingTop={theme.spacingXS} spacingBottom={theme.spacingXS}>
          <Row bottom spacingBottom={theme.spacingXS}>
            <Image size={theme.fontSizeXL} rightText source={ethIcon} />
            <Text L wordSpaceS>{ethBalance}</Text>
            <Text S>ETH</Text>
          </Row>
          <Row bottom>
            <Image size={theme.fontSizeXL} rightText source={smartupIcon} />
            <Text L wordSpaceS>792,323</Text>
            <Text S>SmartUp</Text>
          </Row>
        </Col>
      </Col>
      <Hr />
      <Panel
        dark={expandedWallet}
        expanded={expandedWallet}
        onClick={()=>setExpandedWallet(!expandedWallet)} 
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
        onClick={()=>setExpandedMarket(!expandedMarket)} 
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
        onClick={()=>setExpandedBookmark(!expandedBookmark)} 
        header={portfilioText.bookmark.title[currentLang]} 
        body={
          <Col>
            {
              bookmarks.map( ({name, id}, index) => 
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