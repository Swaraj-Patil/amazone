import React from 'react'
import './utils.css'

const Button = ({ label = 'Button', onClick, disabled, inputProps = {} }) => {
    return (
        <button
            className='utils__button button-new'
            style={{ borderRadius: '100px', opacity: disabled ? 0.7 : 1, pointerEvents: disabled ? 'none' : '' }}
            type='button'
            onClick={onClick}
            disabled={disabled}
            {...inputProps}
        >{label}</button>
    )
}

export default Button