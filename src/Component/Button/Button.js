import React from 'react'
import "./Button.css"
const Button = ({name,onClick}) => {
  return (
    <div className='Button'>


    <button onClick={onClick} className="button button--bestia">
    <div className="button__bg"></div><span>{name}</span>
</button>
    </div>
  )
}

export default Button