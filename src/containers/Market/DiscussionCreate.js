import React, { useState } from 'react'
import { Row, Col } from '../../components/Layout'
import Text from '../../components/Text'
import TextInput from '../../components/Input'
import DropToUpload from '../../components/DropToUpload'
import Button from '../../components/Button'
import { postIpfsImg, ipfsHost } from '../../actions/ipfs'

import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { addMarketPost } from '../../actions/post'

function DiscussionCreate({ addApi, history }) {
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const [photo, setPhoto] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  async function uploadPhoto(files) {
    if(!files) return setPhoto(null)
    const hash = await postIpfsImg(files[0])
    setPhoto(hash)
  }
  async function add() {
    setLoading(true)
    const [e] = await addApi(title, text, photo)
    setLoading(false)
    if(e) return setError(e)
    history.goBack()
  }
  return (
    <Col spacingM>
      <Text BottomBase>Title</Text>
      <TextInput background disabled={loading} value={title} onChange={setTitle} />
      <Text TopS BottomBase>Text</Text>
      <TextInput background line={5} disabled={loading} value={text} onChange={setText} />
      <Text TopS BottomBase>Photo</Text>
      <DropToUpload disabled={loading} value={photo ? ipfsHost + photo : null} onChoose={uploadPhoto} />
      <Row right TopXL>
        <Button primary HL label='Submit' disabled={loading} onClick={add} />
        <Button HL label='Cancel' disabled={loading} onClick={history.goBack} />
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