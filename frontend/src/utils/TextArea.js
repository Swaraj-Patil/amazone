import React from 'react'
import './utils.css'

const TextArea = ({ label = '', inputProps = {}, value, onChange }) => {
    return (
        <div style={{
            color: '#0f1111',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            padding: '0 10px'
        }}>
            {label && <p style={{ fontSize: '14px', fontWeight: 700, marginBottom: '3px' }}>{label}</p>}
            <textarea
                rows={4}
                cols={40}
                className='utils__input'
                style={{ height: 'unset', resize: 'none' }}
                value={value}
                onChange={event => onChange(event.target.value, inputProps.id || 'textarea')}
                {...inputProps}
            />
        </div>
    )
}

export default TextArea