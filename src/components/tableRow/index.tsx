import React, {
  useState,
  ReactNode,
  useEffect,
  useContext,
  useCallback
} from 'react';
import { formatStringNumber } from '../../utils/format';
import { MainContext } from '../../contexts/mainContext';
import CircularProgress from '@material-ui/core/CircularProgress';

import './tableRow.scss';

type ITableRow = {
  person: Person
}

function TableRow({ person }: ITableRow) {
  const {
    state: {
      planetsMap,
      planetsLoading
    }
  } = useContext(MainContext);
  const [planet, setPlanet] = useState<Planet | null>(null);

  const checkForPlanet = useCallback(() => {
    const planet = planetsMap.get(person.homeworld);
    if (planet) setPlanet(planet);
  }, [person, planetsMap])

  useEffect(() => {
    checkForPlanet();
  }, [checkForPlanet]);

  function getHomeworldName(): ReactNode | string {
    if (planet) {
      return planet.name;
    } else if (!planetsLoading) {
      return 'Not found';
    } else {
      return <CircularProgress size='1.5em' />
    }
  }

  function getHomeworldPopulation(): ReactNode | string {
    if (planet) {
      return formatStringNumber(planet.population);
    } else if (!planetsLoading) {
      return 'Not found';
    } else {
      return <CircularProgress size='1.5em' />
    }
  }

  return (
    <tr className="personRow">
      <td data-testid='row-name-cell'>
        { person.name }
      </td>
      <td data-testid='row-birth-cell'>
        { person.birth_year }
      </td>
      <td data-testid='row-planet-cell'>
        {getHomeworldName()}
      </td>
      <td data-testid='row-population-cell'>
        {getHomeworldPopulation()}
      </td>
    </tr>
  )
}

export default TableRow;
