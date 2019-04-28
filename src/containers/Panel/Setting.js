import React from 'react'
import { Row, Col } from '../../components/Layout'
import Text from '../../components/Text'
import Button from '../../components/Button'
import DropToUpload from '../../components/DropToUpload'

import { connect } from 'react-redux'
import {onChangeAvatar,updateUserInfo} from '../../actions/user';

const Setting = ({avatarUploading,avatarUrl,error,onChangeAvatar,updateUserInfo}) => {
  return (
    <Col>
      <Text MarginLeftXS S VXS>{'Avatar photo'}</Text>
      <DropToUpload MarginBottomXS MarginLeftXS MarginRightXS onChoose={onChangeAvatar} isLoading={avatarUploading} value={avatarUrl} imageHeight='100px' imageWidth='100px' />
      { error.avatar && <Text  right error={true}>{error.avatar}</Text> }
      <Row center MarginTopXS>
        <Button primary LeftM RightM label='Submit' onClick={updateUserInfo} />
        <Button MarginLeftXS LeftM RightM style={{backgroundColor:'#8F9497'}}  label='Cancel' onClick={() => { }} />
      </Row>
      <Text MarginLeftXS S VXS>{'User Name'}</Text>
      {/* <Input value={content} placeholder='User Name' onChange={onChangeName} /> */}
    </Col>
  )
}

const mapStateToProps = state => ({
  avatarUploading: state.user.avatarUploading,
  avatarUrl: state.user.avatarUrl,
  error:state.user.error
});

const mapDispatchToProps = { 
  onChangeAvatar,updateUserInfo
}

export default connect(mapStateToProps, mapDispatchToProps)(Setting);
