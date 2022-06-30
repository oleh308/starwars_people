import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import Search from './index';

describe('Search testing', () => {
  afterEach(cleanup);

  it('Must render all inner components', () => {
    render(
      <Search
        update={() => {}}
      />
    );

    const nextElement = screen.getByTestId('button-next');
    const inputElement = screen.getByTestId('search-input');
    const prevElement = screen.getByTestId('button-previous');
    const searchElement = screen.getByTestId('search-button');

    expect(inputElement).toBeInTheDocument();
    expect(prevElement).toBeInTheDocument();
    expect(nextElement).toBeInTheDocument();
    expect(searchElement).toBeInTheDocument();
  });

  it('Must render and check the correct state of components', () => {
    const update = jest.fn();

    render(
      <Search
        update={update}
      />
    );
    const nextElement = screen.getByTestId('button-next');
    const prevElement = screen.getByTestId('button-previous');
    const searchElement = screen.getByTestId('search-button');

    expect(nextElement).toBeDisabled();
    expect(prevElement).toBeDisabled();

    fireEvent.click(prevElement);
    fireEvent.click(nextElement);
    fireEvent.click(searchElement);

    expect(update).toHaveBeenCalledTimes(1);
  });
})
