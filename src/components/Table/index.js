import React from 'react'
import styled, { css } from 'styled-components'
import { Row, Col } from '../Layout'
import Text from '../Text'

const Table = styled(Col)`
  background-color: ${p => p.theme.bgColor}
`

const TH = styled(Row)`
  background-color: ${p => p.theme.bgColor}

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
          <TH key={value} {...layoutStyle} onClick={() => onClickHeader(value, index)}>
            <Text>{label}</Text>
          </TH>
        )
      }
      </Row>
    </Table>
  )
}