import React from 'react'
import { Row, Col } from '../../components/Layout'
import theme from '../../theme'
import { Comment, Trade, People, Bookmarked } from '../../components/Icon'
import Text from '../../components/Text'
import lang, { currentLang } from '../../lang'
import Button from '../../components/Button'
import Image from '../../components/Image'
import {withRouter} from 'react-router-dom'

const TableExpand = ({ record, history }) => 
  <Row spacingBottom={theme.spacingS} spacingTop={theme.spacingS}>
    <Col spacingLeft={theme.spacingXS} spacingRight={theme.spacingL}>
      <Image source={record.image} photo />
    </Col>
    <Col spaceBetween flex={1}>
      <Row spaceBetween> 
        <Col>
          <Text XL wordSpaceL>{record.name}</Text>
          <Text note>{record.overview}</Text>
        </Col>
        <Bookmarked S onClick={() => console.log(record.id)} checked={record.following} /> 
      </Row>
      <Row centerVertical spaceBetween>
        <Row>
          <Button label={record.numberOfComments} icon={Comment} />
          <Button label={record.numberOfSub} icon={People} />
        </Row>
        <Button primary label={lang.trade[currentLang]} icon={Trade} onClick={()=>history.push(`/market?id=${record.id}`)} />
      </Row>
    </Col>
  </Row>
export default withRouter(TableExpand)