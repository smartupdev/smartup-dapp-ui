import React from "react";
import styled, { css } from "styled-components";
import { media } from "../Theme";

import Image from "../Image";
import Text from "../Text";
import theme from "../../theme";
import { languageOptions, useLang } from "../../language";
import { Col } from "../Layout";

const StyledImage = styled(Image)`
  ${p => media(p.expanded && "width: auto")}
`;

const Link = styled(Col)`
  width: ${p => p.theme.headerWidth};
  height: ${p => p.theme.headerWidth};
  position: relative;
  ${props => props.fixed && media("display: none", `background: ${props.theme.white}`)};
  ${props =>
    props.expanded &&
    media(`width: ${props.theme.headerExpandedWidth}`, "display: none")};
  fill: ${p => p.theme.colorSecondary};
  stroke: ${p => p.theme.colorSecondary};
  ${p => !p.Component && css`
    :hover div {
      color: ${p => p.theme.colorPrimary};
    }
    :hover svg {
      fill: ${p => p.theme.colorPrimary};
      stroke: ${p => p.theme.colorPrimary};
    }
  `}
`;

const LabelBox = styled(Col)`
  position: absolute;
  right: 1px;
  width: 0;
  ${p => media(`display: block;`, "display: none")}
  ${p =>
    p.startFromBottom &&
    css`
      bottom: 0;
    `}
  ${Link}:hover & {
    display: block;
  };
  z-index: 99;
`;

const Label = styled(Col)`
  height: ${p => p.theme.headerWidth};
  ${p => media(null, `background-color: ${p.selected ? p.theme.bgColorDark : p.theme.bgColor}`)}
  ${p =>
    p.width &&
    css`
      width: ${p => p.width};
    `};
`;

const Line = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 5px;
  background-color: ${p => p.theme.colorPrimary};
`;

const FooterBox = styled(Col)`
  ${p => media(`flex-direction: row; min-width: ${p.theme.headerExpandedWidth.slice(0, -2) - p.theme.headerWidth.slice(0, -2) - 10}px;`)}
`

export function LanguageMenu() {
  const [, lang, setLang] = useLang();
  return (
    <FooterBox>
      {languageOptions.map(({ label, labelShort, value }) => (
        <LabelText
          key={value}
          label={labelShort}
          onClick={() => setLang(value)}
          width="60px"
          center
          primary={lang === value}
        />
      ))}
    </FooterBox>
  );
}

function onClickEmail() {
  window.location.href =
    "mailto:support@smartup.global?subject=See my feedback for SmartUp!";
}

function onClickGithub() {
  window.open("https://github.com/smartupdev/smartup-dapp-ui/issues", "_blank");
}

export function FeedbackMenu() {
  return (
    <FooterBox>
      <LabelText label="Email" onClick={onClickEmail} width={["50%", "60px"]} center />
      <LabelText label="GitHub" onClick={onClickGithub} width={["50%", "60px"]} center />
    </FooterBox>
  );
}

export function LabelText({ label, onClick, selected, width, primary, center }) {
  return (
    <Label
      HM
      fitWidth
      centerVertical
      center={center}
      selected={selected}
      onClick={onClick}
      width={width}
      left
    >
      <Text nowrap primary={primary} note={!primary} center>
        {label}
      </Text>
    </Label>
  );
}

export default ({
  icon: Icon,
  iconLabel,
  image,
  fixed,
  expanded,
  selected,
  component: Component,
  startFromBottom,
  ...rest
}) => (
  <Link
    fixed={fixed}
    expanded={expanded}
    selected={selected}
    center
    centerVertical
    related
    Component={Component}
    {...rest}
  >
    {selected && <Line />}
    {Icon && <Icon color={theme.colorSecondary} M />}
    {image && <StyledImage expanded={expanded} L source={image} />}
    {(iconLabel || Component) && (
      <LabelBox startFromBottom={startFromBottom}>
        {Component ? (
          <Component />
        ) : (
          <LabelText selected={selected} label={iconLabel} />
        )}
      </LabelBox>
    )}
  </Link>
);
