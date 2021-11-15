import React from 'react';
import Fuse from "fuse.js";
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Browse } from '../../pages';
import { FirebaseContext } from '../../context/firebase.context';


jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({}),
}));

jest.mock('../../utils', () => ({
  selectionFilter: () => ({
    series: [
      {
        title: 'Documentaries',
        data: [
          {
            docId: 'series-1x',
            title: 'Tiger King',
            description:
              'An exploration of big cat breeding and its bizarre underworld, populated by eccentric characters.',
            genre: 'documentaries',
            maturity: '18',
            slug: 'tiger-king',
          },
          {
            docId: 'series-2x',
            title: 'Making a Murderer',
            description:
              'Exonerated after spending nearly two decades in prison for a crime he did not commit, Steven Avery filed suit against Manitowoc County, Wis., and several individuals involved with his arrest.',
            genre: 'crime',
            maturity: '18',
            slug: 'making-a-murderer',
          }
        ],
      },
    ],
    films: [
      {
        title: 'Suspense',
        data: [
          {
            docId: 'film-1x',
            title: 'Amanda Knox',
            description: 'Amanda Marie Knox is an American woman who spent almost four years in an Italian prison.',
            genre: 'documentaries',
            maturity: '12',
            slug: 'amanda-knox',
          },
        ],
      },
    ],
  }),
}));



describe('<Browse />', () => {
  it('change category on page', () => {
    const firebase = {
      auth: jest.fn(() => ({
        currentUser: {
          displayName: 'Karl',
          photoURL: 1,
          email: 'karlhadwen@gmail.com'
        },
        signOut: jest.fn(() => Promise.resolve('I am signed out!')),
      })),
      firestore: jest.fn(() => ({
        collection: jest.fn(() => ({
          get: jest.fn(() => Promise.resolve('I get content!')),
          add: jest.fn(() => Promise.resolve('I add content!')),
        })),
      })),
    };
    
    render(
      <Router>
        <FirebaseContext.Provider value={{ firebase }}>
          <Browse />
        </FirebaseContext.Provider>
      </Router>
    )
    
    expect(screen.getByText("Who's watching?"));
    expect(screen.getByText("Karl"));

    fireEvent.click(screen.getByTestId("user-profile"));

    expect(screen.getByText("Documentaries"));
    expect(screen.getByText("Tiger King"));

    fireEvent.click(screen.getByText("Films"));
    expect(screen.queryByText("Documentaries")).toBeFalsy();
    expect(screen.queryByText("Tiger King")).toBeFalsy();
    expect(screen.getByText("Suspense"));
    expect(screen.getByText("Amanda Knox"));
    
    fireEvent.click(screen.getByText("Series"));
    expect(screen.getByText("Documentaries"));
    expect(screen.getByText("Tiger King"));
    expect(screen.queryByText("Suspense")).toBeFalsy();
    expect(screen.queryByText("Amanda Knox")).toBeFalsy();
  });
  
  it('firebase data without currentUser', () => {
    const signOutFn = jest.fn(() => Promise.resolve('I am signed out!'));
    const firebase = {
      auth: jest.fn(() => ({
        signOut: signOutFn,
      })),
      firestore: jest.fn(() => ({
        collection: jest.fn(() => ({
          get: jest.fn(() => Promise.resolve('I get content!')),
          add: jest.fn(() => Promise.resolve('I add content!')),
        })),
      })),
    };
    
    render(
      <Router>
        <FirebaseContext.Provider value={{ firebase }}>
          <Browse />
        </FirebaseContext.Provider>
      </Router>
    )
    
    fireEvent.click(screen.getByTestId("user-profile"));
    
    expect(screen.getByText("Who's watching?"));
    expect(screen.queryByText("Karl")).toBeNull();
  });
  
  it('search movie field', async () => {
    const firebase = {
      auth: jest.fn(() => ({
        currentUser: {
          displayName: 'Karl',
          photoURL: 1,
          email: 'karlhadwen@gmail.com'
        },
        signOut: jest.fn(() => Promise.resolve('I am signed out!')),
      })),
      firestore: jest.fn(() => ({
        collection: jest.fn(() => ({
          get: jest.fn(() => Promise.resolve('I get content!')),
          add: jest.fn(() => Promise.resolve('I add content!')),
        })),
      })),
    };
    
    render(
      <Router>
        <FirebaseContext.Provider value={{ firebase }}>
          <Browse />
        </FirebaseContext.Provider>
      </Router>
    )
  
    fireEvent.click(screen.getByTestId("user-profile"));
    
    await fireEvent.change(
      screen.getByTestId("search-input"),
      { target: { value: 'Murd' } }
    );
    expect(screen.getByPlaceholderText('Search films and series').value).toBe('Murd');
    
    await fireEvent.change(
      screen.getByTestId("search-input"),
      { target: { value: 'Not exists' } }
    );
    expect(screen.getByPlaceholderText('Search films and series').value).toBe('Not exists');
  });
  
  it('signOut from login account', () => {
    const signOutFn = jest.fn(() => Promise.resolve('I am signed out!'));
    const firebase = {
      auth: jest.fn(() => ({
        currentUser: {
          displayName: 'Karl',
          photoURL: 1,
          email: 'karlhadwen@gmail.com'
        },
        signOut: signOutFn,
      })),
      firestore: jest.fn(() => ({
        collection: jest.fn(() => ({
          get: jest.fn(() => Promise.resolve('I get content!')),
          add: jest.fn(() => Promise.resolve('I add content!')),
        })),
      })),
    };
    
    render(
      <Router>
        <FirebaseContext.Provider value={{ firebase }}>
          <Browse />
        </FirebaseContext.Provider>
      </Router>
    )
    
    fireEvent.click(screen.getByTestId("user-profile"));
    
    fireEvent.click(screen.getByText("Sign out"));
  
    expect(signOutFn).toBeCalled();
  });
});
