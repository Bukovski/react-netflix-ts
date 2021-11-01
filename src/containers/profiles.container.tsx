import React from 'react';
import { Header, Profiles } from '../components';
import logo from '../assets/logo.svg';
import { RouteConstants } from '../types/routes.type';
import { IProfileState } from "../types/main.type";


interface ISelectProfileContainer {
  user: IProfileState,
  setProfile({ displayName, photoURL }: IProfileState): void
}

export default function SelectProfileContainer({ user, setProfile }: ISelectProfileContainer) {
  return (
    <>
      <Header bg={ false }>
        <Header.Frame>
          <Header.Logo
            alt="Netflix"
            to={ RouteConstants.HOME }
            src={ logo }
          />
        </Header.Frame>
      </Header>

      <Profiles>
        <Profiles.Title>Who's watching?</Profiles.Title>
        <Profiles.List>
          <Profiles.User
            onClick={ () => setProfile({
              displayName: user.displayName,
              photoURL: user.photoURL
            }) }
            data-testid="user-profile"
          >
            <Profiles.Picture src={ user.photoURL } />
            <Profiles.Name>{ user.displayName }</Profiles.Name>
          </Profiles.User>
        </Profiles.List>
      </Profiles>
    </>
  );
}
