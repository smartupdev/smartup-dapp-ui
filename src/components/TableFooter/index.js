import React from 'react'
import { Row } from '../Layout'
import Button from '../Button'

export default ({ hasNextPage, loadMore }) => {
    return (
        <Row fullWidth center>
            <Button disabled={!hasNextPage} label='More' light onClick={loadMore} />
        </Row>
    )
};