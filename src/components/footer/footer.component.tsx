import React from 'react';
import { Container, Row, Column, Link, Title, Text, Break } from './footer.style';


interface IFooter {
  children?: JSX.Element | JSX.Element[] | string,
  [ restProps: string ]: any
}


function Footer({ children, ...restProps }: IFooter) {
  return <Container { ...restProps }>{ children }</Container>;
}

Footer.Row = function FooterRow({ children, ...restProps }: IFooter) {
  return <Row { ...restProps }>{ children }</Row>;
};

Footer.Column = function FooterColumn({ children, ...restProps }: IFooter) {
  return <Column { ...restProps }>{ children }</Column>;
};

Footer.Link = function FooterLink({ children, ...restProps }: IFooter) {
  return <Link { ...restProps }>{ children }</Link>;
};

Footer.Title = function FooterTitle({ children, ...restProps }: IFooter) {
  return <Title { ...restProps }>{ children }</Title>;
};

Footer.Text = function FooterText({ children, ...restProps }: IFooter) {
  return <Text { ...restProps }>{ children }</Text>;
};

Footer.Break = function FooterBreak({ ...restProps }: IFooter) {
  return <Break { ...restProps } />;
};


export default Footer;
