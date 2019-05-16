import React from 'react'
import { Row, Col } from '../../components/Layout'
import Text from '../../components/Text'
import Button from '../../components/Button'
import Input from '../../components/Input'
import Hr from '../../components/Hr'
import DropToUpload from '../../components/DropToUpload'


import { useLang } from '../../language'
import theme from '../../theme'

import { connect } from 'react-redux'
import { onChangeAvatar, updateUserAvatar, updateUserName, onChangeName, onChangeNameSubmit } from '../../actions/user';

const Setting = ({ realUserName, avatarUploading, avatarHash, updateUserAvatar,
  updateUserName, onChangeAvatar, updateNameError, updateAvatarError, onChangeName, nameHasChanged,submittingName, onChangeNameSubmit }) => {
    const [lang, langText, setLang] = useLang()
  return (
    <Col>
      <Text MarginLeftXS VXS>{'Avatar photo'}</Text>
      <DropToUpload MarginBottomXS MarginLeftXS MarginRightXS onChoose={onChangeAvatar} isLoading={avatarUploading} value={avatarHash} error={updateAvatarError} imageHeight='100px' imageWidth='100px' />
      <Row center MarginTopXS>
        <Button primary LeftM RightM label='Submit' onClick={updateUserAvatar} />
      </Row>
      <Text MarginLeftXS VXS>{'User Name'}</Text>
      <Input value={realUserName} placeholder='User Name' disabled={nameHasChanged} onChange={onChangeName} />
      <Text S right note error={updateNameError}>{
        typeof updateNameError === 'string' ? updateNameError :
          (!nameHasChanged ? 'Capital sensitive, 6-15 characters.' : 'Username is confirmed and locked.')
      } </Text>
      {
        !nameHasChanged && (!submittingName ?
          <Row center MarginTopXS>
            <Button primary LeftM RightM label='Submit' onClick={() => { onChangeNameSubmit(true) }} />
          </Row>
          :
          <Row center MarginTopXS>
            <Button primary LeftM RightM label='Confirm' onClick={updateUserName} />
            <Button MarginLeftXS LeftM RightM style={{ backgroundColor: '#8F9497' }} label='Cancel' onClick={() => { onChangeNameSubmit(false) }} />
          </Row>)
      }
      <Text LeftXS VXS>Language</Text>
      <Row spaceAround TopS>
      {
        [ 
          { label: 'English', value: 'en' },
          { label: '繁體中文', value: 'tc' },
          { label: '簡體中文', value: 'sc' },
        ].map(({ label, value }) =>
          <Col key={value}>
            <Text 
              key={value} 
              note={langText !== value}
              MarginHXS
              onClick={() => setLang(value)}
            >{label}</Text>
            { langText === value && <Hr primary /> }
          </Col>
        )
      }
      </Row>
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
  nameHasChanged: state.user.nameHasChanged,
});

const mapDispatchToProps = {
  onChangeAvatar, updateUserAvatar, updateUserName, onChangeName, onChangeNameSubmit
}

export default connect(mapStateToProps, mapDispatchToProps)(Setting);
