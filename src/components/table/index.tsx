import React from 'react';
import TableRow from '../tableRow';
import TableFooter from '../tableFooter';

import './table.scss';

type ITable = {
  classNames?: string
}

const headers = ['Name', 'Birth Year', 'Homeworld Name', 'Homeworld Population'];

function Table({ classNames }: ITable) {
  return (
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
      <tbody>
        <TableRow />
        <TableRow />
        <TableRow />
      </tbody>
      <TableFooter />
    </table>
  )
}

export default Table;
