import React from 'react';
import { BrowserRouter } from "react-router-dom";
import { render } from '@testing-library/react';
import { Home } from '../../pages';


jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn(),
}));

test('renders the homepage', () => {
  const { getByText, getAllByText, getAllByPlaceholderText } = render(
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  );
  
  expect(getByText('Unlimited films, TV programmes and more.')).toBeTruthy();
  expect(getByText('Watch anywhere. Cancel at any time.')).toBeTruthy();
  expect(getAllByPlaceholderText('Email address')).toBeTruthy();
  expect(getAllByText('Try it now')).toBeTruthy();
  expect(getAllByText('Ready to watch? Enter your email to create or restart your membership.')).toBeTruthy();
});
