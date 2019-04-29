import React from 'react'
import { Row } from '../Layout'
import Button from '../Button'
import { DonutLoader } from '../Loader'
import { useAppear, useInfiniteScroll } from '../../lib/react'

// id is required if more than one ScrollLoader in a page
export default ({ id = 'id', hasNextPage, loadMore, isLoading }) => {
  const show = useAppear(id, loadMore, isLoading)
  // useInfiniteScroll(console.log)
  // console.log(show)
  return (
    <div id={id}>
      {
        hasNextPage ? <DonutLoader page /> : null
      }
    </div>

  )
};