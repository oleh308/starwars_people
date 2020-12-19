import React, { useState, SyntheticEvent, KeyboardEvent } from 'react';
import Button from '../button';

import './search.scss';

type ISearch = {
  classNames?: string
  update: (search?: string) => void | Promise<void>
}

function Search({ update, classNames = '' }: ISearch) {
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

  }

  function previous() {

  }

  return (
    <div className={`searchWrapper ${classNames}`}>
      <div className='inputWrapper'>
        <input
          type='text'
          value={search}
          onChange={onChange}
          onKeyPress={onKeyPress}
        />
        <button onClick={() => update(search)}>Search</button>
      </div>
      <Button
        title='Previous'
        onClick={previous}
      />
      <Button
        title='Next'
        onClick={next}
      />
    </div>
  )
}

export default Search;
