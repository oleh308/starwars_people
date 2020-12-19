import React, { useContext, useState } from 'react';
import axios from 'axios';
import { url } from './constants/api';
import Table from './components/table';
import Button from './components/button';
import Search from './components/search';
import styles from './constants/sizes.module.scss';
import { MainContext } from './contexts/mainContext';

import './App.scss';

function App() {
  const {
    state: {
      planetsMap
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
      const requestUrl = nextUrl ? nextUrl : url + `/people${search ? '/?search=' + search : ''}`;

      const people = (await axios.get(requestUrl)).data;

      dispatch({
        type: 'updatePeople',
        people: people.results,
        nextPeople: people.next,
        previousPeople: people.previous
      });
    } catch (error: any) {

    }
  }

  async function fetchPlanets(nextUrl?: string) {
    if (!nextUrl) dispatch({ type: 'requestPlanets' });

    try {
      const requestUrl = nextUrl ? nextUrl : url + '/planets';
      const planets = (await axios.get(requestUrl)).data;

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

    }
  }

  function getContent() {
    if (initialLoad) {
      return (
        <main>
          <Button
            title={'Load data'}
            classNames={styles.margin}
            onClick={() => fetchData()}
          />
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
