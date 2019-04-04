import styled, { css } from 'styled-components'

export default styled.div`
  min-width: 1px;
  min-height: 1px;
  ${p => p.vertical ? css`width: auto` : css`width: 100%`}
  ${p => p.inset && css`
    margin-left: ${p.theme.spacingM}; 
    margin-right: ${p.theme.spacingM};
    width: calc( 100% - ${p.theme.spacingM} * 2 );
  `}
  background-color: ${p => p.theme.borderColor}
`
