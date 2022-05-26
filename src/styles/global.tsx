import styled from 'styled-components';
import { darken } from 'polished';

// import 'react-perfect-scrollbar/dist/css/styles.css';
// import 'react-toastify/dist/ReactToastify.css';

interface SeparationLineProps {
  margintop?: string;
  marginright?: string;
  marginbottom?: string;
  marginleft?: string;
  backgroundcolor?: string;
  width?: string;
}

interface TitleProps {
  margintop?: string;
  marginright?: string;
  marginbottom?: string;
  marginleft?: string;
  paddingtop?: string;
  paddingright?: string;
  paddingbottom?: string;
  paddingleft?: string;
  align?: string;
  fontsize?: string;
  fontweight?: string;
  texttransform?: string;
  colorhover?: string;
}

interface ParagraphProps {
  margintop?: string;
  marginright?: string;
  marginbottom?: string;
  marginleft?: string;
  paddingtop?: string;
  paddingright?: string;
  paddingbottom?: string;
  paddingleft?: string;
  align?: string;
  fontsize?: string;
  fontweight?: string;
  texttransform?: string;
  colorhover?: string;
  lineheight?: string;
}

interface ButtonsProps {
  margintop?: string;
  marginbottom?: string;
  align?: string;
  width?: string;
}

interface ButtonProps {
  background?: string;
  color?: string;
  fontweight?: string;
  fontsize?: string;
  texttransform?: string;
  border?: string;
  borderradius?: string;
  margintop?: string;
  marginright?: string;
  marginbottom?: string;
  marginleft?: string;
  paddingtop?: string;
  paddingright?: string;
  paddingbottom?: string;
  paddingleft?: string;
  width?: string;
  minheight?: string;
  display?: string;
  align?: string;
  background1?: string;
  background2?: string;
  bordertopleftradius?: string;
  bordertoprightradius?: string;
  borderbottomleftradius?: string;
  borderbottomrightradius?: string;
  backgroundactive?: string;
  coloractive?: string;
}

interface UlForms {
  invisible?: boolean;
}

export const SeparationLine = styled.hr<SeparationLineProps>`
  margin-top: ${props => (props.margintop ? props.margintop : '20')}px;
  margin-right: ${props => (props.marginright ? props.marginright : '0')}px;
  margin-bottom: ${props => (props.marginbottom ? props.marginbottom : '20')}px;
  margin-left: ${props => (props.marginleft ? props.marginleft : '0')}px;
  background-color: ${props =>
    props.backgroundcolor ? props.backgroundcolor : '#eee'};
  width: ${props => (props.width ? props.width : '100%')};
`;

export const TitleH1 = styled.h1<TitleProps>`
  margin-top: ${props => (props.margintop ? props.margintop : '0')}px;
  margin-right: ${props => (props.marginright ? props.marginright : '0')}px;
  margin-bottom: ${props => (props.marginbottom ? props.marginbottom : '30')}px;
  margin-left: ${props => (props.marginleft ? props.marginleft : '0')}px;
  padding-top: ${props => (props.paddingtop ? props.paddingtop : '0')}px;
  padding-right: ${props => (props.paddingright ? props.paddingright : '0')}px;
  padding-bottom: ${props =>
    props.paddingbottom ? props.paddingbottom : '0'}px;
  padding-left: ${props => (props.paddingleft ? props.paddingleft : '0')}px;
  color: ${props => (props.color ? props.color : '#3d3d3d')};
  text-align: ${props => (props.align ? props.align : 'left')};
  font-size: ${props => (props.fontsize ? props.fontsize : '3.64rem')};
  font-weight: ${props => (props.fontweight ? props.fontweight : '700')};
  text-transform: ${props =>
    props.texttransform ? props.texttransform : 'uppercase'};
  letter-spacing: 1px;

  hr {
    margin: 10px 0;
    border: 2px solid ${props => props.color && props.color};
    width: 50px;
  }

  &:hover {
    color: ${props =>
      props.colorhover
        ? props.colorhover
        : props.color
        ? darken(0.1, props.color)
        : '#3d3d3d'};
    transition: color 0.3s;
  }
`;

export const TitleH2 = styled.h2<TitleProps>`
  margin-top: ${props => (props.margintop ? props.margintop : '0')}px;
  margin-right: ${props => (props.marginright ? props.marginright : '0')}px;
  margin-bottom: ${props => (props.marginbottom ? props.marginbottom : '20')}px;
  margin-left: ${props => (props.marginleft ? props.marginleft : '0')}px;
  padding-top: ${props => (props.paddingtop ? props.paddingtop : '0')}px;
  padding-right: ${props => (props.paddingright ? props.paddingright : '0')}px;
  padding-bottom: ${props =>
    props.paddingbottom ? props.paddingbottom : '0'}px;
  padding-left: ${props => (props.paddingleft ? props.paddingleft : '0')}px;
  color: ${props => (props.color ? props.color : '#3d3d3d')};
  text-align: ${props => (props.align ? props.align : 'left')};
  font-size: ${props => (props.fontsize ? props.fontsize : '3.12rem')};
  font-weight: ${props => (props.fontweight ? props.fontweight : '600')};
  text-transform: ${props =>
    props.texttransform ? props.texttransform : 'uppercase'};
  letter-spacing: 1px;

  hr {
    margin: 10px 0;
    border: 2px solid ${props => props.color && props.color};
    width: 50px;
  }

  &:hover {
    color: ${props =>
      props.colorhover
        ? props.colorhover
        : props.color
        ? darken(0.1, props.color)
        : '#3d3d3d'};
    transition: color 0.3s;
  }
`;

export const TitleH3 = styled.h3<TitleProps>`
  margin-top: ${props => (props.margintop ? props.margintop : '0')}px;
  margin-right: ${props => (props.marginright ? props.marginright : '0')}px;
  margin-bottom: ${props => (props.marginbottom ? props.marginbottom : '20')}px;
  margin-left: ${props => (props.marginleft ? props.marginleft : '0')}px;
  padding-top: ${props => (props.paddingtop ? props.paddingtop : '0')}px;
  padding-right: ${props => (props.paddingright ? props.paddingright : '0')}px;
  padding-bottom: ${props =>
    props.paddingbottom ? props.paddingbottom : '0'}px;
  padding-left: ${props => (props.paddingleft ? props.paddingleft : '0')}px;
  color: ${props => (props.color ? props.color : '#3d3d3d')};
  text-align: ${props => (props.align ? props.align : 'left')};
  font-size: ${props => (props.fontsize ? props.fontsize : '2.81rem')};
  font-weight: ${props => (props.fontweight ? props.fontweight : '600')};
  text-transform: ${props =>
    props.texttransform ? props.texttransform : 'uppercase'};
  letter-spacing: 1px;

  hr {
    margin: 10px 0;
    border: 2px solid ${props => props.color && props.color};
    width: 50px;
  }

  &:hover {
    color: ${props =>
      props.colorhover
        ? props.colorhover
        : props.color
        ? darken(0.1, props.color)
        : '#3d3d3d'};
    transition: color 0.3s;
  }
`;

export const TitleH4 = styled.h4<TitleProps>`
  margin-top: ${props => (props.margintop ? props.margintop : '0')}px;
  margin-right: ${props => (props.marginright ? props.marginright : '0')}px;
  margin-bottom: ${props => (props.marginbottom ? props.marginbottom : '20')}px;
  margin-left: ${props => (props.marginleft ? props.marginleft : '0')}px;
  padding-top: ${props => (props.paddingtop ? props.paddingtop : '0')}px;
  padding-right: ${props => (props.paddingright ? props.paddingright : '0')}px;
  padding-bottom: ${props =>
    props.paddingbottom ? props.paddingbottom : '0'}px;
  padding-left: ${props => (props.paddingleft ? props.paddingleft : '0')}px;
  color: ${props => (props.color ? props.color : '#3d3d3d')};
  text-align: ${props => (props.align ? props.align : 'left')};
  font-size: ${props => (props.fontsize ? props.fontsize : '2.5rem')};
  font-weight: ${props => (props.fontweight ? props.fontweight : '500')};
  text-transform: ${props =>
    props.texttransform ? props.texttransform : 'none'};

  hr {
    margin: 10px 0;
    border: 2px solid ${props => props.color && props.color};
    width: 50px;
  }

  &:hover {
    color: ${props =>
      props.colorhover
        ? props.colorhover
        : props.color
        ? darken(0.1, props.color)
        : '#3d3d3d'};
    transition: color 0.3s;
  }
`;

export const TitleH5 = styled.h5<TitleProps>`
  margin-top: ${props => (props.margintop ? props.margintop : '0')}px;
  margin-right: ${props => (props.marginright ? props.marginright : '0')}px;
  margin-bottom: ${props => (props.marginbottom ? props.marginbottom : '20')}px;
  margin-left: ${props => (props.marginleft ? props.marginleft : '0')}px;
  padding-top: ${props => (props.paddingtop ? props.paddingtop : '0')}px;
  padding-right: ${props => (props.paddingright ? props.paddingright : '0')}px;
  padding-bottom: ${props =>
    props.paddingbottom ? props.paddingbottom : '0'}px;
  padding-left: ${props => (props.paddingleft ? props.paddingleft : '0')}px;
  color: ${props => (props.color ? props.color : '#3d3d3d')};
  text-align: ${props => (props.align ? props.align : 'left')};
  font-size: ${props => (props.fontsize ? props.fontsize : '2.18rem')};
  font-weight: ${props => (props.fontweight ? props.fontweight : '400')};
  text-transform: ${props =>
    props.texttransform ? props.texttransform : 'none'};

  &:hover {
    color: ${props =>
      props.colorhover
        ? props.colorhover
        : props.color
        ? darken(0.1, props.color)
        : '#3d3d3d'};
    transition: color 0.3s;
  }
`;

export const TitleH6 = styled.h6<TitleProps>`
  margin-top: ${props => (props.margintop ? props.margintop : '0')}px;
  margin-right: ${props => (props.marginright ? props.marginright : '0')}px;
  margin-bottom: ${props => (props.marginbottom ? props.marginbottom : '20')}px;
  margin-left: ${props => (props.marginleft ? props.marginleft : '0')}px;
  padding-top: ${props => (props.paddingtop ? props.paddingtop : '0')}px;
  padding-right: ${props => (props.paddingright ? props.paddingright : '0')}px;
  padding-bottom: ${props =>
    props.paddingbottom ? props.paddingbottom : '0'}px;
  padding-left: ${props => (props.paddingleft ? props.paddingleft : '0')}px;
  color: ${props => (props.color ? props.color : '#3d3d3d')};
  text-align: ${props => (props.align ? props.align : 'left')};
  font-size: ${props => (props.fontsize ? props.fontsize : '1.87rem')};
  font-weight: ${props => (props.fontweight ? props.fontweight : '400')};
  text-transform: ${props =>
    props.texttransform ? props.texttransform : 'none'};

  &:hover {
    color: ${props =>
      props.colorhover
        ? props.colorhover
        : props.color
        ? darken(0.1, props.color)
        : '#3d3d3d'};
    transition: color 0.3s;
  }
`;

export const Paragraph = styled.p<ParagraphProps>`
  margin-top: ${props => (props.margintop ? props.margintop : '0')}px;
  margin-right: ${props => (props.marginright ? props.marginright : '0')}px;
  margin-bottom: ${props => (props.marginbottom ? props.marginbottom : '0')}px;
  margin-left: ${props => (props.marginleft ? props.marginleft : '0')}px;
  padding-top: ${props => (props.paddingtop ? props.paddingtop : '0')}px;
  padding-right: ${props => (props.paddingright ? props.paddingright : '0')}px;
  padding-bottom: ${props =>
    props.paddingbottom ? props.paddingbottom : '0'}px;
  padding-left: ${props => (props.paddingleft ? props.paddingleft : '0')}px;
  color: ${props => (props.color ? props.color : '#3d3d3d')};
  text-align: ${props => (props.align ? props.align : 'left')};
  text-transform: ${props =>
    props.texttransform ? props.texttransform : 'none'};
  font-size: ${props => (props.fontsize ? props.fontsize : '1.6rem')};
  font-weight: ${props => (props.fontweight ? props.fontweight : '300')};
  line-height: ${props => (props.lineheight ? props.lineheight : '20')}px;

  &:hover {
    color: ${props =>
      props.colorhover
        ? props.colorhover
        : props.color
        ? darken(0.1, props.color)
        : '#3d3d3d'};
    transition: color 0.3s;
  }
`;

export const LabelForm = styled.label`
  margin: 0 0 5px;
  color: #3d3d3d;
  text-align: left;
`;

export const Buttons = styled.div<ButtonsProps>`
  margin-top: ${props => (props.margintop ? props.margintop : '0')}px;
  margin-bottom: ${props => (props.marginbottom ? props.marginbottom : '0')}px;
  display: flex;
  justify-content: ${props => (props.align ? props.align : 'center')};
  width: ${props => (props.width ? props.width : '100%')};
`;

export const Button = styled.button<ButtonProps>`
  background: ${props => (props.background ? props.background : '#1976d2')};
  color: ${props => (props.color ? props.color : '#fff')};
  font-weight: ${props => (props.fontweight ? props.fontweight : '400')};
  font-size: ${props => (props.fontsize ? props.fontsize : '1.6rem')};
  text-transform: ${props =>
    props.texttransform ? props.texttransform : 'none'};
  border: ${props => (props.border ? props.border : '0')};
  border-radius: ${props => (props.borderradius ? props.borderradius : '8')}px;
  margin-top: ${props => (props.margintop ? props.margintop : '0')}px;
  margin-right: ${props => (props.marginright ? props.marginright : '0')}px;
  margin-bottom: ${props => (props.marginbottom ? props.marginbottom : '0')}px;
  margin-left: ${props => (props.marginleft ? props.marginleft : '0')}px;
  padding-top: ${props => (props.paddingtop ? props.paddingtop : '8')}px;
  padding-right: ${props => (props.paddingright ? props.paddingright : '25')}px;
  padding-bottom: ${props =>
    props.paddingbottom ? props.paddingbottom : '8'}px;
  padding-left: ${props => (props.paddingleft ? props.paddingleft : '25')}px;
  width: ${props => (props.width ? props.width : 'fit-content')};
  min-height: ${props => (props.minheight ? props.minheight : '35')}px;
  display: ${props => (props.display ? props.display : 'flex')};
  align-items: center;
  justify-content: ${props => (props.align ? props.align : 'center')};
  transition: background 0.3s;

  &:hover {
    background: ${props =>
      props.background
        ? darken(0.1, props.background)
        : darken(0.1, '#1976d2')};
    transition: background 0.3s;
  }
`;

export const ButtonGradient = styled.button<ButtonProps>`
  background: linear-gradient(
    45deg,
    ${props => (props.background1 ? props.background1 : '#FF4E00')} 30%,
    ${props => (props.background2 ? props.background2 : '#FF8000')} 90%
  );
  color: ${props => (props.color ? props.color : '#fff')};
  font-weight: ${props => (props.fontweight ? props.fontweight : '400')};
  font-size: ${props => (props.fontsize ? props.fontsize : '1.6rem')};
  border: ${props => (props.border ? props.border : '0')};
  border-top-left-radius: ${props =>
    props.bordertopleftradius ? props.bordertopleftradius : '8'}px;
  border-top-right-radius: ${props =>
    props.bordertoprightradius ? props.bordertoprightradius : '8'}px;
  border-bottom-left-radius: ${props =>
    props.borderbottomleftradius ? props.borderbottomleftradius : '8'}px;
  border-bottom-right-radius: ${props =>
    props.borderbottomrightradius ? props.borderbottomrightradius : '8'}px;
  padding: 3px 25px;
  width: ${props => (props.width ? props.width : 'fit-content')};
  min-height: ${props => (props.minheight ? props.minheight : '35')}px;
  transition: background 0.3s;

  &.active {
    background: ${props =>
      props.backgroundactive ? props.backgroundactive : '#fff'};
    color: ${props => (props.coloractive ? props.coloractive : '#3d3d3d')};
    transition: background 0.3s;
  }
`;

export const UlFormCol1 = styled.ul<UlForms>`
  display: ${props => (props.invisible ? 'none' : 'grid')};
  grid-template-columns: repeat(1, 1fr);

  li {
    text-align: left;
  }
`;

export const UlFormCol2 = styled.ul<UlForms>`
  display: ${props => (props.invisible ? 'none' : 'grid')};
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 10px;

  li {
    text-align: left;
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

export const UlFormCol3 = styled.ul<UlForms>`
  display: ${props => (props.invisible ? 'none' : 'grid')};
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;

  li {
    text-align: left;
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

export const UlFormCol4 = styled.ul<UlForms>`
  display: ${props => (props.invisible ? 'none' : 'grid')};
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 10px;

  li {
    text-align: left;
  }

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;
