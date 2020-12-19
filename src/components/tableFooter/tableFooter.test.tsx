import React, { ReactNode } from 'react';
import TableFooter from './index';
import { people, planetsMap } from '../../data/testData';
import { render, screen, fireEvent } from '@testing-library/react';
import { MainProvider, reducerInit } from '../../contexts/mainContext';

describe('TableFooter testing', () => {
  const contextRender = (tableFooter: ReactNode, isEmpty: boolean) => {
    const state = {
      ...reducerInit,
      people: people,
      planetsMap: isEmpty ? new Map() : planetsMap
    }

    return render(<MainProvider init={state}>{tableFooter}</MainProvider>);
  }

  it('should have a basic table footer', () => {
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

  it('should have a amount as no planets', () => {
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
