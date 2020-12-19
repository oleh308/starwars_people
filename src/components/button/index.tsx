import React from 'react';

import './button.scss';

type IButton = {
  title: string
  classNames?: string
  onClick: () => void | Promise<void>
}

function Button({ title, onClick, classNames = '' }: IButton) {
  return (
    <button
      onClick={onClick}
      className={`mainButton ${classNames}`}
    >
      <h3>{title}</h3>
    </button>
  )
}

export default Button;
