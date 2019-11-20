import React from 'react'
import './styles.scss'

function Button (props) {

  let disabled = props.disabled ? ' disabled' : ''
  let wideButtonClasses = 'btn btn-wide ' + props.color  + disabled
  let narrowButtonClasses = 'btn btn-narrow ' + props.color  + disabled

  const clickHandler  = props.disabled ? () => {} : props.onButtonClick;

  return (
    <button className={props.wideButton ? wideButtonClasses : narrowButtonClasses}
            onClick={() => {clickHandler(props.value)}}>
      {props.value}
    </button>)
}

export default Button
