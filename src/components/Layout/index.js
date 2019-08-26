// import React from 'react'
import styled, { css } from 'styled-components'
import { media, generalCss } from '../Theme'
const Flex = styled.div`
  display: flex;
  ${p => p.wrap && css`flex-wrap: wrap`}
  box-sizing: border-box;
  ${p => p.directions && media(	
    `flex-direction: ${p.directions[0]};`,	
    `flex-direction: ${p.directions[1]};`	
  )}
  ${p => p.zIndex && css`z-index: ${p.zIndex}`}
  
  ${p => p.relative && css`position: relative;`}
  ${p => p.absolute && css`position: absolute;`}
  ${p => typeof p.absTop === 'string' && css`top: ${p.absTop};`}
  ${p => typeof p.absBottom === 'string' && css`bottom: ${p.absBottom};`}
  ${p => typeof p.absRight === 'string' && css`right: ${p.absRight};`}
  ${p => typeof p.absLeft === 'string' && css`left: ${p.absLeft};`}

  ${p => p.overflowHidden && css`overflow: hidden;`}
  ${p => p.overflowAuto && css`overflow: auto;`}
  
  ${p => p.round && css`border-radius: ${p.theme.borderRadius}`}

  ${props => 
    typeof props.flex === 'number' ? css`flex: ${props.flex}` :
    props.flex instanceof Array && media(`flex: ${props.flex[0]}`, `flex: ${props.flex[1]}`)
  };
  ${props => props.width && (
    props.width instanceof Array ?
    media(
      `width: ${props.width[0]}; min-width: ${props.width[0]}`, 
      `width: ${props.width[1]}; min-width: ${props.width[1]}`
    ) :
    css`width: ${props.width}; min-width: ${props.width}`
  )};
  ${props => props.height && css`height: ${props.height}; min-height: ${props.height}`};
  ${p => p.fitWidth && css`min-width: fit-content;`}
  ${p => p.fitHeight && css`height: fit-content; min-height: fit-content;`}
  ${props => props.fullWidth && css`width: 100%`};
  ${props => props.fullHeight && css`height: 100%`};
  ${props => props.maxWidth && css`max-width: ${props.maxWidth}`};
  ${props => props.maxHeight && css`max-height: ${props.maxHeight}`};

  ${generalCss}
`

const Row = styled(Flex)`
  ${props => props.left && css`justify-content: flex-start`};
  ${props => props.right && css`justify-content: flex-end`};
  ${props => props.center && css`justify-content: center`};
  ${props => props.centerVertical && css`align-items: center`};
  ${p => p.spaceBetween && css`justify-content: space-between`};
  ${p => p.spaceAround && css`justify-content: space-around`};
  ${props => props.top && css`align-items: flex-start`};
  ${props => props.bottom && css`align-items: flex-end`};
  `
  
const Col = styled(Flex)`
  flex-direction: column;
  ${props => props.left && css`align-items: flex-start`};
  ${props => props.right && css`align-items: flex-end`};
  ${props => props.center && css`align-items: center`};
  ${props => props.centerVertical && css`justify-content: center`};
  ${props => props.bottom && css`justify-content: flex-end`};
  ${p => p.spaceBetween && css`justify-content: space-between`};
  ${p => p.spaceAround && css`justify-content: space-around`};
  `

export {
  Row, Col, Flex
}