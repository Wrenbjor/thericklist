// Button Component

import React from 'react';

type ButtonProps = {
  id: number;
  label: string;
  onClick: (id: number) => void;
  disabled?: boolean;
  className?: string;
};

const Button: React.FC<ButtonProps> = ({ id, label, onClick, disabled, className }) => {
    return (
      <button 
        onClick={() => onClick(id)} 
        disabled={disabled}
        className={className ? className : "px-3 py-3 text-sm font-semibold bg-indigo-500 text-white rounded-full hover:bg-indigo-600 focus:outline-none"}
      >
        {label}
      </button>
    );
  };

export default Button;
