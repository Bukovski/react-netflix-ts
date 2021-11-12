import React from 'react';
import { BrowserRouter } from "react-router-dom";
import { render, fireEvent } from '@testing-library/react';
import { SelectProfileContainer } from '../../containers';


jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn(),
}));


describe('<Profiles />', () => {
  it('renders the <Profiles />', () => {
    const user = { displayName: 'Karl', photoURL: 'profile.png' };
    const setProfile = jest.fn();
    
    const { getByTestId } = render(
      <BrowserRouter>
        <SelectProfileContainer user={user} setProfile={setProfile} />
      </BrowserRouter>
    );
    
    fireEvent.click(getByTestId('user-profile'));
    expect(setProfile).toHaveBeenCalled();
  });
});
