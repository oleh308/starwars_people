import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Search from './index';

describe('Search testing', () => {
  it('should have basic search', () => {
    render(
      <Search
        update={() => {}}
      />
    );
    const inputElement = screen.getByTestId('search-input');
    const prevElement = screen.getByText(/Previous/i);
    const nextElement = screen.getByText(/Next/i);
    const searchElement = screen.getByText(/Search/i);

    expect(inputElement).toBeInTheDocument();
    expect(prevElement).toBeInTheDocument();
    expect(nextElement).toBeInTheDocument();
    expect(searchElement).toBeInTheDocument();
  });

  it('should call search and navigations buttons', () => {
    const update = jest.fn();

    render(
      <Search
        update={update}
      />
    );
    const prevElement = screen.getByText(/Previous/i);
    const nextElement = screen.getByText(/Next/i);
    const searchElement = screen.getByText(/Search/i);

    fireEvent.click(prevElement);
    fireEvent.click(nextElement);
    fireEvent.click(searchElement);

    expect(update).toHaveBeenCalledTimes(1);
  });
})
