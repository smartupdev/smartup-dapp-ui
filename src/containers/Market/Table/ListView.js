import React from 'react'

import MarketTable from './index'
import { Link } from '../../../routes'
import ScrollLoader from '../../../components/ScrollLoader'

export default function({ markets, hasMore, loadMore, isLoading }) {
  return (
    <>
      <Link>
        {({ goto }) =>
          <MarketTable markets={markets} onClick={({ record: { id } }) => goto.trading({ id })} noExpand />
        }
      </Link>
      <ScrollLoader isButton loadMore={loadMore} hasMore={hasMore} isLoading={isLoading} />
    </>
  )
}
