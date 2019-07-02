import React, { useEffect } from 'react'
import styled, { css } from 'styled-components'
import { Row } from '../Layout'
import { useLang } from '../../language'
import Button from '../Button'
import { DonutLoader } from '../Loader'
import { useScroll } from '../../lib/react'

const Box = styled(Row)`
  position: -webkit-sticky;
  position: sticky;
  left: 0;
  max-width: 100%;
`

// id is required if more than one ScrollLoader in a page
export default ({ target, hasMore, loadMore, isLoading, isButton }) => {
  const [lang] = useLang()
  const [ref, {top}, {bottom}] = useScroll(target)
  useEffect( () => {
    if(!isLoading && top && bottom && top < bottom) {
      loadMore(true)
    }  
  }, [isLoading, top, bottom])
  if(!hasMore) return null
  return (
    <Box center VS ref={ref}>
      { 
        isButton ? 
        <Button label={lang.loadMore} primary outline disabled={isLoading} onClick={loadMore} /> :
        <DonutLoader /> 
       }
    </Box>
  )
};