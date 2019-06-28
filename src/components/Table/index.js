import React, { memo, useRef, useEffect } from 'react'
import styled, { css } from 'styled-components'
import { Row, Col } from '../Layout'
import Text from '../Text'
import Expand from '../Expand'
import FixComponent from '../FixComponent'
import ScrollLoader from '../ScrollLoader'
import { usePrevious } from '../../lib/react'

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
  min-height: fit-content;
`

const TableRecord = memo(
  ({ record, index, isExpanded , noBorderCol, inset, model, S, onClick, ExpandComponent }) => {
    // console.log(1)
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
export default ({ 
  recordKey = 'id' , 
  model, values, 
  sortBy, orderBy, 
  onClickHeader, onClick, 
  expandedRecords = emptyArr, expandComponent: ExpandComponent, 
  S, inset, noBorderCol, noResultText = '', 
  hasMore, loadMore, isLoading
}) => {
  const tableRef = useRef()
  const tableWrapRef = useRef()
  const prev0 = usePrevious(values[0])

  // const _expandedRecords = usePrevious(expandedRecords)
  // const _noBorderCol = usePrevious(noBorderCol)
  // const _inset = usePrevious(inset)
  // const _model = usePrevious(model)
  // const _S = usePrevious(S)
  // const _onClick = usePrevious(onClick)
  // const _ExpandComponent = usePrevious(ExpandComponent)

  // if(expandedRecords !== _expandedRecords) console.log('expandedRecords')
  // if(noBorderCol !== _noBorderCol) console.log('noBorderCol')
  // if(inset !== _inset) console.log('inset')
  // if(model !== _model) console.log('model')
  // if(S !== _S) console.log('S')
  // if(onClick !== _onClick) console.log('onClick')
  // if(ExpandComponent !== _ExpandComponent) console.log('ExpandComponent')

  useEffect( () => {
    if(values[0] !== prev0) {
      tableRef.current.scrollTo(0, 0)
      tableWrapRef.current.scrollTo(0, 0)
    }
  }, [sortBy, orderBy, values[0]])
  return (
    <TableWrapper ref={tableWrapRef}>
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
      <Table ref={tableRef}>
        {
          values && values[0] ? 
            values.map((record, index) =>
                <TableRecord
                  key={record[recordKey]} 
                  record={record} 
                  index={index} 
                  isExpanded={expandedRecords.includes(record.id)} 
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
          <ScrollLoader target={tableRef} hasMore={hasMore} loadMore={loadMore} isLoading={isLoading} />
      </Table>
    </TableWrapper>

  )
}