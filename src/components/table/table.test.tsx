import React, { ReactNode } from 'react';
import Table from './index';
import { people, planetsMap } from '../../data/testData';
import { render, screen, fireEvent } from '@testing-library/react';
import { MainProvider, reducerInit } from '../../contexts/mainContext';

describe('Table testing', () => {
  const contextRender = (table: ReactNode) => {
    const state = {
      ...reducerInit,
      people: people,
      planetsMap: planetsMap
    }

    return render(<MainProvider init={state}>{table}</MainProvider>);
  }

  it('Must render a table', () => {
    const { container } = contextRender(
      <Table />
    );

    const bobElement = screen.getByText('Bob');
    const lisaElement = screen.getByText('Lisa');
    const planet1Element = screen.getByText('Earth');
    const planet2Element = screen.getByText('Mars');

    expect(container.querySelectorAll('.personRow').length).toBe(2);
    expect(lisaElement).toBeInTheDocument();
    expect(bobElement).toBeInTheDocument();
    expect(planet1Element).toBeInTheDocument();
    expect(planet2Element).toBeInTheDocument();
  });
})
