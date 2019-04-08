// import React from 'react'
import styled, { css } from 'styled-components'

const Flex = styled.div`
  display: flex;
  position: relative;
  
  ${p => p.color && css`background-color: ${p.color}`}
  ${p => p.onClick && css`cursor: pointer`}

  ${props => typeof props.flex === 'number' && css`flex: ${props.flex}`};
  ${props => props.width && css`width: ${props.width}; min-width: ${props.width}`};
  ${props => props.height && css`height: ${props.height}; min-height: ${props.height}`};
  ${props => props.fullHeight && css`height: 100%`};

  ${props => props.spacingLeft && css`padding-left: ${props.spacingLeft}`};
  ${props => props.spacingRight && css`padding-right: ${props.spacingRight}`};
  ${props => props.spacingBottom && css`padding-bottom: ${props.spacingBottom}`};
  ${props => props.spacingTop && css`padding-top: ${props.spacingTop}`};
  
  ${p => p.spacingLeftXS && css`padding-left: ${p.theme.spacingXS}`};
  ${p => p.spacingRightXS && css`padding-right: ${p.theme.spacingXS}`};
  ${p => p.spacingBottomXS && css`padding-bottom: ${p.theme.spacingXS}`};
  ${p => p.spacingTopXS && css`padding-top: ${p.theme.spacingXS}`};

  ${p => p.spacingLeftS && css`padding-left: ${p.theme.spacingS}`};
  ${p => p.spacingRightS && css`padding-right: ${p.theme.spacingS}`};
  ${p => p.spacingBottomS && css`padding-bottom: ${p.theme.spacingS}`};
  ${p => p.spacingTopS && css`padding-top: ${p.theme.spacingS}`};

  ${p => p.spacingLeftM && css`padding-left: ${p.theme.spacingM}`};
  ${p => p.spacingRightM && css`padding-right: ${p.theme.spacingM}`};
  ${p => p.spacingBottomM && css`padding-bottom: ${p.theme.spacingM}`};
  ${p => p.spacingTopM && css`padding-top: ${p.theme.spacingM}`};

  ${p => p.spacingLeftL && css`padding-left: ${p.theme.spacingL}`};
  ${p => p.spacingRightL && css`padding-right: ${p.theme.spacingL}`};
  ${p => p.spacingBottomL && css`padding-bottom: ${p.theme.spacingL}`};
  ${p => p.spacingTopL && css`padding-top: ${p.theme.spacingL}`};

  ${p => p.spacingLeftXL && css`padding-left: ${p.theme.spacingXL}`};
  ${p => p.spacingRightXL && css`padding-right: ${p.theme.spacingXL}`};
  ${p => p.spacingBottomXL && css`padding-bottom: ${p.theme.spacingXL}`};
  ${p => p.spacingTopXL && css`padding-top: ${p.theme.spacingXL}`};
`

const Row = styled(Flex)`
  ${props => props.center && css`justify-content: center`};
  ${props => props.centerVertical && css`align-items: center`};
  ${p => p.spaceBetween && css`justify-content: space-between`};
  ${p => p.spaceAround && css`justify-content: space-around`};
  ${props => props.bottom && css`align-items: flex-end`};
  `
  
  const Col = styled(Flex)`
  flex-direction: column;
  ${props => props.right && css`align-items: flex-end`};
  ${props => props.center && css`align-items: center`};
  ${props => props.centerVertical && css`justify-content: center`};
  ${props => props.bottom && css`justify-content: flex-end`};
  ${p => p.spaceBetween && css`justify-content: space-between`};
  `

export {
  Row, Col, Flex
}