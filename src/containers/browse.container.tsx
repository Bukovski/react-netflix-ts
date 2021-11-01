import React, { useState, useEffect, useContext } from 'react';
import logo from '../assets/logo.svg';
import { FirebaseContext } from '../context/firebase.context';
import { RouteConstants } from '../types/routes.type';
import { IProfileState, ISelectFilterData } from "../types/main.type";
import { Header, Loading } from '../components';
import { SelectProfileContainer, FooterContainer } from './index';


interface IBrowseContainerProps {
  slides: {
    series : ISelectFilterData[],
    films : ISelectFilterData[]
  }
}

export default function BrowseContainer({ slides }: IBrowseContainerProps) {
  const [ category, setCategory ] = useState<string>('series');
  const [ profile, setProfile ] = useState<IProfileState | {}>({});
  const [ loading, setLoading ] = useState<boolean>(true);
  const [ searchTerm, setSearchTerm ] = useState<string>('');

  const { firebase } = useContext(FirebaseContext);
  const user = firebase.auth().currentUser || {};

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, [ profile ]);


  return ("displayName" in profile && profile.displayName)
    ? (<>
      { loading
        ? <Loading src={ user.photoURL } />
        : <Loading.ReleaseBody />
      }

      <Header src="joker1" dontShowOnSmallViewPort>
        <Header.Frame>
          <Header.Group>
            <Header.Logo
              alt="Netflix"
              to={ RouteConstants.HOME }
              src={ logo }
            />
            <Header.TextLink
              active={ category === 'series' ? 'true' : 'false' }
              onClick={ () => setCategory('series') }
            >
              Series
            </Header.TextLink>
            <Header.TextLink
              active={ category === 'films' ? 'true' : 'false' }
              onClick={ () => setCategory('films') }
            >
              Films
            </Header.TextLink>
          </Header.Group>

          <Header.Group>
            <Header.Search
              searchTerm={ searchTerm }
              setSearchTerm={ setSearchTerm }
            />
            <Header.Profile>
              <Header.Picture src={ user.photoURL } />
              <Header.Dropdown>
                <Header.Group>
                  <Header.Picture src={ user.photoURL } />
                  <Header.TextLink>{ user.displayName }</Header.TextLink>
                </Header.Group>

                <Header.Group>
                  <Header.TextLink onClick={ () => firebase.auth().signOut() }>Sign out</Header.TextLink>
                </Header.Group>
              </Header.Dropdown>
            </Header.Profile>
          </Header.Group>

        </Header.Frame>

        <Header.Feature>
          <Header.FeatureCallOut>Watch Joker Now</Header.FeatureCallOut>
          <Header.Text>
            Forever alone in a crowd, failed comedian Arthur Fleck seeks connection as he walks the streets of Gotham
            City. Arthur wears two masks -- the one he paints for his day job as a clown, and the guise he projects in a
            futile attempt to feel like he's part of the world around him.
          </Header.Text>
          <Header.PlayButton>Play</Header.PlayButton>
        </Header.Feature>
      </Header>

      <FooterContainer />
    </>)
    : ( <SelectProfileContainer user={ user } setProfile={ setProfile } /> );
}
