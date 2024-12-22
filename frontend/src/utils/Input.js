import React from 'react'
import './utils.css'

const Input = ({ label = '', inputProps, value, onChange }) => {
    return (
        <div style={{
            color: '#0f1111',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            padding: '0 10px'
        }}>
            {label && <label htmlFor={inputProps.id} style={{ fontSize: '14px', fontWeight: 700, marginBottom: '3px' }}>{label}</label>}
            <input
                className='utils__input'
                value={value}
                onChange={event => onChange(event.target.value, inputProps.id || 'input')}
                {...inputProps}
            />
        </div>
    )
}

export default Input