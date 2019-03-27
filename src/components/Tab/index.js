import React from 'react'
import styled, { css } from 'styled-components'
import theme from '../../theme'
import { Row, Col } from '../Layout'
import Text from '../Text'
import Hr from '../Hr'

const Tab = styled(Row)`
  background-color: ${theme.bgColorLight};
  padding-top: ${theme.spacingXS};
  padding-bottom: ${theme.spacingXS};
  min-width: ${theme.tabWidth};
  border-right: solid 1px ${theme.borderColor};
  border-left: 0px;
  cursor: pointer;
  ${props => props.first && css`border-left: 1px`}
  ${props => props.activeTab && css`background-color: ${theme.bgColorDark}`}
`

// tabs: [ { <label: string>, <value>, <dot: bool> } ]
export default ({ activeTab, tabs, onClick, fullWidth }) =>
  <>
  <Hr />
  <Row>
    {tabs.map( ({ label, value }, index) =>
      <Tab key={value} first={!index} center activeTab={activeTab === value} flex={fullWidth && 1} onClick={() => onClick(value, index)}>
        <Text S>{label}</Text>
      </Tab>
    )}
  </Row>
  <Hr />
  </>