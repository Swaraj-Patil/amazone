import React, { Children, cloneElement, useState } from 'react'
import './utils.css'
import { KeyboardArrowDown } from '@mui/icons-material'

const Dropdown = ({
    label = '',
    inputProps,
    value,
    valueKey = '',
    displayKey = '',
    onChange,
    children
}) => {

    const [focus, setFocus] = useState(false)

    const handleSelectChange = event => {
        const selectedValue = event.target.value
        const selectedOption = children.find(child => child.props.value == selectedValue)

        if (selectedOption) {
            onChange(selectedOption.props.data, inputProps.id || 'dropdown')
        }
    }
    return (
        <div
            style={{
                color: '#0f1111',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                padding: '0 10px'
            }}>
            {label && <label htmlFor={inputProps.id} style={{ fontSize: '14px', fontWeight: 700, marginBottom: '3px' }}>{label}</label>}
            <div className='app__center' style={{ position: 'relative' }}>
                <select
                    className='utils__input utils__dropdown'
                    value={value ? value[valueKey] : ''}
                    onChange={handleSelectChange}
                    onFocus={() => setFocus(true)}
                    onBlur={() => setFocus(false)}
                    {...inputProps}
                >
                    <option value="" disabled hidden>
                        {inputProps.placeholder || 'Please select an option'}
                    </option>
                    {children && Children.map(children, child =>
                        cloneElement(child, {
                            value: child.props.value
                        })
                    )}
                </select>
                <span
                    style={{
                        color: '#666',
                        position: 'absolute',
                        zIndex: 10,
                        right: 6,
                        top: focus ? '0' : '2px',
                        rotate: focus ? '180deg' : '',
                        transition: 'all 200ms ease'
                    }}
                ><KeyboardArrowDown /></span>
            </div>
        </div>
    )
}

export default Dropdown