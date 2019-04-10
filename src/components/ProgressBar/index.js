import React from 'react'
import styled, { css } from 'styled-components'
import Text from '../../components/Text'
import { Row, Col } from '../../components/Layout'
import theme from '../../theme'

const centerDotSize = '8px'
const dotSizeInactive = '18px'

const Box = styled(Col)`
`
const Line = styled.div`
  position: absolute;
  margin: auto;
  height: 3px;
  top: 0;
  bottom: 0;
  left: calc( 100% / ${p => p.numberOfRecord} / 2 );
  width: ${p => `calc( 100% / ${p.numberOfRecord} * ${typeof p.activeIndex === 'number' ? Math.min(p.activeIndex, p.numberOfRecord - 1) : p.numberOfRecord - 1} )`};
  background: ${p => p.activeIndex ? p.theme.colorPrimary : p.theme.bgColorLight};
  transition: width .3s ease;
`

const Item = styled(Col)`
  width: ${p => 100/(p.numberOfRecord-1)}%;
  height: 30px; // magic number
`
const Dot = styled.div`
  ${p => css`
    position: relative;
    width: ${p.activeIndex === p.index ? p.dotSize : dotSizeInactive};
    height: ${p.activeIndex === p.index ? p.dotSize : dotSizeInactive};
    transition: all .3s ease;
    background-color: ${p.activeIndex < p.index ? 'transparent' : p.color};
    border-radius: ${p.dotSize};
    // border: ${p.theme.white} solid 2px;
    &:after {
      position: absolute;
      left: calc( 50% - ${centerDotSize} / 2 );
      top: calc( 50% - ${centerDotSize} / 2 );
      content: ' ';
      height: ${centerDotSize};
      width: ${centerDotSize};
      border-radius: ${centerDotSize};
      background-color: ${p.activeIndex < p.index ? p.theme.bgColorLight : p.theme.white};
    }
  `}
`

export default ({ activeIndex, options, dotSize = '26px', color = theme.colorPrimary, onClick }) =>
  <Box spacingTopS spacingBottomS>
    <Row flex={1}>
      <Line numberOfRecord={options.length} /> 
      <Line activeIndex={activeIndex} numberOfRecord={options.length} />
      {
        options.map( (option, index) => 
          <Item numberOfRecord={options.length} key={index} center centerVertical  onClick={() => onClick(index)}>
            <Dot dotSize={dotSize} color={color} activeIndex={activeIndex} index={index} />
          </Item>
        )
      }
    </Row>
    <Row flex={1} spacingTopXS>
    {
        options.map( (option, index) => 
          <Item numberOfRecord={options.length} key={index} center>
            <Text S note={index > activeIndex}>{option}</Text>
          </Item>
        )
      }
    </Row>
  </Box>