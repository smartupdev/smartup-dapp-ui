import React, { useState, useEffect } from 'react'
import { Row, Col } from '../../components/Layout'
import Text from '../../components/Text'
import Button from '../../components/Button'
import Input, { Label } from '../../components/Input'
import Hr from '../../components/Hr'
import DropToUpload from '../../components/DropToUpload'

import { useLang, languageOptions } from '../../language'

import { connect } from 'react-redux'
import { updateUser } from '../../actions/user'
import { shorten } from '../../lib/util'

const Setting = ({
  name, address, avatarHash, userInfoUpdating, userInfoError,
  updateUser,
 }) => {
  const [lang, langText, setLang] = useLang()
  const [_avatarHash, _setAvatarHash] = useState(avatarHash)
  const [_name, _setName] = useState(name)
  function onChangeName(v) {  _setName(v) }
  const nameError = _name && (_name.length > 15 || _name.length < 6)
  function reset() {
    _setAvatarHash(avatarHash)
    _setName(name)
  }
  useEffect( () => {
    reset()
  }, [name, avatarHash])
  const didEdit = _avatarHash !== avatarHash || _name !== name
  return (
    <Col HS flex={1}>
      <Input background placeholder={shorten(address)}
        value={_name}  onChange={onChangeName} disabled={userInfoUpdating || name} 
        error={nameError && lang.panel.setting.nameReq}
        label={lang.panel.setting.userName} description={name ? lang.panel.setting.nameLock : lang.panel.setting.nameReq} />
      <Label>{lang.panel.setting.avatar}</Label>
      <DropToUpload MarginHXS onChoose={_setAvatarHash} value={_avatarHash} disabled={userInfoUpdating} imageHeight='100px' imageWidth='100px' />
      <Row center VS>
        <Button primary HM label={lang.panel.setting.submit} onClick={() => updateUser(!name && _name, _avatarHash)} disabled={userInfoUpdating || !didEdit} />
        { didEdit &&
          <Button MarginLeftXS HM label={lang.panel.setting.cancel} onClick={reset} disabled={userInfoUpdating} />
        }
      </Row>
      { userInfoError && <Text error S right>{userInfoError.message}</Text> }
      <Col TopXL>
        <Hr />
        <Label> { lang.panel.setting.languages } </Label>
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
    </Col>
  )
}

const mapStateToProps = state => ({
  address: state.user.address,
  name: state.user.name,
  avatarHash: state.user.avatarHash,
  userInfoUpdating: state.user.userInfoUpdating,
  userInfoError: state.user.userInfoError,
});

const mapDispatchToProps = {
  updateUser
}

export default connect(mapStateToProps, mapDispatchToProps)(Setting);
