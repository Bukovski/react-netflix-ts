import React from 'react';
import { Header } from '../components';
import { RouteConstants } from "../types/routes.type";
import logo from '../assets/logo.svg';


interface IHeaderContainer {
  children: JSX.Element
}

const HeaderContainer = ({ children }: IHeaderContainer) => {
  return (
    <Header>
      <Header.Frame>
        <Header.Logo to={ RouteConstants.HOME } src={ logo } alt="Netflix" />
        <Header.ButtonLink to={ RouteConstants.SIGN_IN }>Sign In</Header.ButtonLink>
      </Header.Frame>
      { children }
    </Header>
  );
}


export default HeaderContainer;
