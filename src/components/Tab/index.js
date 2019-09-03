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
  // background-color: ${p => p.theme.bgColorLight};
  color: ${p => p.theme.colorSecondary};
  ${p => p.width && css`width: ${p.width}`};
  ${p => p.type === TYPE.border && css`
    border-right: solid 1px ${p => p.theme.borderColor};
    border-left: 0px;
    ${props => props.first && css`border-left: 1px`}
    ${props => props.end && props.flex && css`border-right: 0`}
    ${props => props.active && css`background-color: ${p => p.theme.bgColorDark}`}
  `}
  ${p => p.type === TYPE.simple && css`
    ${p => p.active && css`color: ${p => p.theme.colorPrimary}; border-bottom: solid ${p => p.theme.colorPrimary}`}
  `}
`
const Dot = styled.div`
  position: absolute;
  right: 5px; 
  top: 5px;
  width: ${p => p.theme.greenDot};
  height: ${p => p.theme.greenDot};
  background-color: #7FC88E;
  border-radius: ${p => p.theme.greenDot};
`
// tabs: [ { <label: string>, <dot: bool>, <value: any> } ]
// type: border || simple
export default ({ activeIndex, activeValue = -999, tabs, fullWidth, onClick, width, type = TYPE.border, ...rest }) =>
  <>
  {type === TYPE.border  && <Hr />}
  <Row {...rest}>
    {tabs.map( ({ label, value, dot }, index) =>
      <Tab relative key={index} first={!index} end={tabs.length === index + 1 ? 'true' : undefined} center active={activeIndex === index || activeValue === value} type={type} width={width} flex={fullWidth && 1} onClick={() => onClick(index, value)}>
        <Text S>{label}</Text>
        { dot && <Dot /> }
      </Tab>
    )}
  </Row>
  {type === TYPE.border && <Hr />}
  </>