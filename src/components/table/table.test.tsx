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

  it('should have a basic table', () => {
    contextRender(
      <Table />
    );

    const lisaElement = screen.getByText("Lisa");
    const bobElement = screen.getByText("Bob");

    expect(lisaElement).toBeInTheDocument();
    expect(bobElement).toBeInTheDocument();
  });
})
