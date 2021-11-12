import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import { SignIn } from '../../pages';
import { FirebaseContext } from '../../context/firebase.context';


jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({}),
}));


describe('<SignIn />', () => {
  it('renders the sign in page with a form submission', async () => {
    const firebase = {
      auth: jest.fn(() => ({
        signInWithEmailAndPassword: jest.fn((emailAddress, password) => Promise.resolve(emailAddress, password)),
      })),
    };
    
    const { getByTestId, getByPlaceholderText, queryByTestId } = render(
      <Router>
        <FirebaseContext.Provider value={{ firebase }}>
          <SignIn />
        </FirebaseContext.Provider>
      </Router>
    );
    
    fireEvent.change(
      getByPlaceholderText('Email address'),
      { target: { value: 'karl@gmail.com' } }
    );
    
    fireEvent.change(
      getByPlaceholderText('Password'),
      { target: { value: 'password' } }
    );
    
    await act(async () => {
      fireEvent.click(getByTestId('sign-in'));
      
      expect(getByPlaceholderText('Email address').value).toBe('karl@gmail.com');
      expect(getByPlaceholderText('Password').value).toBe('password');
      expect(queryByTestId('error')).toBeFalsy();
    });
  });
});