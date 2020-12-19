import React from 'react';

import './button.scss';

type IButton = {
  title: string
  disabled?: boolean
  classNames?: string
  onClick: () => void | Promise<void>
}

function Button({ title, onClick, classNames = '', disabled = false }: IButton) {

  function click() {
    if (!disabled) onClick();
  }

  return (
    <button
      onClick={click}
      className={`mainButton ${classNames} ${disabled ? 'disabledButton' : ''}`}
    >
      <h3>{title}</h3>
    </button>
  )
}

export default Button;
