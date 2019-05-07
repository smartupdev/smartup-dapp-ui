import React, { useState } from 'react'
import Text from '../../components/Text'
import { Col } from '../../components/Layout'
// import ScrollLoader from '../../components/ScrollLoader'

// import {delay} from '../../lib/util/fetch';

// const data = [
//   1, 2, 3, 4, 5, 6,
//   1, 2, 3, 4, 5, 6,
//   1, 2, 3, 4, 5, 6,
//   1, 2, 3, 4, 5, 6,
//   1, 2, 3, 4, 5, 6,
//   1, 2, 3, 4, 5, 6,
//   1, 2, 3, 4, 5, 6,
//   1, 2, 3, 4, 5, 6,
//   1, 2, 3, 4, 5, 6,
//   1, 2, 3, 4, 5, 6,
//   1, 2, 3, 4, 5, 6,
// ]

export default () => {
  // const [array, setArray] = useState(data)
  // const [loading, setLoading] = useState(false)
  // const [hasNextPage, setHasNextPage] = useState(true)
  // const id = 'TestId'
  // async function loadMore() {
  //   setLoading(true)
  //   await delay(2000)
  //   if(array.length > 50) setHasNextPage(false)
  //   setArray([...array, ...data])
  //   setLoading(false)
  // }
  return (
    <Col>
      <Text center VM note>This page is currently under development. Please check back again later.</Text>
      {/* {array.map((a, i) => <Text key={i}>{a}</Text>)}
      <ScrollLoader id={id} loadMore={loadMore} hasNextPage={hasNextPage} isLoading={loading} /> */}
    </Col>
  )
}