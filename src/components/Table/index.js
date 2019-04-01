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
  padding-left: ${p => p.theme.spacingXS}
  padding-right: ${p => p.theme.spacingS}
`
const TableRecord = styled(Col)`
  ${p => p.isExpanded && css`background-color: ${p => p.theme.bgColorDark}`}
  border-top: 1px solid ${p => p.theme.borderColor}
  padding-left: ${p => p.theme.spacingXS}
  padding-right: ${p => p.theme.spacingS}
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

export default ({ model, values, sortBy, orderBy, onClickHeader, onClick, expandedRecords = [], expandCompoent, minWidth, S }) => {
  return (
    <Table minWidth={minWidth}>
      <TableTitle>
      {
        model.map( ({ value, label, layoutStyle = { flex: 1 } }, index) => 
          <TD key={value} {...layoutStyle} header centerVertical highlight={value === sortBy} onClick={onClickHeader && (() => onClickHeader(value, index))}>
            <Text S={S}>{label}{value === sortBy ? orderBy === ORDER_BY.asc ? ' ↑' : orderBy === ORDER_BY.desc && ' ↓' : ''}</Text>
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
      <Hr />
    </Table>
  )
}