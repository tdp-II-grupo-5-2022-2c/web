import React from 'react';
import {render, screen} from '@testing-library/react';
import {MemoryRouter} from "react-router-dom";
import SignIn from "../routes/SignIn";
import userEvent from "@testing-library/user-event";

test('renders signin Form', () => {
  //ARRANGE
  render(
    <MemoryRouter>
      <SignIn/>
    </MemoryRouter>
  )

  //ACT
  const emailAddressForm = screen.getByText(/Email address/i);
  const passwordForm = screen.getByText(/Password/i);
  const heading = screen.getByRole('heading')
  const button = screen.getByRole('button', {name: /Sign in/i});

  //ASSERT
  expect(emailAddressForm).toBeInTheDocument();
  expect(passwordForm).toBeInTheDocument();
  expect(heading).toHaveTextContent('Please sign in')
  expect(button).toBeInTheDocument()
});
