import React from 'react'
import styled, { css } from 'styled-components'
import { Row } from '../Layout'
import Text from '../Text'
import Hr from '../Hr'

const TYPE = {
  border: 'border',
  simple: 'simple'
}

const Tab = styled(Row)`
  padding: ${p => p.theme.spacingXS};
  cursor: pointer;
  border-top: 1px;
  border-bottom: 1px;
  color: ${p => p.theme.colorSecondary};
  ${p => p.type === TYPE.border && css`
    border-right: solid 1px ${p => p.theme.borderColor};
    border-left: 0px;
    flex: 1;
    ${props => props.first && css`border-left: 1px`}
    ${props => props.activeTab && css`background-color: ${p => p.theme.bgColorDark}`}
  `}
  ${p => p.type === TYPE.simple && css`
    ${p => p.activeTab && css`color: ${p => p.theme.colorPrimary}; border-bottom: solid ${p => p.theme.colorPrimary}`}
  `}
`
// tabs: [ { <label: string>, <value>, <dot: bool> } ]
// type: border || simple
export default ({ activeTab, tabs, fullWidth, onClick, type = TYPE.border }) =>
  <>
  {type === TYPE.border  && <Hr />}
  <Row>
    {tabs.map( ({ label, value }, index) =>
      <Tab key={value} first={!index} center activeTab={activeTab === value} type={type} flex={fullWidth && 1} onClick={() => onClick(value, index)}>
        <Text S>{label}</Text>
      </Tab>
    )}
  </Row>
  {type === TYPE.border && <Hr />}
  </>