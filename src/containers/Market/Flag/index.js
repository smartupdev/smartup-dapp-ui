import React, { useState } from 'react'
import Table from 'components/Table'
import Panel from 'components/Panel'
import Image from 'components/Image'
import Text from 'components/Text'
import Hr from 'components/Hr'
import Clock from 'components/Clock'
import Button from 'components/Button'
import { Col, Row } from 'components/Layout'
import { LabelText, DateAgoText, TokenText, AvatarTable } from 'containers/Common'

import { connect } from 'react-redux'
import { useLang } from 'language'
import theme from 'theme'
import { withLink } from 'routes'
import { toToken, toFullDate, getSimpleText } from 'lib/util'
import { marketDeposit } from 'config'

import Supporter from './Supporter'
import Discussion from './Discussion'
import History from './History'
import Flag from './Flag'

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

const fakeProp = {
  id: '114',
  // createTime: Date.now(),
  // creator: 'Peter Chan',
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
        title: 'I am a Title', // text, editable
        content: 'XXX', // rich content, editable
        amount: 2200,
        createTime: Date.now(),
        userAvatar: '', // not in BE
        username: 'CM', // not in BE
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

function Index({
  marketName,
  flag: { id, flagStage } = fakeProp,
  goto
}) {
  const [{ sutSymbol, ...lang }] = useLang()
  return (
    <Col flex={1} overflowAuto>
      {
        id ?
          <>
            <Text sectionTitle>Prosecution: {flagStage.supports[0].title}</Text>
            <Hr />
            <Flag flagStage={flagStage} />
            <Hr />
            <Supporter values={flagStage.supports} />
            <Discussion />
            <History />
          </>
        :
          <>
            <Row HM VS>
              <Col flex={1} RightXL>
                <Text XL BottomM>{`Flag this market - ${marketName}`}</Text>
                <Text newline>{`Did you think this is an improper market which Xxxxxxxxx. \nCreate a Flag to messages are used for personal, family, business and social purposes.`}</Text>
              </Col>
              <Col bottom>
                <Button primary label='Create a Flag' onClick={() => goto.flagCreate()} />
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
export default connect(mapStateToProps, mapDispatchToProps)(withLink(Index))