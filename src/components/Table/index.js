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

const TD = styled(Row)`
  cursor: pointer;
  color: ${p => p.theme.colorSecondary}
  padding-bottom: ${p => p.theme.spacingXS}
  padding-top: ${p => p.theme.spacingXS}
  background-color: ${p => p.theme.bgColor}
  ${p => p.highlight && css`color: ${p => p.theme.colorPrimary}`}
  ${p => p.borderTop && css`border-top: 1px solid ${p => p.theme.borderColor}`}
`

// model: Array { label, value, layoutStyle, component<record, value, id> }
// values: Array { id }
// orderBy: asc, desc, null => showing arrow only
// sortBy: <model.value> => highlight header
// onClickHeader: (<model.value>, index) => function
export default ({ model, values, sortBy, orderBy, onClickHeader }) => {
  return (
    <Table>
      <Row>
      {
        model.map( ({ value, label, layoutStyle }, index) => 
          <TD key={value} {...layoutStyle} centerVertical highlight={value === sortBy} onClick={() => onClickHeader(value, index)}>
            <Text>{label}{value === sortBy ? orderBy === ORDER_BY.asc ? ' ↑' : orderBy === ORDER_BY.desc && ' ↓' : ''}</Text>
          </TD>
        )
      }
      </Row>
      {
        values.map( (record, index) => 
          <Row key={record.id}>
            {
              model.map( ({ value: key, component: Component = Text, layoutStyle }, j) =>
                <TD key={j} {...layoutStyle} borderTop centerVertical>
                  <Component record={record} value={record[key]} index={index} />
                </TD>
              )
            }
          </Row>
        )
      }
    </Table>
  )
}