import React from 'react';
import ErrorMessage from './index';
import { render, screen, fireEvent } from '@testing-library/react';

describe('ErrorMessage testing', () => {
  it('should have basic error message', () => {
    render(
      <ErrorMessage
        remove={() => {}}
        error='Error message'
      />
    );
    const errorElement = screen.getByText(/Error message/i);
    expect(errorElement).toBeInTheDocument();
  });

  it('should click remove button', () => {
    const remove = jest.fn();

    render(
      <ErrorMessage
        remove={remove}
        error='Error message'
      />
    );
    const removeElement = screen.getByTestId("remove-error");
    fireEvent.click(removeElement);
    expect(remove).toHaveBeenCalled();
  });
})
