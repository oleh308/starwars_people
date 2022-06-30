import React, { ReactNode } from 'react';
import TableRow from './index';
import { people, planetsMap } from '../../data/testData';
import { MainProvider, reducerInit } from '../../contexts/mainContext';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';

describe('TableRow testing', () => {
  afterEach(cleanup);

  const contextRender = (tableRow: ReactNode) => {
    const state = {
      ...reducerInit,
      people: people,
      planetsMap: planetsMap
    }

    return render(<MainProvider init={state}>{tableRow}</MainProvider>);
  }

  it('Must render a row with no home planet found', () => {
    render(
      <table>
        <tbody>
          <TableRow person={people[0]} />
        </tbody>
      </table>
    );

    const lisaElement = screen.getByText('Lisa');
    const birthElement = screen.getByText('year');
    const notFoundElements = screen.getAllByText('Not found');

    expect(notFoundElements.length).toBe(2);
    expect(lisaElement).toBeInTheDocument();
    expect(birthElement).toBeInTheDocument();
  });

  it('Must render a row with home planet found', () => {
    contextRender(
      <table>
        <tbody>
          <TableRow person={people[0]} />
        </tbody>
      </table>
    );

    const lisaElement = screen.getByText('Lisa');
    const birthElement = screen.getByText('year');
    const planetElement = screen.getByText('Earth');
    const populationElement = screen.getByText('7,000,000,000');

    expect(lisaElement).toBeInTheDocument();
    expect(birthElement).toBeInTheDocument();
    expect(planetElement).toBeInTheDocument();
    expect(populationElement).toBeInTheDocument();
  });
})
