import React from 'react';
import { Container, Title, List, Item, Picture, Name } from './profiles.style';


interface IProfiles {
  children?: JSX.Element | JSX.Element[] | string,
  [ restProps: string ]: any
}


export default function Profiles({ children, ...restProps }: IProfiles) {
  return <Container { ...restProps }>{ children }</Container>;
}

Profiles.Title = function ProfilesTitle({ children, ...restProps }: IProfiles) {
  return <Title { ...restProps }>{ children }</Title>;
};

Profiles.List = function ProfilesList({ children, ...restProps }: IProfiles) {
  return <List { ...restProps }>{ children }</List>;
};

Profiles.User = function ProfilesUser({ children, ...restProps }: IProfiles) {
  return <Item { ...restProps }>{ children }</Item>;
};

Profiles.Picture = function ProfilesPicture({ src, ...restProps }: IProfiles) {
  return <Picture { ...restProps } src={ src
    ? `${ process.env.PUBLIC_URL }/images/users/${src}.png`
    : `${ process.env.PUBLIC_URL }/images/misc/loading.gif`
  } />;
};

Profiles.Name = function ProfilesName({ children, ...restProps }: IProfiles) {
  return <Name { ...restProps }>{ children }</Name>;
};
