import React from 'react'
import { Row, Col } from '../../components/Layout'
import Text from '../../components/Text'
import Button from '../../components/Button'
import Input from '../../components/Input'
import Hr from '../../components/Hr'
import DropToUpload from '../../components/DropToUpload'


import { useLang, languageOptions } from '../../language'

import { connect } from 'react-redux'
import { onChangeAvatar, updateUserAvatar, updateUserName, onChangeName, onChangeNameSubmit } from '../../actions/user';

const Setting = ({ realUserName, avatarUploading, avatarHash, updateUserAvatar,
  updateUserName, onChangeAvatar, updateNameError, updateAvatarError, onChangeName, nameHasChanged,submittingName, onChangeNameSubmit }) => {
    const [lang, langText, setLang] = useLang()
  return (
    <Col>
      <Text MarginLeftXS VXS>{lang.panel.setting.avatar}</Text>
      <DropToUpload MarginBottomXS MarginLeftXS MarginRightXS onChoose={onChangeAvatar} isLoading={avatarUploading} value={avatarHash} error={updateAvatarError} imageHeight='100px' imageWidth='100px' />
      <Row center MarginTopXS>
        <Button primary LeftM RightM label={lang.panel.setting.submit} onClick={updateUserAvatar} />
      </Row>
      <Text MarginLeftXS VXS>{lang.panel.setting.userName}</Text>
      <Input value={realUserName} background disabled={nameHasChanged} onChange={onChangeName} />
      <Text S right note error={updateNameError}>{
        typeof updateNameError === 'string' ? updateNameError :
          (!nameHasChanged ? lang.panel.setting.nameReq : lang.panel.setting.nameLock )
      } </Text>
      {
        !nameHasChanged && (!submittingName ?
          <Row center MarginTopXS>
            <Button primary LeftM RightM label= { lang.panel.setting.submit } onClick={() => { onChangeNameSubmit(true) }} />
          </Row>
          :
          <Row center MarginTopXS>
            <Button primary LeftM RightM label={ lang.panel.setting.confirm } onClick={updateUserName} />
            <Button MarginLeftXS LeftM RightM style={{ backgroundColor: '#8F9497' }} label={ lang.panel.setting.cancel } onClick={() => { onChangeNameSubmit(false) }} />
          </Row>)
      }
      <Text LeftXS VXS> { lang.panel.setting.languages } </Text>
      <Row spaceAround TopS>
      {
        languageOptions.map(({ label, value }) =>
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
