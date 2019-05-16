import React from 'react'
import { Row } from '../Layout'
import { useLang } from '../../language'
import Button from '../Button'
// import { DonutLoader } from '../Loader'
// import { useAppear } from '../../lib/react'

// id is required if more than one ScrollLoader in a page
export default ({ id = 'id', hasMore, loadMore, isLoading, isButton }) => {
  const [lang] = useLang()
  // const [appear, setDisapper, updateAppear] = useAppear(id, 'main') 
  // const [_isLoading, setIsLoading] = useState(isLoading)
  // if(!isLoading && _isLoading) updateAppear()
  // if(isLoading !== _isLoading) setIsLoading(isLoading) 
  // console.log({appear, isLoading, hasMore})
  // if(appear && !isLoading && hasMore) {
  //   console.log(`Get more ${id}`)
  //   setDisapper()
  //   loadMore()
  // }
  return (
    <Row id={id} center VS>
      {
        hasMore ? 
          <Button label={lang.loadMore} primary outline disabled={isLoading} onClick={loadMore} />
          // <DonutLoader page /> 
        : null
      }
    </Row>

  )
};