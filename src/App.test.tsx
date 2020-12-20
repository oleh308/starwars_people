import React, { ReactNode } from 'react';
import App from './App';
import { getPeople } from "./api/people";
import { getPlanets } from './api/planets';
import { people, planets, planetsMap } from './data/testData';
import { MainProvider, reducerInit } from './contexts/mainContext';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

jest.mock("./api/people");
jest.mock("./api/planets");

describe('App testing', () => {
  const contextRender = (app: ReactNode) => {
    return render(
      <MainProvider init={reducerInit}>
        {app}
      </MainProvider>
    );
  }

  it('Must render initial page', () => {
    render(
      <App />
    );

    const loadElement = screen.getByText('Load data');
    expect(loadElement).toBeInTheDocument();

    const noContentElement = screen.getByText('No content');
    expect(loadElement).toBeInTheDocument();
  });


  it('Must render initial page and load mock data', async () => {
    const { container, debug } = contextRender(
      <App />
    );

    getPeople.mockResolvedValueOnce({
      data: {
        next: null,
        previous: null,
        results: people
      }
    });

    getPlanets.mockResolvedValueOnce({
      data: {
        next: null,
        previous: null,
        results: planets
      }
    });

    const loadElement = screen.getByTestId('button-loaddata');
    fireEvent.click(loadElement);

    expect(getPeople).toHaveBeenCalledTimes(1);
    expect(getPlanets).toHaveBeenCalledTimes(1);

    const tableElement = screen.getByTestId('table-container');
    const searchElement = screen.getByTestId('search-container');
    const refreshElement = screen.getByText('Refresh data');

    expect(tableElement).toBeInTheDocument();
    expect(searchElement).toBeInTheDocument();
    expect(refreshElement).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByTestId('population-results')).toBeInTheDocument();
    });
    expect(container.querySelectorAll('.personRow').length).toBe(2);

    const nextElement = screen.getByTestId('button-next');
    const prevElement = screen.getByTestId('button-previous');

    expect(nextElement).toBeDisabled();
    expect(prevElement).toBeDisabled();
  });
});
