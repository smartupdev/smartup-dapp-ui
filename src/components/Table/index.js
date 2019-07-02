import React, { memo, useRef, useEffect } from 'react'
import styled, { css } from 'styled-components'
import { Row, Col } from '../Layout'
import Text from '../Text'
import Expand from '../Expand'
import ScrollLoader from '../ScrollLoader'
import { usePrevious } from '../../lib/react'
import theme from '../../theme'

const emptyArr = []

const ORDER_BY = {
  asc: 'asc',
  desc: 'desc'
}

const Table = styled(Col)`
  min-height: fit-content;
  min-width: fit-content;
`

const TableWrapper = styled(Col)`
  overflow: auto;
  position: relative;
  -webkit-overflow-scrolling: touch;
`

const TD = styled(Col)`
  ${p => p.header && css`color: ${p => p.theme.colorDark}`}
  ${p => p.isExpanded && css`background-color: ${p.theme.bgColorDark}`}
  padding-bottom: ${p => p.theme.spacingXS}
  padding-top: ${p => p.theme.spacingXS}
  ${p => p.highlight && css`color: ${p => p.theme.colorPrimary}`}
  ${p => p.fixed && css`
    position: sticky;
    left: 0;  
    z-index: 1;
  `}
`

const TableTitle = styled(Row)`
  ${p => p.fixedHeader && css`
    position: sticky;
    top: 0;
  `}
  width: 100%;
  z-index: 2;
  min-width: fit-content;
  border-bottom: 1px solid ${p => p.theme.borderColor}
  min-height: fit-content;
  // padding-left: ${p => p.inset ? p.theme.spacingXS : 0}
  // padding-right: ${p => p.inset ? p.theme.spacingS : 0}
`

const TableRecordBox = styled(Col)`
  ${p => p.isExpanded && css`background-color: ${p.theme.bgColorDark}`}
  ${p => p.hasBorder && css`border-bottom: 1px solid ${p.theme.borderColor}`}
  // padding-left: ${p => p.inset ? p.theme.spacingXS : 0}
  // padding-right: ${p => p.inset ? p.theme.spacingS : 0}
  min-height: fit-content;
`

const TableRecord = memo(
  ({ record, index, isExpanded , noBorderCol, model, S, onClick, ExpandComponent, backgroundColor, fixedCol }) => {
    return (
      <TableRecordBox isExpanded={isExpanded} hasBorder={!noBorderCol} fitWidth>
        <Row>
          {
            model.map(({ value: key, component: Component, layoutStyle = { flex: 1 } }, j) =>
              <TD key={j} fixed={j < fixedCol} backgroundColor={!j && backgroundColor} isExpanded={isExpanded} {...layoutStyle} borderTop centerVertical onClick={onClick && (() => onClick({ record, key, index, isExpanded }))}>
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


// model: Array { label<String, function>, value, layoutStyle, component<record, value, id> }
// values: Array { id }
// orderBy: asc, desc, null => showing arrow only
// sortBy: <model.value> => highlight header
// onClickHeader: (<model.value>, index) => function
// onClick: (<record>, index) => function
// expandedRecords: Array <id>
// S for small font size
// noBorderCol is for no border in column
export default ({ 
  backgroundColor = theme.bgColor,
  fixedHeader, fixedCol,
  recordKey = 'id' , 
  model, values, language,
  sortBy, orderBy, 
  onClickHeader, onClick, 
  expandedRecords = emptyArr, expandComponent: ExpandComponent, 
  S, noBorderCol, noResultText = '', 
  hasMore, loadMore, isLoading
}) => {
  const tableRef = useRef()
  const tableWrapRef = useRef()
  const prev0 = usePrevious(values[0])

  useEffect( () => {
    if(values[0] !== prev0) {
      tableRef.current.scrollTo(0, 0)
      tableWrapRef.current.scrollTo(0, 0)
    }
  }, [sortBy, orderBy, values[0]])
  return (
    <TableWrapper ref={tableWrapRef}>
      <Table ref={tableRef}>
        <TableTitle backgroundColor={fixedHeader && backgroundColor} fixedHeader={fixedHeader}>
          {
            model.map(({ value, label, layoutStyle = { flex: 1 }, sortable }, index) =>
              <TD key={value} fixed={index < fixedCol} backgroundColor={!index && backgroundColor} {...layoutStyle} header centerVertical highlight={value === sortBy} onClick={sortable && onClickHeader ? (() => onClickHeader(value, index)) : null}>
                <Text S={S}>{label instanceof Function ? label(language) : label}{value === sortBy ? orderBy === ORDER_BY.asc ? ' ↑' : orderBy === ORDER_BY.desc && ' ↓' : ''}</Text>
              </TD>
            )
          }
        </TableTitle>
        {
          values && values[0] ? 
            values.map((record, index) =>
                <TableRecord
                  fixedCol={fixedCol}
                  backgroundColor={fixedCol && backgroundColor}
                  key={record[recordKey]} 
                  record={record} 
                  index={index} 
                  isExpanded={expandedRecords.includes(record.id)} 
                  noBorderCol={noBorderCol} 
                  model={model} 
                  S={S} 
                  onClick={onClick} 
                  ExpandComponent={ExpandComponent} />
              )
          : 
            noResultText && <Text center note>{noResultText}</Text>
          }
      </Table>
      <ScrollLoader target={tableWrapRef} hasMore={hasMore} loadMore={loadMore} isLoading={isLoading} />
    </TableWrapper>

  )
}