import React, { useEffect, useState } from 'react'
import styled, { css } from 'styled-components'

import { connect } from 'react-redux'
import { toggleExpandedBookmark, toggleExpandedMarket, toggleExpandedWallet } from '../../actions/panel'
import { getMarketWallet, delSavedMarket } from '../../actions/market'
import { getCollectedMarketsPanel } from '../../actions/personalCenter'
import { getGlobalMarket } from '../../actions/globalInfo'
// import { getList } from '../../actions/bookmark'

import Avatar from '../../components/Avatar'
import Hr from '../../components/Hr'
import Panel from '../../components/Panel'
import Expand from '../../components/Expand'
import Table from '../../components/Table'
import Image from '../../components/Image'
import Text from '../../components/Text'
import Input from '../../components/Input'
import Button from '../../components/Button'
import ScrollLoader from '../../components/ScrollLoader'
import { Row, Col } from '../../components/Layout'
// import lang, { currentLang } from '../../lang'
import { useLang } from '../../language'
import { Link } from '../../routes'
import { toToken, toPercent } from '../../lib/util'
import theme from '../../theme';
import metamask from '../../images/metamask_icon.png';
import ethIcon from '../../images/eth.png';
import smartupIcon from '../../images/rocket_icon.png';
import { Close, Trade, EditPan } from '../../components/Icon';



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

const Token = ({ icon, label, amount, open, setOpen }) => {
  const [isBuy, setIsBuy] = useState(true)
  const [input, inputChange] = useState('')
  return (
    <>
      <Row centerVertical BottomXS TopXS LeftXL MarginLeftL onClick={() => setOpen(!open)}>
        <Image size={theme.fontSizeXL} rightText source={icon} />
        <Text L wordSpaceS>{toToken(amount)}</Text>
        <Text S RightBase><sub>{label}</sub></Text>
        { open ? <Close secondary XS /> : <EditPan secondary S /> } 
      </Row>
      <Expand isOpen={open}>
        <Col bgDark BottomS>
          <Row center centerVertical VS>
            <Avatar icon={metamask} username='MetaMask' vertical noipfs note />
            <Trade noSelect rightActive={isBuy} leftActive={!isBuy} color={theme.bgColorLight} HS onClick={() => setIsBuy(!isBuy)} />
            <Avatar icon={smartupIcon} username='Platform' vertical noipfs note />
          </Row>
          <Text center note XS BottomS>{`${isBuy ? 'MetaMask' : 'Platform'} Balance: ${toToken(amount)} ${label}`}</Text>
          <Row HS centerVertical>
            <Col flex={1} HS>
              <Input number value={input} onChange={v => inputChange(v)} underline placeholder='0.00' />
            </Col>
            <Text note S>{label}</Text>
          </Row>
          <Row center TopS>
            <Button icon={Trade} textProps={{S: true}} primary label={isBuy ? 'Deposit' : 'Withdraw'} />
          </Row>
        </Col>
      </Expand>  
    </>
  )
}

const Portfolio = ({
  setOpen,
  userSavedMarketPanel,
  ethBalance, sutBalance, 
  expandedWallet, expandedMarket, expandedBookmark,
  toggleExpandedBookmark, toggleExpandedMarket, toggleExpandedWallet,
  getCollectedMarketsPanel, 
  userMarketWallet, getMarketWallet, 
  globalInfo, getGlobalMarket,
  delSavedMarket
}) => {
  useEffect(() => {
    getGlobalMarket()
    getCollectedMarketsPanel()
    getMarketWallet()
  }, [])
  const [ethOpen, setEthOpen] = useState(false)
  const [sutOpen, setSutOpen] = useState(false)
  const { sutAmount, marketCount, latelyPostCount } = globalInfo.globalMarket
  const [lang] = useLang()
  const portfolioText = lang.panel.portfolio
  const TableName = [ // TODO
    { label: '', value: 'marketPhoto', layoutStyle: { width: '18px' }, component: ({ value }) => <Avatar XS icon={value} /> },
    { label: portfolioText.wallet.id, value: 'marketName', layoutStyle: { width: '80px', flex: 1 }, component: ({value}) => <Text S textOverflow>{value}</Text> },
    { label: portfolioText.wallet.ct, value: 'ctAmount' },
    {
      label: portfolioText.wallet.volume, value: 'latelyChange', component: ({ value }) =>
        <Text S style={{ color: value >= 0 ? theme.green : theme.red }}>{toPercent(value)}</Text>
    },
    {
      label: '', value: 'action', layoutStyle: { width: '40px' }, component: ({ record }) =>
        <Link>
          {({ goto }) => <Button icon={Trade} primary light condensed onClick={() => {
            goto.trading({ id: record.id })
            setOpen(false)
          }} />}
        </Link>
    },
  ]
  return (
    <Col overflowAuto>
      <Token icon={ethIcon} label='ETH' amount={ethBalance} open={ethOpen} setOpen={setEthOpen} />
      <Token icon={smartupIcon} label='SmartUp' amount={sutBalance} open={sutOpen} setOpen={setSutOpen} />
      <Hr />
      <Panel
        expandedDark
        expanded={expandedWallet}
        onClick={toggleExpandedWallet}
        header={portfolioText.wallet.title}
        error={userMarketWallet.error}
        loading={userMarketWallet.getting}
        body={
          <>
            <Col BottomXS LeftS RightS>
              <Table S noBorderCol model={TableName} values={userMarketWallet.markets} recordKey='marketId' />
              <ScrollLoader isButton hasMore={userMarketWallet.hasNextPage} id='market-wallet' isLoading={userMarketWallet.getting} loadMore={getMarketWallet} />
            </Col>
            <Hr />
          </>
        }
      />
      <Panel
        expandedDark
        expanded={expandedMarket}
        onClick={toggleExpandedMarket}
        header={portfolioText.marketInfo.title}
        error={globalInfo.error}
        loading={globalInfo.getting}
        body={
          <>
            <Col>
              <InfoBlock first>
                <Text S spaceBottom>{portfolioText.marketInfo.totalSmartup}</Text>
                <Text L wordSpaceM bold>{toToken(sutAmount)}</Text>
              </InfoBlock>
              <InfoBlock>
                <Text S spaceBottom>{portfolioText.marketInfo.totalMarket}</Text>
                <Text L wordSpaceM bold>{marketCount}</Text>
              </InfoBlock>
              <InfoBlock>
                <Text S spaceBottom>{portfolioText.marketInfo.totalDiscussion}</Text>
                <Text L wordSpaceM bold>{latelyPostCount}</Text>
              </InfoBlock>
            </Col>
            <Hr />
          </>
        }
      />
      <Panel
        expandedDark
        expanded={expandedBookmark}
        onClick={toggleExpandedBookmark}
        header={portfolioText.bookmark.title}
        error={userSavedMarketPanel.error}
        loading={userSavedMarketPanel.getting}
        body={
          <Col>
            {
              userSavedMarketPanel.markets.map(({ name, marketId }, index) =>
                <BookmarkBlock spaceBetween centerVertical key={index}>
                  <Link>
                    {({ goto }) =>
                      <Text S onClick={() => {
                        goto.trading({ id: marketId })
                        setOpen(false)
                      }}>{name}</Text>
                    }
                  </Link>
                  <Close XS onClick={() => delSavedMarket({id: marketId})} />
                </BookmarkBlock>
              )
            }
            <ScrollLoader isButton hasMore={userSavedMarketPanel.hasLoadMore} id='bookmarked' isLoading={userSavedMarketPanel.getting} loadMore={getCollectedMarketsPanel} />
          </Col>
        }
      />
    </Col>
  )
}

const mapStateToProps = state => ({
  userMarketWallet: state.userMarketWallet,
  globalInfo: state.globalInfo,
  userSavedMarketPanel: state.userSavedMarketPanel,

  ethBalance: state.user.ethBalance,
  sutBalance: state.user.sutBalance,

  expandedWallet: state.panel.expandedWallet,
  expandedMarket: state.panel.expandedMarket,
  expandedBookmark: state.panel.expandedBookmark,
});

const mapDispatchToProps = {
  toggleExpandedBookmark, toggleExpandedMarket, toggleExpandedWallet,
  getGlobalMarket, 
  getCollectedMarketsPanel, getMarketWallet,
  delSavedMarket,
}

export default connect(mapStateToProps, mapDispatchToProps)(Portfolio);