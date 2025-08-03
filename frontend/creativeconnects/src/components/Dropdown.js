import React, { useState } from 'react';
import '../styles/Dropdown.css'

const Dropdown = ({ icon: Icon, text, options }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div className="Maindropdown">
      <div onClick={toggleDropdown}>
        {Icon && <Icon className="icon" />}
  
        <span>{text}</span>
      </div>
      {isOpen && (
        <div className="Maindropdown-menu">
          {options.map((option, index) => (
            <div
              key={index}
              className="Maindropdown-item"
              onClick={option.onClick}
            >
              {option.icon && <option.icon className="icon" />}
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
