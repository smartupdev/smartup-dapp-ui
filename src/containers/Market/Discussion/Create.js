import React, { useState } from 'react'
import { Row, Col } from '../../../components/Layout'
import Text from '../../../components/Text'
import TextInput from '../../../components/Input'
import DropToUpload from '../../../components/DropToUpload'
import Button from '../../../components/Button'
import { postIpfsImg } from '../../../actions/ipfs'

import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { addMarketPost } from '../../../actions/post'
import { useLang } from '../../../language'

function DiscussionCreate({ addApi, history }) {
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const [photo, setPhoto] = useState(null)
  const [photoError, setPhotoError] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  async function uploadPhoto(files, fileSizeError, fileTypeError) {
    setPhotoError(null)
    if(!files) return setPhoto(null)
    try {
      const hash = await postIpfsImg(files[0], fileSizeError, fileTypeError)
      setPhoto(hash)
    } 
    catch(error) {
      setPhotoError(error)
    }
  }
  async function add() {
    setLoading(true)
    const [e] = await addApi(title, text, photo)
    setLoading(false)
    if(e) return setError(e)
    history.goBack()
  }
  const [lang] = useLang()
  return (
    <Col spacingM>
      <Text BottomBase> {lang.discussion.create.title} </Text>
      <TextInput background disabled={loading} value={title} onChange={setTitle} />
      <Text TopS BottomBase> {lang.discussion.create.text} </Text>
      <TextInput background line={5} disabled={loading} value={text} onChange={setText} />
      <Text TopS BottomBase> {lang.discussion.create.photo} </Text>
      <DropToUpload actualSize disabled={loading} value={photo || null} error={photoError} onChoose={uploadPhoto} />
      <Row right TopXL>
        <Button primary HL label= {lang.discussion.create.submit} disabled={loading} onClick={add} />
        <Button HL label= {lang.discussion.create.cancel} disabled={loading} onClick={history.goBack} />
      </Row>
      {error && 
        <Row right TopS>
          <Text error S>{error.message}</Text>
        </Row>
      }
    </Col>
  ) 
}

const mapDispatchToProps = {
  addApi: addMarketPost
}

export default connect(null, mapDispatchToProps)(withRouter(DiscussionCreate));