import React from 'react'
import styled, { css } from 'styled-components'
import { Row, Col } from '../Layout'
import Text from '../Text'

const ORDER_BY = {
  asc: 'asc',
  desc: 'desc'
}

const Table = styled(Col)`
  background-color: ${p => p.theme.bgColor}
`

const TH = styled(Row)`
  cursor: pointer;
  color: ${p => p.theme.colorSecondary}
  padding-bottom: ${p => p.theme.spacingXS}
  padding-top: ${p => p.theme.spacingXS}
  background-color: ${p => p.theme.bgColor}
  ${p => p.highlight && css`color: ${p => p.theme.colorPrimary}`}
`

// model: Array { label, value }
// values: []
// orderBy: asc, desc, null => showing arrow only
// sortBy: <model.value> => highlight header
// onClickHeader: (<model.value>, index) => function
export default ({ model, values, sortBy, orderBy, onClickHeader }) => {
  return (
    <Table>
      <Row>
      {
        model.map( ({ value, label, layoutStyle }, index) => 
          <TH key={value} {...layoutStyle} highlight={value === sortBy} onClick={() => onClickHeader(value, index)}>
            <Text>{label}{value === sortBy ? orderBy === ORDER_BY.asc ? '↑' : orderBy === ORDER_BY.desc && '↓' : ''}</Text>
          </TH>
        )
      }
      </Row>
    </Table>
  )
}