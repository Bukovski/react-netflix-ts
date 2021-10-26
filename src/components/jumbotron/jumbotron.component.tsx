import React from 'react';
import { Container, Item, Inner, Pane, Title, SubTitle, Image } from './jumbotron.style';


interface IJumbotron {
  direction?: string,
  children?: JSX.Element | JSX.Element[] | string,
  [ restProps: string ]: any,
}


function Jumbotron(props: IJumbotron) {
  const { children, direction = 'row', ...restProps } = props;

  return (
    <Item {...restProps}>
      <Inner direction={ direction }>
        { children }
      </Inner>
    </Item>
  );
}

Jumbotron.Container = function JumbotronContainer(props: IJumbotron) {
  const { children, ...restProps } = props;
  return <Container {...restProps}>{children}</Container>;
};

Jumbotron.Pane = function JumbotronPane(props: IJumbotron) {
  const { children, ...restProps } = props;

  return <Pane {...restProps}>{children}</Pane>;
};

Jumbotron.Title = function JumbotronTitle(props: IJumbotron) {
  const { children, ...restProps } = props;

  return <Title {...restProps}>{children}</Title>;
};

Jumbotron.SubTitle = function JumbotronSubTitle(props: IJumbotron) {
  const { children, ...restProps } = props;

  return <SubTitle {...restProps}>{children}</SubTitle>;
};

Jumbotron.Image = function JumbotronImage(props: IJumbotron) {
  const { ...restProps } = props;

  return <Image {...restProps} />;
};


export default Jumbotron;
