import React from 'react'
import { Row, Col } from '../../components/Layout'
import Text from '../../components/Text'
import Button from '../../components/Button'
import Input from '../../components/Input'
import DropToUpload from '../../components/DropToUpload'

import { connect } from 'react-redux'
import {onChangeAvatar,updateUserInfo, onChangeName} from '../../actions/user';

const Setting = ({realUserName,avatarUploading,avatarUrl,error,onChangeAvatar,updateUserInfo,onChangeName}) => {
  return (
    <Col>
      <Text MarginLeftXS S VXS>{'Avatar photo'}</Text>
      <DropToUpload MarginBottomXS MarginLeftXS MarginRightXS onChoose={onChangeAvatar} isLoading={avatarUploading} value={avatarUrl} imageHeight='100px' imageWidth='100px' />
      { error.avatar && <Text  right error={true}>{error.avatar}</Text> }
      <Row center MarginTopXS>
        <Button primary LeftM RightM label='Submit' onClick={updateUserInfo} />
        {/* <Button MarginLeftXS LeftM RightM style={{backgroundColor:'#8F9497'}}  label='Cancel' onClick={() => { }} /> */}
      </Row>
      <Text MarginLeftXS S VXS>{'User Name'}</Text>
      <Input value={realUserName} disabled={!!realUserName} placeholder='User Name' onChange={onChangeName} />
      { error.avatar && <Text  right error={true}>{error.avatar}</Text> }
      <Row center MarginTopXS>
        <Button primary LeftM RightM disabled={!!realUserName} label='Submit' onClick={updateUserInfo} />
        {/* <Button MarginLeftXS LeftM RightM style={{backgroundColor:'#8F9497'}}  label='Cancel' onClick={() => { }} /> */}
      </Row>
    </Col>
  )
}

const mapStateToProps = state => ({
  avatarUploading: state.user.avatarUploading,
  avatarUrl: state.user.avatarUrl,
  error:state.user.error,
  realUserName: state.user.realUserName
});

const mapDispatchToProps = { 
  onChangeAvatar,updateUserInfo,onChangeName
}

export default connect(mapStateToProps, mapDispatchToProps)(Setting);
