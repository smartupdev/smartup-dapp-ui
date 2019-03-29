import React from 'react'
import styled, { css } from 'styled-components'
import { Row, Col } from '../Layout'
import Text from '../Text'
import Hr from '../Hr'

const ORDER_BY = {
  asc: 'asc',
  desc: 'desc'
}

const Table = styled(Col)`
  background-color: ${p => p.theme.bgColor}
`

const TD = styled(Col)`
  ${p => p.header && css`color: ${p => p.theme.colorDark}`}
  ${p => p.onClick && css`cursor: pointer`}
  padding-bottom: ${p => p.theme.spacingXS}
  padding-top: ${p => p.theme.spacingXS}
  ${p => p.highlight && css`color: ${p => p.theme.colorPrimary}`}
`

const TableTitle = styled(Row)`
  padding-left: ${p => p.theme.spacingXS}
  padding-right: ${p => p.theme.spacingS}
`
const TableRecord = styled(Col)`
  ${p => p.isExpanded && css`background-color: ${p => p.theme.bgColorDark}`}
  border-top: 1px solid ${p => p.theme.borderColor}
  padding-left: ${p => p.theme.spacingXS}
  padding-right: ${p => p.theme.spacingS}
`

// model: Array { label, value, layoutStyle, component<record, value, id> }
// values: Array { id }
// orderBy: asc, desc, null => showing arrow only
// sortBy: <model.value> => highlight header
// onClickHeader: (<model.value>, index) => function
// onClick: (<recond>, index) => function
// expandedRecords: Array <id>

export default ({ model, values, sortBy, orderBy, onClickHeader, onClick, expandedRecords, expandCompoent }) => {
  return (
    <Table>
      <TableTitle>
      {
        model.map( ({ value, label, layoutStyle }, index) => 
          <TD key={value} {...layoutStyle} header centerVertical highlight={value === sortBy} onClick={() => onClickHeader(value, index)}>
            <Text>{label}{value === sortBy ? orderBy === ORDER_BY.asc ? ' ↑' : orderBy === ORDER_BY.desc && ' ↓' : ''}</Text>
          </TD>
        )
      }
      </TableTitle>
      {
        values.map( (record, index) => {
          const isExpanded = expandedRecords.includes(record.id)
          return (
            <TableRecord key={record.id} isExpanded={isExpanded}>
              <Row>
                {
                  model.map( ({ value: key, component: Component = Text, layoutStyle }, j) =>
                    <TD key={j} {...layoutStyle} borderTop centerVertical onClick={() => onClick(record, key, index)}>
                      <Component record={record} value={record[key]} index={index} isExpanded={isExpanded} />
                    </TD>
                  )
                }
              </Row>
              {
                isExpanded && expandCompoent({record})
              }
            </TableRecord>
          )
        })
      }
      <Hr />
    </Table>
  )
}