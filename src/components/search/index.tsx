import React, {
  useState,
  useContext,
  KeyboardEvent,
  SyntheticEvent
} from 'react';
import Button from '../button';
import { MainContext } from '../../contexts/mainContext';

import './search.scss';

type ISearch = {
  classNames?: string
  update: (search?: string, nextUrl?: string) => void | Promise<void>
}

function Search({ update, classNames = '' }: ISearch) {
  const { state: { nextPeople, previousPeople } } = useContext(MainContext);
  const [search, setSearch] = useState<string>('');

  function onChange(e: SyntheticEvent): void {
    const target = e.target as HTMLInputElement;

    setSearch(target.value.trim());
  }

  function onKeyPress(e: KeyboardEvent): void {
    if (e.key === 'Enter') {
      update(search);
    }
  }

  function next() {
    if (nextPeople) update('', nextPeople);
  }

  function previous() {
    if (previousPeople) update('', previousPeople);
  }

  return (
    <div className={`searchWrapper ${classNames}`}>
      <div className='inputWrapper'>
        <input
          type='text'
          value={search}
          onChange={onChange}
          onKeyPress={onKeyPress}
          placeholder='Search by name'
        />
        <button onClick={() => update(search)}>Search</button>
      </div>
      <Button
        title='Previous'
        onClick={previous}
        disabled={previousPeople ? false : true}
      />
      <Button
        title='Next'
        onClick={next}
        disabled={nextPeople ? false : true}
      />
    </div>
  )
}

export default Search;
