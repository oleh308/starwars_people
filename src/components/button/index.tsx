import React from 'react';

import './button.scss';

type IButton = {
  title: string
  disabled?: boolean
  classNames?: string
  onClick: () => void | Promise<void>
}

function Button({ title, onClick, classNames = '', disabled = false }: IButton) {
  return (
    <button
      onClick={onClick}
      className={`mainButton ${classNames} ${disabled ? 'disabledButton' : ''}`}
    >
      <h3>{title}</h3>
    </button>
  )
}

export default Button;
