import React from 'react'
import '../styles/Button.css'

const Botton = ({type='button' , children , onClick }) => {
  return (
    <div>
        <button type={type} onClick={onClick}>{children}</button>
        </div>
  )
}

export default Botton
