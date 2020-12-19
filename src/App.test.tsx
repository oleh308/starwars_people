import React, { ReactNode } from 'react';
import App from './App';
import { people, planetsMap } from './data/testData';
import { MainProvider, reducerInit } from './contexts/mainContext';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

describe('App testing', () => {
  it('should render app', () => {
    render(
      <App />
    );

    const loadElement = screen.getByText('Load data');
    expect(loadElement).toBeInTheDocument();

    const noContentElement = screen.getByText('No content');
    expect(loadElement).toBeInTheDocument();
  });

  it('should render app and load data', async () => {
    render(
      <App />
    );

    const loadElement = screen.getByText('Load data');
    fireEvent.click(loadElement);

    const searchElement = screen.getByTestId('search-container');
    const tableElement = screen.getByTestId('table-container');

    expect(searchElement).toBeInTheDocument();
    expect(tableElement).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByTestId('population-results')).toBeInTheDocument();
    });
  });
});
