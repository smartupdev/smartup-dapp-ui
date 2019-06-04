import React from 'react'
import styled, { css } from 'styled-components'
import Image from '../Image'
import Text from '../Text'
import theme from '../../theme'
import { languageOptions, useLang } from '../../language'
import { Col } from '../Layout'

const Link = styled(Col)`
  width: ${p => p.theme.headerWidth};
  height: ${p => p.theme.headerWidth};
  position: relative;
  ${props => props.fixed && css`background: ${p => p.theme.white}`};
  ${props => props.selected && css`background: ${p => p.theme.bgColor}`};
  fill: ${p => p.theme.colorSecondary};
  stroke: ${p => p.theme.colorSecondary};
  :hover svg {
    fill: ${p => p.theme.colorPrimary};
    stroke: ${p => p.theme.colorPrimary};
  }
`

const LabelBox = styled(Col)`
  display: none;
  position: absolute;
  right: 0;
  width: 0;
  ${p => p.startFromBottom && css`bottom: 0`}
  ${Link}:hover & {
    display: block;
  };
  z-index: 99;
`

const Label = styled(Col)`
  height: ${p => p.theme.headerWidth};
  background-color: ${p => p.theme.bgColorDark}
  ${props => props.selected && css`background-color: ${p => p.theme.bgColor}`};
  ${props => props.width && css`width: ${p => p.width}`};
`

const Line = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 5px;
    background-color: ${p => p.theme.colorPrimary}
`

export function LanguageMenu() {
  const [_, lang, setLang] = useLang()
  return languageOptions.map( ({ label, value }) =>
    <LabelText key={value} label={label} onClick={() => setLang(value)} width='60px' primary={lang === value} />
  )
}

function onClickEmail() {
  window.location.href = "mailto:support@smartup.global?subject=See my feedback for SmartUp!"
}

function onClickGithub() {
  window.open('https://github.com/smartupdev/smartup-dapp-ui/issues', '_blank');
}

export function FeedbackMenu() {
  return (
    <>
      <LabelText label='Email' onClick={onClickEmail} width='60px' />
      <LabelText label='GitHub' onClick={onClickGithub} width='60px' />
    </>
  )
}

export function LabelText({ label, onClick, selected, width, primary }) {
  return (
    <Label HM fitWidth centerVertical selected={selected} onClick={onClick} width={width}>
      <Text nowrap primary={primary} center>{label}</Text>
    </Label>
  )
}

export default ({ icon: Icon, iconLabel, image, fixed, selected, component: Component, startFromBottom, ...rest }) => 
  <Link fixed={fixed} selected={selected} center centerVertical related {...rest}>
    { selected && <Line /> }
    { Icon && <Icon color={theme.colorSecondary} M /> }
    { image && <Image L source={image} /> }
    { (iconLabel || Component)  && 
      <LabelBox startFromBottom={startFromBottom}>
        {Component ? 
          <Component />
          :  
          <LabelText selected={selected} label={iconLabel} primary />
        }
      </LabelBox> 
    }
  </Link>
