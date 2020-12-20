import React, { useContext, useState, ReactNode } from 'react';
import Table from './components/table';
import Button from './components/button';
import Search from './components/search';
import { getPeople } from './api/people';
import { getPlanets } from './api/planets';
import ErrorMessage from './components/errorMessage';
import { MainContext } from './contexts/mainContext';

import './App.scss';
import styles from './constants/sizes.module.scss';

function App() {
  const {
    state: {
      planetsMap,
      peopleError,
      planetsError
    },
    dispatch
  } = useContext(MainContext);
  const [initialLoad, setInitialLoad] = useState<boolean>(true);

  function fetchData() {
    if (initialLoad) setInitialLoad(false);
    fetchPeople();
    fetchPlanets();
  }

  async function fetchPeople(search?: string, nextUrl?: string) {
    dispatch({ type: 'requestPeople' });

    try {
      const people = (await getPeople(search, nextUrl)).data;

      dispatch({
        type: 'updatePeople',
        people: people.results,
        nextPeople: people.next,
        previousPeople: people.previous
      });
    } catch (error: any) {
      dispatch({
        type: 'failurePeople',
        error: 'An error occurred while getting a list of people. Please try again later.'
      });
    }
  }

  async function fetchPlanets(nextUrl?: string) {
    if (!nextUrl) dispatch({ type: 'requestPlanets' });

    try {
      const planets = (await getPlanets(nextUrl)).data;

      planets.results.forEach((planet: Planet) => {
        planetsMap.set(planet.url, planet);
      });

      dispatch({
        type: 'updatePlanets',
        planetsMap: planetsMap
      });

      if (planets.next) fetchPlanets(planets.next);
      else dispatch({ type: 'planetsFinished' });
    } catch (error: any) {
      dispatch({
        type: 'failurePlanets',
        error: 'An error occurred while getting a list of planets. Please try again later.'
      });
    }
  }

  function getErrors(): ReactNode[] {
    return [
      peopleError && <ErrorMessage
                key={0}
                error={peopleError}
                classNames={styles.margin}
                remove={() => dispatch({ type: 'removePeopleError' })}
              />,
      planetsError && <ErrorMessage
                key={1}
                error={planetsError}
                classNames={styles.margin}
                remove={() => dispatch({ type: 'removePlanetsError' })}
              />
    ];
  }

  function getContent(): ReactNode {
    if (initialLoad) {
      return (
        <main>
          <Button
            title={'Load data'}
            classNames={styles.margin}
            onClick={() => fetchData()}
          />
          {getErrors()}
          <h2 className='noContent'>No content</h2>
        </main>
      );
    } else {
      return (
        <main>
          <Button
            title={'Refresh data'}
            classNames={styles.margin}
            onClick={() => fetchData()}
          />
          {getErrors()}
          <Search
            update={fetchPeople}
            classNames={styles.margin}
          />
          <Table
            classNames={styles.margin}
          />
        </main>
      );
    }
  }

  return (
    <div className='App'>
      <header>
        <h1>Star Wars list</h1>
      </header>
      {getContent()}
    </div>
  );
}

export default App;
