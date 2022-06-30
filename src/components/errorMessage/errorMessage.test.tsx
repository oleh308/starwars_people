import React from 'react';
import ErrorMessage from './index';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';

describe('ErrorMessage testing', () => {
  afterEach(cleanup);

  it('Must render an error message', () => {
    render(
      <ErrorMessage
        remove={() => {}}
        error='Error message'
      />
    );
    const errorElement = screen.getByText(/Error message/i);
    expect(errorElement).toBeInTheDocument();
  });

  it('Must render an error message and trigger a callback', () => {
    const remove = jest.fn();

    render(
      <ErrorMessage
        remove={remove}
        error='Error message'
      />
    );

    const errorElement = screen.getByText(/Error message/i);
    expect(errorElement).toBeInTheDocument();

    const removeElement = screen.getByTestId('remove-error');
    fireEvent.click(removeElement);
    expect(remove).toHaveBeenCalled();
  });
})
