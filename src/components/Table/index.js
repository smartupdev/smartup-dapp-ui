import React, { memo } from 'react'
import styled, { css } from 'styled-components'
import { Row, Col } from '../Layout'
import Text from '../Text'
import Expand from '../Expand'
import FixComponent from '../FixComponent'

const emptyArr = []

const ORDER_BY = {
  asc: 'asc',
  desc: 'desc'
}

const Table = styled(Col)`
  overflow: auto;
  min-width: fit-content;
`

const TableWrapper = styled(Col)`
  overflow: auto;
  position: relative;
`

const TD = styled(Col)`
  ${p => p.header && css`color: ${p => p.theme.colorDark}`}
  padding-bottom: ${p => p.theme.spacingXS}
  padding-top: ${p => p.theme.spacingXS}
  ${p => p.highlight && css`color: ${p => p.theme.colorPrimary}`}
`

const TableTitle = styled(Row)`
  width: 100%;
  min-width: fit-content;
  border-bottom: 1px solid ${p => p.theme.borderColor}
  padding-left: ${p => p.inset ? p.theme.spacingXS : 0}
  padding-right: ${p => p.inset ? p.theme.spacingS : 0}
`

const TableRecordBox = styled(Col)`
  ${p => p.isExpanded && css`background-color: ${p.theme.bgColorDark}`}
  ${p => p.hasBorder && css`border-bottom: 1px solid ${p.theme.borderColor}`}
  padding-left: ${p => p.inset ? p.theme.spacingXS : 0}
  padding-right: ${p => p.inset ? p.theme.spacingS : 0}
`

const TableRecord = memo(
  ({ record, index, expandedRecords, noBorderCol, inset, model, S, onClick, ExpandComponent }) => {
    const isExpanded = expandedRecords.includes(record.id)
    return (
      <TableRecordBox isExpanded={isExpanded} hasBorder={!noBorderCol} inset={inset} fitWidth>
        <Row>
          {
            model.map(({ value: key, component: Component, layoutStyle = { flex: 1 } }, j) =>
              <TD key={j} {...layoutStyle} borderTop centerVertical onClick={onClick && (() => onClick({ record, key, index, isExpanded }))}>
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
          <Expand isOpen={isExpanded}>
            {ExpandComponent && <ExpandComponent record={record} />}
          </Expand>
        }
      </TableRecordBox>
    )
  }
)


// model: Array { label, value, layoutStyle, component<record, value, id> }
// values: Array { id }
// orderBy: asc, desc, null => showing arrow only
// sortBy: <model.value> => highlight header
// onClickHeader: (<model.value>, index) => function
// onClick: (<record>, index) => function
// expandedRecords: Array <id>
// S for small font size
// noBorderCol is for no border in column
export default ({ recordKey = 'id' , model, values, sortBy, orderBy, onClickHeader, onClick, expandedRecords = emptyArr, expandComponent: ExpandComponent, S, inset, noBorderCol, noResultText = '' }) => {
  return (
    <TableWrapper>
      <FixComponent>
        <TableTitle inset={inset}>
          {
            model.map(({ value, label, layoutStyle = { flex: 1 }, sortable }, index) =>
              <TD key={value} {...layoutStyle} header centerVertical highlight={value === sortBy} onClick={sortable && onClickHeader ? (() => onClickHeader(value, index)) : null}>
                <Text S={S}>{label}{value === sortBy ? orderBy === ORDER_BY.asc ? ' ↑' : orderBy === ORDER_BY.desc && ' ↓' : ''}</Text>
              </TD>
            )
          }
        </TableTitle>
      </FixComponent>
      <Table>
        {
          values && values[0] ? 
            values.map((record, index) => 
              <TableRecord
                key={record[recordKey]} 
                record={record} 
                index={index} 
                expandedRecords={expandedRecords} 
                noBorderCol={noBorderCol} 
                inset={inset} 
                model={model} 
                S={S} 
                onClick={onClick} 
                ExpandComponent={ExpandComponent} />
            )
          : 
            noResultText && <Text center note>{noResultText}</Text>
        }
      </Table>
    </TableWrapper>

  )
}