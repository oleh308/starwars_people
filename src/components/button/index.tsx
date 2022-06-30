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
      disabled={disabled}
      className={`mainButton ${classNames}`}
      data-testid={`button-${title.replace(/\s/g, '').toLowerCase()}`}
    >
      <h3>{title}</h3>
    </button>
  )
}

export default Button;
