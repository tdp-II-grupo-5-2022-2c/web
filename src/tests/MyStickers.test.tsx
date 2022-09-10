import React from 'react';
import {render, screen} from '@testing-library/react';
import {MemoryRouter} from "react-router-dom";
import MyStickers from "../routes/MyStickers";

test('renders grid', () => {
  //ARRANGE
  render(
    <MemoryRouter>
      <MyStickers/>
    </MemoryRouter>
  )

  //ACT
  const stickersGrids = screen.getAllByAltText('Column')

  //ASSERT
  expect(stickersGrids).toBeInTheDocument()
});
