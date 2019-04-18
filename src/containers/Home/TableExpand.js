import React from 'react'
import { Link } from '../../routes'
import { Row, Col } from '../../components/Layout'
import theme from '../../theme'
import { Comment, Trade, People, Bookmarked } from '../../components/Icon'
import Text from '../../components/Text'
import lang, { currentLang } from '../../lang'
import Button from '../../components/Button'
import Image from '../../components/Image'
import { connect } from 'react-redux'
import { bookMarkClick } from '../../actions/home'

const TableExpand = ({ record, history, bookMarkClick }) => {
  return (
  <Row BottomS TopS>
    <Col LeftXS RightL>
      <Image source={record.image} photo />
    </Col>
    <Col spaceBetween flex={1}>
      <Row spaceBetween> 
        <Col>
          <Text XL wordSpaceL>{record.name}</Text>
          <Text note>{record.overview}</Text>
        </Col>
        <Bookmarked S onClick={() => bookMarkClick(record)} checked={record.following} /> 
      </Row>
      <Row centerVertical spaceBetween>
        <Row>
          <Button label={record.numberOfComments} icon={Comment} />
          <Button label={record.numberOfSub} icon={People} />
        </Row>
        <Link>
          { ({goto}) =>
          <Button primary label={lang.trade[currentLang]} icon={Trade} onClick={()=>goto.trading({id: record.id})} />
           }
        </Link>
      </Row>
    </Col>
  </Row>
  )
}

const mapDispatchToProps = {
  bookMarkClick,
}

export default connect(null, mapDispatchToProps)(TableExpand);