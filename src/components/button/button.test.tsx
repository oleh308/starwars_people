import React from 'react';
import Button from './index';
import { render, screen, fireEvent } from '@testing-library/react';

describe('Button testing', () => {
  it('should have basic button', () => {
    render(
      <Button
        title='Click me'
        onClick={() => {}}
      />
    );
    const buttonElement = screen.getByText(/Click me/i);
    expect(buttonElement).toBeInTheDocument();
  });

  it('should click button', () => {
    const onClick = jest.fn();

    render(
      <Button
        title='Click me'
        onClick={onClick}
      />
    );
    const buttonElement = screen.getByText(/Click me/i);
    fireEvent.click(buttonElement);
    expect(onClick).toHaveBeenCalled();
  });

  it('should not be able to click button', () => {
    const onClick = jest.fn();

    render(
      <Button
        disabled={true}
        title='Click me'
        onClick={onClick}
      />
    );
    const buttonElement = screen.getByText(/Click me/i);
    fireEvent.click(buttonElement);
    expect(onClick).not.toHaveBeenCalled();
  });
})
