import React, { useEffect, useRef, useState } from 'react'
import styled, { css } from 'styled-components'
import { postIpfsImg } from '../../actions/ipfs'
import { noHandle } from '../../lib/util'

const StyleHiddenFile = styled.input`
  display: none;
`
export default function({ onChoose, children, disabled, onError, uploadApi = postIpfsImg }) {
  const inputRef = useRef(null)
  const openFinder =  () => inputRef.current.click()

  // file upload action
  const [error, setError] = useState()
  const [uploading, setUploading] = useState(false)
  async function uploadPhoto(files) {
    if(!files) return onChoose(null)
    try {
      setUploading(true)
      const hash = await uploadApi(files[0])
      setUploading(false)
      setError()
      onChoose(hash)
    } 
    catch(error) {
      setUploading(false)
      onError && onError(error)
      setError(error)
    }
  }

  const _disabled = disabled || uploading

  // drag and drop
  const dragRef = useRef(null)
  let dragCounter = 0
  const [dragging, setDragging] = useState(false)
  function handleDragIn(e) {
    noHandle(e)
    dragCounter++
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0 && !_disabled) {
      setDragging(true)
    }
  }
  function handleDragOut(e) {
    noHandle(e)
    dragCounter--
    if (dragCounter > 0) return
    setDragging(false)
  }
  function handleDrop(e) {
    noHandle(e)
    setDragging(false)
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0 && !_disabled) {
      uploadPhoto(e.dataTransfer.files)
      e.dataTransfer.clearData()
      dragCounter = 0
    }
  }
  useEffect(() => {
    const target = dragRef.current
    if(target) {
      target.addEventListener('dragenter', handleDragIn)
      target.addEventListener('dragleave', handleDragOut)
      target.addEventListener('dragover', noHandle)
      target.addEventListener('drop', handleDrop)
      return () => {
        target.removeEventListener('dragenter', handleDragIn)
        target.removeEventListener('dragleave', handleDragOut)
        target.removeEventListener('dragover', noHandle)
        target.removeEventListener('drop', handleDrop)
      }
    }
  }, [_disabled])

  return (
    <>
      <StyleHiddenFile 
        accept="image/x-png,image/gif,image/jpeg,image/png" 
        type='file' name="browse" 
        ref={inputRef} 
        value={''} 
        onChange={e => uploadPhoto(e.target.files)}
      />
      {children({openFinder, error, uploading, dragRef, dragging})}
    </>
  )
}