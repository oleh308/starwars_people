import React, { ReactNode } from 'react';
import App from './App';
import { getPeople } from "./api/people";
import { getPlanets } from './api/planets';
import { people, planets, planetsMap } from './data/testData';
import { MainProvider, reducerInit } from './contexts/mainContext';
import { render, screen, fireEvent, waitFor, cleanup } from '@testing-library/react';

jest.mock("./api/people");
jest.mock("./api/planets");

describe('App testing', () => {
  afterEach(cleanup);

  beforeEach(() => {
    getPeople.mockImplementation(({ search, nextUrl }: ApiParams) => {
      const maxPerPage = 1;
      if (search) {
        const data = people.filter((person: Person) => (
          person.name.toLowerCase().includes(search.toLowerCase())
        ));

        return {
          data: {
            previous: null,
            results: [data[0]],
            next: data.length > maxPerPage ? '/nextpage' : null
          }
        }
      } else if (nextUrl === '/nextpage') {
        return {
          data: {
            next: null,
            previous: '/prevpage',
            results: [people[1]]
          }
        }
      } else if (nextUrl === '/prevpage') {
        return {
          data: {
            previous: null,
            next: '/nextpage',
            results: [people[0]],
          }
        }
      } else {
        return {
          data: {
            previous: null,
            next: '/nextpage',
            results: [people[0]]
          }
        }
      }
    });

    getPlanets.mockResolvedValueOnce({
      data: {
        next: null,
        previous: null,
        results: planets
      }
    });
  });

  const contextRender = (app: ReactNode) => {
    return render(
      <MainProvider init={reducerInit}>
        {app}
      </MainProvider>
    );
  }

  it('Must render initial state of App component', () => {
    render(
      <App />
    );

    const loadElement = screen.getByText('Load data');
    expect(loadElement).toBeInTheDocument();

    const noContentElement = screen.getByText('No content');
    expect(loadElement).toBeInTheDocument();
  });


  it('Must render App component and load mock data', async () => {
    const { container, debug } = contextRender(
      <App />
    );

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

    expect(container.querySelectorAll('.personRow').length).toBe(1);

    const nextElement = screen.getByTestId('button-next');
    const prevElement = screen.getByTestId('button-previous');


    expect(nextElement).not.toBeDisabled();
    expect(prevElement).toBeDisabled();
  });

  it('Must render App component and navigate between pages', async () => {
    const { container, debug } = contextRender(
      <App />
    );

    const loadElement = screen.getByTestId('button-loaddata');
    fireEvent.click(loadElement);

    expect(getPeople).toHaveBeenCalledTimes(1);
    expect(getPlanets).toHaveBeenCalledTimes(1);

    await waitFor(() => {
      expect(screen.getByTestId('population-results')).toBeInTheDocument();
    });

    expect(container.querySelectorAll('.personRow').length).toBe(1);

    const nextElement = screen.getByTestId('button-next');
    const prevElement = screen.getByTestId('button-previous');

    expect(prevElement).toBeDisabled();

    fireEvent.click(nextElement);

    await waitFor(() => {
      expect(screen.getByTestId('population-results')).toBeInTheDocument();
    });

    expect(getPeople).toHaveBeenCalledTimes(2);

    expect(prevElement).not.toBeDisabled();
    expect(nextElement).toBeDisabled();

    fireEvent.click(prevElement);

    await waitFor(() => {
      expect(screen.getByTestId('population-results')).toBeInTheDocument();
    });

    expect(getPeople).toHaveBeenCalledTimes(3);

    expect(prevElement).toBeDisabled();
    expect(nextElement).not.toBeDisabled();
  });

  it('Must render App component and search for data', async () => {
    const { container, debug } = contextRender(
      <App />
    );

    const loadElement = screen.getByTestId('button-loaddata');
    fireEvent.click(loadElement);

    expect(getPeople).toHaveBeenCalledTimes(1);
    expect(getPlanets).toHaveBeenCalledTimes(1);

    await waitFor(() => {
      expect(screen.getByTestId('population-results')).toBeInTheDocument();
    });

    const searchElement = screen.getByTestId('search-input');
    const searchButtonElement = screen.getByTestId('search-button');
    fireEvent.change(searchElement, { target: { value: 'li' } });
    fireEvent.click(searchButtonElement);

    await waitFor(() => {
      expect(screen.getByTestId('population-results')).toBeInTheDocument();
    });

    expect(container.querySelectorAll('.personRow').length).toBe(1);

    const nextElement = screen.getByTestId('button-next');
    const prevElement = screen.getByTestId('button-previous');

    expect(prevElement).toBeDisabled();
    expect(nextElement).toBeDisabled();
  });
});
