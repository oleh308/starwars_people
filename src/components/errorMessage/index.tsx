import React from 'react';

import './errorMessage.scss';

type IErrorMessage = {
  error: string
  remove: () => void
  classNames?: string
}

function ErrorMessage({ error, classNames = '', remove }: IErrorMessage) {
  return (
    <div className={`errorMessage ${classNames}`}>
      <p>{error}</p>
      <button onClick={remove}>Remove</button>
    </div>
  );
}

export default ErrorMessage;
