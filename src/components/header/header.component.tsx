import React, { useState } from 'react';
import { Link as ReachRouterLink } from 'react-router-dom';
import { Container, Group, Background, Dropdown, Picture, Link,
  Search, Profile, FeatureCallOut, SearchIcon, SearchInput,
  ButtonLink, PlayButton, Text, Feature, Logo } from './header.style';


interface IHeader {
  bg?: boolean,
  children?: JSX.Element | JSX.Element[] | string,
  [ restProps: string ]: any
}

interface IHeaderBackground extends IHeader {
  children: any
}


function Header({ bg = true, children, ...restProps }: IHeaderBackground) {
  return (
    bg
    ? ( <Background data-testid="header-bg" { ...restProps }>
      { children }
    </Background> )
    : (children)
  )
}

Header.Frame = function HeaderFrame({ children, ...restProps }: IHeader) {
  return <Container { ...restProps }>{ children }</Container>;
};

Header.Group = function HeaderGroup({ children, ...restProps }: IHeader) {
  return <Group { ...restProps }>{ children }</Group>;
};

Header.Logo = function HeaderLogo({ to = "/", ...restProps }: IHeader) {
  return (
    <ReachRouterLink to={to}>
      <Logo { ...restProps } />
    </ReachRouterLink>
  );
};

Header.Search = function HeaderSearch({ searchTerm, setSearchTerm, ...restProps }: IHeader) {
  const [ searchActive, setSearchActive ] = useState(false);

  return (
    <Search { ...restProps }>
      <SearchIcon onClick={ () => setSearchActive((searchActive) => !searchActive) } data-testid="search-click">
        <img src={ `${ process.env.PUBLIC_URL }/images/icons/search.png` } alt="Search" />
      </SearchIcon>
      <SearchInput
        value={ searchTerm }
        onChange={ ({ target }) => setSearchTerm(target.value) }
        placeholder="Search films and series"
        active={ searchActive }
        data-testid="search-input"
      />
    </Search>
  );
};

Header.Profile = function HeaderProfile({ children, ...restProps }: IHeader) {
  return <Profile { ...restProps }>{ children }</Profile>;
};

Header.Feature = function HeaderFeature({ children, ...restProps }: IHeader) {
  return <Feature>{ children }</Feature>;
};

Header.Picture = function HeaderPicture({ src, ...restProps }: IHeader) {
  return <Picture { ...restProps } src={ `${ process.env.PUBLIC_URL }/images/users/${ src }.png` } />;
};

Header.Dropdown = function HeaderDropdown({ children, ...restProps }: IHeader) {
  return <Dropdown { ...restProps }>{ children }</Dropdown>;
};

Header.TextLink = function HeaderTextLink({ children, ...restProps }: IHeader) {
  return <Link { ...restProps }>{ children }</Link>;
};

Header.PlayButton = function HeaderPlayButton({ children, ...restProps }: IHeader) {
  return <PlayButton { ...restProps }>{ children }</PlayButton>;
};

Header.FeatureCallOut = function HeaderFeatureCallOut({ children, ...restProps }: IHeader) {
  return <FeatureCallOut { ...restProps }>{ children }</FeatureCallOut>;
};

Header.Text = function HeaderText({ children, ...restProps }: IHeader) {
  return <Text { ...restProps }>{ children }</Text>;
};

Header.ButtonLink = function HeaderButtonLink({ children, ...restProps }: IHeader) {
  // @ts-ignore
  return <ButtonLink { ...restProps }>{ children }</ButtonLink>;
};


export default Header;
