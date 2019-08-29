import React from 'react'

import MarketTable from './index'
import Hr from 'components/Hr'
import { Link } from '../../../routes'

export default function({ markets, hasMore, loadMore, isLoading }) {
  return (
    <>
      <Link>
        {({ goto }) =>
          <MarketTable markets={markets} onClick={({ record: { id } }) => goto.trading({ id })} noExpand loadMore={loadMore} hasMore={hasMore} isLoading={isLoading} bottomLine />
        }
      </Link>
      { !markets.length && <Hr /> }
    </>
  )
}
