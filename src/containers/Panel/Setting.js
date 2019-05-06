import React from 'react'
import { Row, Col } from '../../components/Layout'
import Text from '../../components/Text'
import Button from '../../components/Button'
import Input from '../../components/Input'
import DropToUpload from '../../components/DropToUpload'

import { connect } from 'react-redux'
import { onChangeAvatar, updateUserAvatar, updateUserName, onChangeName, onChangeNameSubmit } from '../../actions/user';

const Setting = ({ realUserName, avatarUploading, avatarHash, updateUserAvatar,
  updateUserName, onChangeAvatar, updateNameError, updateAvatarError, onChangeName, submittingName, onChangeNameSubmit }) => {
  return (
    <Col>
      <Text MarginLeftXS S VXS>{'Avatar photo'}</Text>
      <DropToUpload MarginBottomXS MarginLeftXS MarginRightXS onChoose={onChangeAvatar} isLoading={avatarUploading} value={avatarHash} imageHeight='100px' imageWidth='100px' />
      {updateAvatarError && <Text right error={true}>{updateAvatarError}</Text>}
      <Row center MarginTopXS>
        <Button primary LeftM RightM label='Submit' onClick={updateUserAvatar} />
        {/* <Button MarginLeftXS LeftM RightM style={{backgroundColor:'#8F9497'}}  label='Cancel' onClick={() => { }} /> */}
      </Row>
      <Text MarginLeftXS S VXS>{'User Name'}</Text>
      <Input value={realUserName} placeholder='User Name' onChange={onChangeName} />
      <Text right error={updateNameError}>{
        typeof updateNameError === 'string' ? updateNameError :
          'Capital sensitive, 6-15 characters.'
      } </Text>
      {!submittingName ?
        <Row center MarginTopXS>
          <Button primary LeftM RightM label='Submit' onClick={()=>{onChangeNameSubmit(true)}}/>
        </Row>
        :
        <Row center MarginTopXS>
        <Button primary LeftM RightM label='Confirm' onClick={updateUserName} />
        <Button MarginLeftXS LeftM RightM style={{backgroundColor:'#8F9497'}}  label='Cancel' onClick={() => {onChangeNameSubmit(false)}} />
      </Row>
      }
    </Col>
  )
}

const mapStateToProps = state => ({
  avatarUploading: state.user.avatarUploading,
  avatarHash: state.user.avatarHash,
  realUserName: state.user.realUserName,
  updateAvatarError: state.user.updateAvatarError,
  updateNameError: state.user.updateNameError,
  submittingName: state.user.submittingName,
});

const mapDispatchToProps = {
  onChangeAvatar, updateUserAvatar, updateUserName, onChangeName, onChangeNameSubmit
}

export default connect(mapStateToProps, mapDispatchToProps)(Setting);
