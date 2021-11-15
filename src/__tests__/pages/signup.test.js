import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import { SignUp } from '../../pages';
import { FirebaseContext } from '../../context/firebase.context';


jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({}),
}));


describe('<SignUp />', () => {
  it('renders the sign up page with a form submission', async () => {
    const firebase = {
      auth: jest.fn(() => ({
        createUserWithEmailAndPassword: jest.fn(() =>
          Promise.resolve({
            user: {
              updateProfile: jest.fn(() => Promise.resolve('I am signed up!'))
            }
          })
        ),
      })),
    };
    
    const { getByTestId, getByPlaceholderText, queryByTestId } = render(
      <Router>
        <FirebaseContext.Provider value={{ firebase }}>
          <SignUp />
        </FirebaseContext.Provider>
      </Router>
    );
    
    fireEvent.change(
      getByPlaceholderText('First name'),
      { target: { value: 'Karl' } }
    );
    fireEvent.change(
      getByPlaceholderText('Email address'),
      { target: { value: 'karl@gmail.com' } }
    );
    fireEvent.change(
      getByPlaceholderText('Password'),
      { target: { value: 'password' } }
    );
    
    await act( async () => {
      fireEvent.click(getByTestId('sign-up'));
      
      expect(getByPlaceholderText('Email address').value).toBe('karl@gmail.com');
      expect(getByPlaceholderText('Password').value).toBe('password');
      expect(queryByTestId('error')).toBeFalsy();
    });
  });
});
