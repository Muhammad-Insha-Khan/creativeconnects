import React from 'react'
import '../styles/InputField.css'


const InputField = ({ type = 'text', id, name, value, placeholder, onChange, className = '', required = false }) => {
  return (
    <div className='form-group'>
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        required={required}
        className={`input ${className}`}

      />
    </div>
  )
}

export default InputField
