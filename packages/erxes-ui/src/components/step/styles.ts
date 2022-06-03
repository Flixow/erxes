import { colors, dimensions } from '../../styles';
import styled from 'styled-components';
import styledTS from 'styled-components-ts';

const StepContainer = styledTS<{ direction?: string }>(styled.div)`
  display: flex;
  flex: 1;
  flex-direction: ${props => (props.direction ? 'column' : 'row')};
  align-items: ${props => props.direction === 'horizontal' && 'center'};
  position: relative;
  height: 100%;
  overflow: auto;
  box-shadow: ${props =>
    !props.direction && `0 0 4px ${colors.colorShadowGray}`};
  margin: ${props =>
    props.direction === 'vertical' && `0 ${dimensions.coreSpacing}px`};

  > *:nth-child(n + 2) {
    margin-left: ${props => !props.direction && '5px'};
  }
`;

const StepWrapper = styled.div`
  margin: ${dimensions.unitSpacing}px;
  height: 100%;
  height: calc(100% - ${dimensions.unitSpacing * 2}px);
  display: flex;
  flex-direction: column;
  flex: 1;
  position: relative;
`;

const StepItem = styledTS<{
  show: boolean;
  active?: boolean;
  direction?: string;
}>(styled.div)`
  transition: all .3s ease;
  width: ${props => (props.show ? '100%' : '60px')};
  width: ${props => props.direction === 'vertical' && '100%'};
  box-shadow: ${props =>
    !props.direction && `0 0 4px ${colors.colorShadowGray}`};
  position: relative;
  z-index: 5;

  &:before {
    position: absolute;
    border-right: ${props =>
      props.direction === 'vertical' && `2px solid ${colors.bgActive}`};
    width: ${props => props.direction === 'horizontal' && '100%'};
    height: ${props => props.direction === 'vertical' && '100%'};
    top: 30px;
    left: -50%;
    z-index: 2;
  }
  &:after {
    position: absolute;
    content: "";
    border-bottom: ${props =>
      props.direction === 'horizontal' &&
      `2px solid ${
        props.active === true ? colors.colorPrimary : colors.bgActive
      }`};
    border-right: ${props =>
      props.direction === 'vertical' &&
      `2px solid ${
        props.active === true ? colors.colorCoreGreen : colors.bgActive
      }`};
    
    height: ${props => props.direction === 'vertical' && '100%'};
    top: ${props => (props.direction === 'horizontal' ? '-30px' : '30px')};
    left: ${props => (props.direction === 'horizontal' ? '-50%' : '11px')};
    z-index: 2;
  }
  &:first-child::before {
    content: none;
  }
  &:last-child::after {
    content: none;
  }
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${dimensions.unitSpacing / 2}px;
  padding: ${dimensions.unitSpacing}px ${dimensions.coreSpacing}px;
  background: ${colors.bgLight};
  box-shadow: 0 0 4px ${colors.colorShadowGray};
  justify-content: space-between;
  > *:nth-child(n + 2) {
    margin-left: ${dimensions.unitSpacing}px;
  }
`;

const ControlWrapper = styled(TitleContainer)`
  margin-bottom: 0;
  margin-top: ${dimensions.unitSpacing / 2}px;
`;

const Indicator = styled.div`
  color: ${colors.colorCoreGray};
  font-size: 15px;
  font-style: italic;
  max-width: 70%;
  strong {
    color: ${colors.textPrimary};
  }
`;

const FullStep = styledTS<{ show: boolean; direction?: string }>(styled.div)`
  justify-content: ${props => props.direction && 'flex-start'};
  background: ${colors.colorWhite};
  height: 100%;
  width: ${props => !props.direction && '100%'};
  transition: all 0.3s ease;
  display: ${props => (props.show ? 'flex' : 'none')};
  flex-direction: column;
  flex: ${props => props.direction && '1'};
`;

const StepHeaderContainer = styled.div`
  width: 100%;
  min-height: 55px;
  padding: 0 ${dimensions.coreSpacing}px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: colors.bgLight;
  border-bottom: 1px solid ${colors.borderPrimary};
`;

const StepHeaderHorizontalContainer = styled.div`
  width: 100%;
  height: 80px;
  padding: 0 ${dimensions.coreSpacing}px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StepHeader = styled.div`
  display: flex;
  align-items: center;
`;

const StepImg = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 35px;
  width: 35px;
  > img {
    max-width: 100%;
    max-height: 100%;
  }
`;

const StepHeaderTitle = styled.h5`
  margin: 0 0 0 ${dimensions.unitSpacing}px;
`;

const StepContent = styledTS<{ direction?: string }>(styled.div)`
  width: ${props =>
    props.direction === 'vertical' ? 'calc(100% - 35px)' : '100%'};
  height: 100%;
  margin-left: ${props => props.direction && 'auto'};
  overflow: hidden;
`;

const ShortStep = styledTS<{
  show: boolean;
  active?: boolean;
  direction?: string;
}>(styled.div)`
  position: relative;
  width: ${props =>
    props.direction === 'vertical'
      ? '100%'
      : props.direction === 'horizontal'
      ? '200px'
      : '60px'};
  height: 100%;
  background: ${props => !props.direction && colors.bgLight};
  border: ${props => !props.direction && `1px solid ${colors.bgLight}`};
  cursor: pointer;
  display: ${props => (props.show ? 'flex' : 'none')};
  align-items: center;
  padding: ${dimensions.unitSpacing}px 0;
  flex-direction: ${props =>
    props.direction === 'vertical' ? 'row' : 'column'};
  transition: all 0.3s ease;
  
  img {
    filter: grayscale(100%);
    opacity: 0.7;
    transition: all 0.3s ease;
  }
  &:hover {
    border-color: ${colors.colorCoreTeal};
    img {
      filter: grayscale(0);
      opacity: 1;
    }
  }

  &:before {
    position: absolute;
    border-bottom: ${props =>
      props.direction === 'horizontal' && `2px solid ${colors.bgActive}`};
    width: ${props => props.direction === 'horizontal' && '100%'};
    top: 55px;
    left: -50%;
    z-index: 2;
  }

  &:after {
    position: absolute;
    content: "";
    border-bottom: ${props =>
      props.direction === 'horizontal' &&
      `2px solid ${
        props.active === true ? colors.colorPrimary : colors.bgActive
      }`};
    width: ${props => props.direction === 'horizontal' && '100%'};
    top: ${props => props.direction === 'horizontal' && '25px'};
    left: ${props => props.direction === 'horizontal' && '50%'};
    z-index: 2;
  }

  &.completed {
    background-color: ${colors.colorPrimary};
    &:after {
      position: absolute;
      content: "";
      border-bottom: ${props =>
        props.direction === 'horizontal' && `2px solid ${colors.colorPrimary}`};
      width: ${props => props.direction === 'horizontal' && '100%'};
      top: 20px;
      left: 50%;
      z-index: 3;
    }
  }

  &:first-child::before {
    content: none;
  }

  &:last-child::after {
    content: none;
  }
`;

const StepCount = styledTS<{ active?: boolean; direction?: string }>(
  styled.div
)`
  position: relative;
  z-index: 5;
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${props => (props.direction === 'horizontal' ? '35px' : '25px')};
  height: ${props => (props.direction === 'horizontal' ? '35px' : '25px')};;
  border-radius: 50%;
  color: ${props =>
    props.active === true ? colors.colorWhite : colors.colorCoreBlack};
  background-color: ${props =>
    props.active === true
      ? `${
          props.direction === 'horizontal'
            ? colors.colorPrimary
            : colors.colorCoreGreen
        }`
      : colors.bgActive};
  margin-bottom: 10px;
`;

const InlineForm = styled.div`
  display: flex;
  flex-direction: row;
  > *:not(:first-child) {
    margin-left: ${dimensions.unitSpacing}px;
  }
`;

const FlexItem = styledTS<{
  count?: string;
  overflow?: string;
  v?: string;
  h?: string;
  direction?: string;
}>(styled.div)`
  display: flex;
  height: 100%;
  border-right: 1px solid ${colors.borderPrimary};
  flex: ${props => (props.count ? props.count : 1)};
  ${props => {
    if (props.overflow) {
      return `
        overflow: ${props.overflow};
      `;
    }
    return null;
  }};
  ${props => {
    if (props.v) {
      return `
        align-items: ${props.v};
      `;
    }
    return null;
  }};
  ${props => {
    if (props.h) {
      return `
        justify-content: ${props.h};
      `;
    }
    return null;
  }};
  ${props => {
    if (props.direction) {
      return `
        flex-direction: ${props.direction};
      `;
    }
    return null;
  }};
  &:last-of-type {
    border: none;
  }
`;

const FlexPad = styled(FlexItem)`
  padding: ${dimensions.coreSpacing}px;
  flex: 1;
  border-right: ${colors.borderPrimary};
  padding: ${dimensions.coreSpacing}px;
`;

const LeftItem = styledTS<{ deactive?: boolean }>(styled.div)`
  overflow: auto;
  flex: 1;
  min-width: 43.33333%;
  padding: ${dimensions.coreSpacing + 5}px;
  opacity: ${props => props.deactive && '0.3'};
  cursor: ${props => props.deactive && 'not-allowed'};
  input:disabled {
    cursor: not-allowed;
  }
`;

const Preview = styledTS<{ fullHeight?: boolean }>(styled.div)`
  flex: 1;
  border-left: 1px solid ${colors.borderPrimary};
  background: url('/images/previews/preview.png');
  background-repeat: repeat;
  background-position: center 20px;
  background-size: cover;
  height: ${props => props.fullHeight && '100%'};
  overflow: hidden;
`;

const StyledButton = styledTS<{ next?: boolean }>(styled.button)`
  border: 1px solid ${colors.colorPrimary};
  border-radius: 8px;
  height:40px;
  width: 110px;
  padding: 10px 40px;
  font-weight: 500;
  margin-right: 10px;
  color: ${props =>
    props.next === true ? colors.colorWhite : colors.colorPrimary};
  background: ${props =>
    props.next === true ? colors.colorPrimary : colors.colorWhite};
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 ${dimensions.coreSpacing}px;
`;

const ButtonBack = styledTS<{ next?: boolean }>(styled.button)`
  border: none;
  border-radius: 8px;
  height: 36px;
  width: 110px;
  font-weight: 500;
  margin-left: 10px;
  color: ${props =>
    props.next === true ? colors.colorWhite : colors.colorPrimary};
  background: ${props =>
    props.next === true ? colors.colorPrimary : colors.colorWhite};

  &:hover {
    cursor: pointer;
  }
`;

export {
  StepContainer,
  StepItem,
  FullStep,
  StepHeaderContainer,
  StepHeaderHorizontalContainer,
  StepHeader,
  StepImg,
  StepHeaderTitle,
  StepContent,
  ShortStep,
  StepCount,
  StepWrapper,
  TitleContainer,
  Indicator,
  ControlWrapper,
  InlineForm,
  FlexItem,
  FlexPad,
  LeftItem,
  Preview,
  StyledButton,
  ButtonContainer,
  ButtonBack
};
