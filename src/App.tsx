import React, { useContext } from 'react';
import axios from 'axios';
import { url } from './constants/api';
import Table from './components/table';
import Button from './components/button';
import Search from './components/search';
import styles from './constants/sizes.module.scss';
import { MainContext } from './contexts/mainContext';

import './App.scss';

function App() {
  const { state: { people }, dispatch } = useContext(MainContext);

  async function fetchData(search?: string): Promise<void> {
    try {
      const people = (await axios.get(url + '/people')).data;
      const planets = (await axios.get(url + '/planets')).data;

      console.log(people);
      console.log(planets);
      dispatch({ type: 'updatePeople', people: people.results });
    } catch (error: any) {

    }
  }

  return (
    <div className="App">
      <header>
        <h1>Star Wars list</h1>
      </header>
      <main>
        <Button
          title={'Load data'}
          classNames={styles.margin}
          onClick={() => fetchData()}
        />
        <Search
          update={fetchData}
          classNames={styles.margin}
        />
        <Table
          classNames={styles.margin}
        />
      </main>
    </div>
  );
}

export default App;
