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
  ${p => p.minWidth && css`min-width: ${p.minWidth}`};
`

const TD = styled(Col)`
  ${p => p.header && css`color: ${p => p.theme.colorDark}`}
  padding-bottom: ${p => p.theme.spacingXS}
  padding-top: ${p => p.theme.spacingXS}
  ${p => p.highlight && css`color: ${p => p.theme.colorPrimary}`}
`

const TableTitle = styled(Row)`
  padding-left: ${p => p.inset ? p.theme.spacingXS : 0}
  padding-right: ${p => p.inset ? p.theme.spacingS : 0}
`
const TableRecord = styled(Col)`
  ${p => p.isExpanded && css`background-color: ${p.theme.bgColorDark}`}
  ${p => p.hasBorder && css`border-top: 1px solid ${p.theme.borderColor}`}
  padding-left: ${p => p.inset ? p.theme.spacingXS : 0}
  padding-right: ${p => p.inset ? p.theme.spacingS : 0}
`

const Expanded = styled(Col)`
  max-height: 0;
  transition: max-height 0.15s ease-out;
  overflow: hidden;
  ${p => p.isExpanded && css`
    max-height: 200px; 
    transition: max-height 0.25s ease-in;
  `} 
` // magic number

// model: Array { label, value, layoutStyle, component<record, value, id> }
// values: Array { id }
// orderBy: asc, desc, null => showing arrow only
// sortBy: <model.value> => highlight header
// onClickHeader: (<model.value>, index) => function
// onClick: (<recond>, index) => function
// expandedRecords: Array <id>
// S for small font size
// noBorderCol is for no border in column
export default ({ model, values, sortBy, orderBy, onClickHeader, onClick, expandedRecords = [], expandCompoent, minWidth, S, inset, noBorderCol }) => {
  return (
    <Table minWidth={minWidth}>
      <TableTitle inset={inset}>
      {
        model.map( ({ value, label, layoutStyle = { flex: 1 }, sortable }, index) => 
          <TD key={value} {...layoutStyle} header centerVertical highlight={value === sortBy} onClick={sortable && onClickHeader ? (() => onClickHeader(value, index)) : null}>
            <Text S={S}>{label}{value === sortBy ? orderBy === ORDER_BY.asc ? ' ↑' : orderBy === ORDER_BY.desc && ' ↓' : ''}</Text>
          </TD>
        )
      }
      </TableTitle>
      {
        values.map( (record, index) => {
          const isExpanded = expandedRecords.includes(record.id)
          return (
            <TableRecord key={record.id} isExpanded={isExpanded} hasBorder={!index || !noBorderCol} inset={inset}>
              <Row>
                {
                  model.map( ({ value: key, component: Component, layoutStyle = { flex: 1 } }, j) =>
                    <TD key={j} {...layoutStyle} borderTop centerVertical onClick={onClick && (() => onClick({record, key, index, isExpanded}))}>
                      {
                        Component ? 
                          <Component record={record} value={record[key]} index={index} isExpanded={isExpanded} />
                        :
                          <Text S={S}>{record[key]}</Text>
                      }
                    </TD>
                  )
                }
              </Row>
              {
                <Expanded isExpanded={isExpanded}>
                  {expandCompoent && expandCompoent({record})}
                </Expanded>
              }
            </TableRecord>
          )
        })
      }
    </Table>
  )
}