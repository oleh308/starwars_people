import React from 'react';
import Button from './index';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';

describe('Button testing', () => {
  afterEach(cleanup);

  it('Must render a button', () => {
    render(
      <Button
        title='Click me'
        onClick={() => {}}
      />
    );
    const buttonElement = screen.getByTestId('button-clickme');
    expect(buttonElement).toBeInTheDocument();
  });

  it('Must render a button and trigger a callback', () => {
    const onClick = jest.fn();

    render(
      <Button
        title='Click me'
        onClick={onClick}
      />
    );
    const buttonElement = screen.getByTestId('button-clickme');
    fireEvent.click(buttonElement);
    expect(onClick).toHaveBeenCalled();
  });

  it('Must render a disabled button', () => {
    const onClick = jest.fn();

    render(
      <Button
        disabled={true}
        title='Click me'
        onClick={onClick}
      />
    );
    const buttonElement = screen.getByTestId('button-clickme');

    fireEvent.click(buttonElement);
    expect(onClick).not.toHaveBeenCalled();
    expect(buttonElement).toBeDisabled();
  });
})
