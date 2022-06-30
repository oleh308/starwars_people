import React, { ReactNode } from 'react';
import TableFooter from './index';
import { people, planetsMap } from '../../data/testData';
import { MainProvider, reducerInit } from '../../contexts/mainContext';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';

describe('TableFooter testing', () => {
  afterEach(cleanup);

  const contextRender = (tableFooter: ReactNode, isEmpty: boolean) => {
    const state = {
      ...reducerInit,
      people: people,
      planetsMap: isEmpty ? new Map() : planetsMap
    }

    return render(<MainProvider init={state}>{tableFooter}</MainProvider>);
  }

  it('Must render all inner components of footer and calculate right amount', () => {
    contextRender(
      <table>
        <TableFooter />
      </table>
    );

    const labelElement = screen.getByText('Total Population');
    const amountElement = screen.getByText('7,000,000,000');

    expect(labelElement).toBeInTheDocument();
    expect(amountElement).toBeInTheDocument();
  });

  it('Must render all inner components of footer and show no planets', () => {
    contextRender(
      <table>
        <TableFooter />
      </table>,
      true
    );

    const labelElement = screen.getByText('Total Population');
    const amountElement = screen.getByText('No planets');

    expect(labelElement).toBeInTheDocument();
    expect(amountElement).toBeInTheDocument();
  });
})
