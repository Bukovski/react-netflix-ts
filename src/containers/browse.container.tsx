import React, { useState, useEffect, useContext } from 'react';
import Fuse from "fuse.js";
import logo from '../assets/logo.svg';
import { FirebaseContext } from '../context/firebase.context';
import { RouteConstants } from '../types/routes.type';
import { IProfileState, ISlideRows } from "../types/main.type";
import { Card, Header, Loading, Player } from '../components';
import { SelectProfileContainer, FooterContainer } from './index';



interface IBrowseContainerProps {
  slides: {
    series : ISlideRows[],
    films : ISlideRows[]
  }
}

export default function BrowseContainer({ slides }: IBrowseContainerProps) {
  const [ category, setCategory ] = useState<string>('series');
  const [ profile, setProfile ] = useState<IProfileState | {}>({});
  const [ loading, setLoading ] = useState<boolean>(true);
  const [ searchTerm, setSearchTerm ] = useState<string>('');
  const [ slideRows, setSlideRows ] = useState<ISlideRows[] | []>([]);

  const { firebase } = useContext(FirebaseContext);
  const user = firebase.auth().currentUser || {};

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, [ profile ]);

  useEffect(() => {
    // @ts-ignore
    setSlideRows(slides[ category ]);
  }, [ slides, category ]);

  useEffect(() => {
    const fuse = new Fuse(slideRows, {
      keys: [ 'data.description', 'data.title', 'data.genre' ]
    });

    const fuseSearch = fuse.search(searchTerm) || [];

    const results: ISlideRows[] = fuseSearch.map(({ item }) => {
      // return item;
      return {
        ...item,
        data: item.data.filter(({ title, description }) => (
          (description + title).toLowerCase()
            .includes(searchTerm.toLowerCase()))
        )
      };
    })

    shouldSlidesUpdate(results);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ searchTerm ]);


  const shouldSlidesUpdate = (results: ISlideRows[]) => (slideRows.length > 2 && results.length > 0)
    ? setSlideRows(results)
    // @ts-ignore
    : setSlideRows(slides[ category ])



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

      <Card.Group>
        { slideRows.map((slideItem) => (
          <Card key={`${ category }-${ slideItem.title.toLowerCase() }`}>
            <Card.Title>{ slideItem.title }</Card.Title>
            <Card.Entities>
              { slideItem.data.map((item) => (
                <Card.Item key={ item.docId } item={ item }>
                  <Card.Image src={`${ process.env.PUBLIC_URL }/images/${ category }/${ item.genre }/${ item.slug }/small.jpg` } />
                  <Card.Meta>
                    <Card.SubTitle>{ item.title }</Card.SubTitle>
                    <Card.Text>{ item.description }</Card.Text>
                  </Card.Meta>
                </Card.Item>
              )) }
            </Card.Entities>

            <Card.Feature category={ category }>
              <Player>
                <Player.Button />
                <Player.Video src={ `/videos/bunny.mp4` } />
              </Player>
            </Card.Feature>
          </Card>
        )) }
      </Card.Group>

      <FooterContainer />
    </>)
    : ( <SelectProfileContainer user={ user } setProfile={ setProfile } /> );
}
