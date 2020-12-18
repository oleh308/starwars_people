import React, { useContext } from 'react';
import axios from 'axios';
import { url } from './constants/api';
import Table from './components/table';
import { MainContext } from './contexts/mainContext';

import './App.scss';

function App() {
  const { state: { people }, dispatch } = useContext(MainContext);

  async function fetchData(): Promise<void> {
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
      <button onClick={fetchData}>Fetch</button>
      <Table />
      <h3>{people.length}</h3>
    </div>
  );
}

export default App;
