import React from 'react'
import './utils.css'

const Button = ({ label = 'Button', onClick, disabled, inputProps = {}, type = 'primary' }) => {
    return (
        <button
            className={`utils__button ${type === 'primary' ? 'button-new' : 'button-secondary'}`}
            style={{ borderRadius: '100px', opacity: disabled ? 0.7 : 1, pointerEvents: disabled ? 'none' : '' }}
            type='button'
            onClick={onClick}
            disabled={disabled}
            {...inputProps}
        >{label}</button>
    )
}

export default Button