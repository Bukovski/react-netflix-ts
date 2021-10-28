import React from 'react';
import { Container, Title, SubTitle } from './feature.style';


interface IFeature {
  children?: JSX.Element | JSX.Element[] | string,
  [ restProps: string ]: any
}


export default function Feature({ children, ...restProps }: IFeature) {
  return <Container { ...restProps }>{ children }</Container>;
}

Feature.Title = function FeatureTitle({ children, ...restProps }: IFeature) {
  return <Title { ...restProps }>{ children }</Title>;
};

Feature.SubTitle = function FeatureSubTitle({ children, ...restProps }: IFeature) {
  return <SubTitle { ...restProps }>{ children }</SubTitle>;
};
