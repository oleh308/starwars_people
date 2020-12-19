import React, { ReactNode } from 'react';
import TableRow from './index';
import { people, planetsMap } from '../../data/testData';
import { render, screen, fireEvent } from '@testing-library/react';
import { MainProvider, reducerInit } from '../../contexts/mainContext';


describe('TableRow testing', () => {
  const contextRender = (tableRow: ReactNode) => {
    const state = {
      ...reducerInit,
      people: people,
      planetsMap: planetsMap
    }

    return render(<MainProvider init={state}>{tableRow}</MainProvider>);
  }

  it('should have a basic row with no planet found', () => {
    render(
      <table>
        <tbody>
          <TableRow person={people[0]} />
        </tbody>
      </table>
    );

    const lisaElement = screen.getByText('Lisa');
    const noFoundElement1 = screen.getByTestId('row-planet-cell');
    const noFoundElement2 = screen.getByTestId('row-population-cell');

    expect(lisaElement).toBeInTheDocument();
    expect(noFoundElement1).toBeInTheDocument();
    expect(noFoundElement2).toBeInTheDocument();
  });

  it('should have a basic row with planet found', () => {
    contextRender(
      <table>
        <tbody>
          <TableRow person={people[0]} />
        </tbody>
      </table>
    );

    const lisaElement = screen.getByText('Lisa');
    const planetElement1 = screen.getByText('Earth');
    const populationElement2 = screen.getByText('7,000,000,000');

    expect(lisaElement).toBeInTheDocument();
    expect(planetElement1).toBeInTheDocument();
    expect(populationElement2).toBeInTheDocument();
  });
})
