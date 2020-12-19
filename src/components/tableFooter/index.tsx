import React from 'react';

import './tableFooter.scss';

function TableFooter() {
  return (
    <tfoot className="populationFooter">
      <tr>
        <td></td>
        <td></td>
        <td className="populationLabel">
          <h4>Total Population</h4>
        </td>
        <td className="populationAmount">Amount</td>
      </tr>
    </tfoot>
  )
}

export default TableFooter;
