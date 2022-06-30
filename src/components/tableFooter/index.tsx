import React, { useContext, ReactNode } from 'react';
import { formatStringNumber } from '../../utils/format';
import { MainContext } from '../../contexts/mainContext';
import CircularProgress from '@material-ui/core/CircularProgress';

import './tableFooter.scss';

function TableFooter() {
  const {
    state: {
      planetsMap,
      planetsLoading
    }
  } = useContext(MainContext);

  function getPopulation(): ReactNode {
    if (planetsLoading) {
      return <CircularProgress size='1.5em' />
    } else {
      let amountOfUnknown = 0;
      const planets = Array.from(planetsMap.values());

      const totalPopulation = planets.reduce((acc: number, planet: Planet) => {
        if (isNaN(Number(planet.population))) {
          amountOfUnknown++;
          return acc;
        } else {
          return Number(planet.population) + acc;
        };
      }, 0);

      if (planets.length === 0) {
        return (
          <div className="populationResults" data-testid='population-results'>
            <h3>No planets</h3>
          </div>
        );
      } else {
        return (
          <div className="populationResults" data-testid='population-results'>
            <h4>{formatStringNumber(String(totalPopulation))}</h4>
            {amountOfUnknown > 0 && <span>{`(${amountOfUnknown} planets unknown)`}</span>}
          </div>
        );
      }
    }
  }

  return (
    <tfoot className='populationFooter'>
      <tr>
        <td></td>
        <td></td>
        <td className='populationLabel'>
          <h4>Total Population</h4>
        </td>
        <td className='populationAmount'>
          {getPopulation()}
        </td>
      </tr>
    </tfoot>
  )
}

export default TableFooter;
