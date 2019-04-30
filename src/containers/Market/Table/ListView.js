import React from 'react'

import MarketTable from './index'
import { Link } from '../../../routes'

export default function({ markets }) {
  return (
    <Link>
      {({ goto }) =>
        <MarketTable markets={markets} onClick={({ record: { id } }) => goto.trading({ id })} noExpand />
      }
    </Link>
  )
}
