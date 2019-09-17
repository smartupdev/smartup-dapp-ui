import React, { useState } from 'react'
import Table from 'components/Table'
import Panel from 'components/Panel'
import Image from 'components/Image'
import Text from 'components/Text'
import Hr from 'components/Hr'
import Clock from 'components/Clock'
import Button from 'components/Button'
import { Col, Row } from 'components/Layout'
import { LabelText } from 'containers/Common'

import { connect } from 'react-redux'
import { useLang } from 'language'

import PageNotFoundImage from 'images/404.png'

/*
  ETH deposit: gas fee for 
    1. flag open result 
    2. dissolve marker
  Lock when flag is true
  X Juror cannot buy CT after got

  can edit content

  none: create(title, content, sut, eth - required amount), history
  collecting sut: title, content*, add(sut - required/remaining amount), discussion
  juror: title, content*, discussion, vote, discussion
  appeal: title, content*, appeal(title, content, sut, eth - required amount), vote result
  collecting sut: title, content*, add(sut - required/remaining amount), vote result
  juror: title, content*#, discussion, vote
  dissolve: title, content*#, dissolve(money)
  end: same as none

  * including creator, createTime, remaining time
  # pros + cons
  where is discussion
*/

const historyStyle = { center: true, flex: 1 }

function History() {
  const [open, setOpen] = useState(false)
  return (
    <Panel 
      expanded={open}
      onClick={() => setOpen(!open)}
      header='Flag History'
      body={
        <Table model={[
          { label: 'Time', value: 'createTime', layoutStyle: historyStyle },
          { label: 'Flag Creator', value: 'creator', layoutStyle: historyStyle },
          { label: 'Result', value: 'result', layoutStyle: historyStyle },
          { label: 'Outcome', value: 'outcome', layoutStyle: historyStyle }
        ]} values={[]} />
      }
    />
  )
}

const fakeProp = {
  // id: '114',
  flagStage: {
    status: 'collectDeposit', // collectDeposit || voting
    requiredSut: 2500,
    remainingSut: 1000,
    endTime: Date.now() + 500000, // can be deposit end time or voting end time
    yesVotes: 4, // only after voting
    noVotes: 3, // only after voting
    guilty: true, // or false
    supports: [  // list of people who deposited, 
      {
        title: '', // text, editable
        content: '', // rich content, editable
        createTime: '',
        creator: {
        　address: '', name: '', avatarIpfsHash: '', createTime: '', // same as api/user/current
        }
      }
    ]
  },
  appealStages: [{
    // same as flagStage, should be max. only two elements
  }],
  canVote: true,
  canAppeal: false,
}

function Flag({
  marketName,
  flag: { id } = fakeProp
}) {
  const [{ sutSymbol, ...lang }] = useLang()
  return (
    <Col flex={1} overflowAuto>
      {
        id ?
          <>
            <Text sectionTitle>You are accusing {marketName} as an improper idea</Text>
            <Hr />
            <Row HM VS>
              <Col flex={1}>
                <Text BottomS>PUT UP TO 4,467 {sutSymbol} TO PARTICIPATE THIS DISPUTE ACTION.</Text>
                <LabelText label='Total deposit required' text='10,000' sut={sutSymbol} />
                <Row>
                  <LabelText RightL label='Raised deposit' text='5.533' sut={sutSymbol} />
                  <LabelText RightL label='Remaining deposit' text='5.533' sut={sutSymbol} />
                  <LabelText RightL label='Number of joiners' text='103' />
                </Row>
              </Col>
              <Col>
                <Clock endDate={Date.now()} /> 
              </Col>
            </Row>
            <Hr />


            <Text sectionTitle>Discussion</Text>
            <Hr />
            <Text center VS note>Will release soon</Text>
          </>
        :
          <>
            <Row HM VS>
              <Col flex={1} RightXL>
                <Text XL BottomM>{`Flag this market - ${marketName}`}</Text>
                <Text newline>{`Did you think this is an improper market which Xxxxxxxxx. \nCreate a Flag to messages are used for personal, family, business and social purposes.`}</Text>
              </Col>
              <Col bottom>
                <Button primary label='Create a Flag' />
              </Col>
            </Row>
            <Hr />
            <Col center centerVertical HS flex={1}>
              <Image source={PageNotFoundImage} size={'300px'} />
              <Text center XL note VS bold>{lang.notFound.omg}</Text>
              <Text center note>{lang.notFound.notExist}</Text>
              <Text center note>{lang.notFound.tryAgain}</Text>
            </Col>
            <Hr />
            <History />
          </>
      }
    </Col>
  )  
}

const mapStateToProps = state => ({
  marketName: state.market.name
})
const mapDispatchToProps = {
  
}
export default connect(mapStateToProps, mapDispatchToProps)(Flag)