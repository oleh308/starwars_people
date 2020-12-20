import React, { useContext, ReactNode } from 'react';
import TableRow from '../tableRow';
import TableFooter from '../tableFooter';
import { MainContext } from '../../contexts/mainContext';
import CircularProgress from '@material-ui/core/CircularProgress';

import './table.scss';

type ITable = {
  classNames?: string
}

const headers = ['Name', 'Birth Year', 'Homeworld Name', 'Homeworld Population'];

function Table({ classNames }: ITable) {
  const {
    state: {
      people,
      peopleLoading,
    }
  } = useContext(MainContext);

  function getContent(): ReactNode | ReactNode[] {
    if (peopleLoading) {
      return (
        <tr>
          <td className="loadingRow" colSpan={headers.length}>
            <div className="loadingWrapper">
              <CircularProgress />
            </div>
          </td>
        </tr>
      )
    } else {
      return people.map((person: Person, i: number) => (
        <TableRow key={i} person={person} />
      ));
    }
  }

  return (
    <div className='tableWrapper' data-testid='table-container'>
      <table className={`peopleTable ${classNames}`}>
        <thead>
          <tr>
            {headers.map((name: string, i: number) => (
              <th key={i}>
                <h3>{name}</h3>
              </th>
            ))}
          </tr>
        </thead>
        <tbody data-testid='table-body'>
          {getContent()}
        </tbody>
        <TableFooter />
      </table>
    </div>
  )
}

export default Table;
