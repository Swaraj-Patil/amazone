import React, { useState } from 'react'
import Radio from './Radio'

const RadioGroup = ({
    options,
    name,
    onChange,
    defaultValue = '',
    labelPosition = 'right',
}) => {
    const [selectedValue, setSelectedValue] = useState(defaultValue)

    const handleChange = (value) => {
        setSelectedValue(value)
        onChange(value) // Notify parent of the new selected value
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', rowGap: '12px' }}>
            {options.map((option) => (
                <Radio
                    labelPosition={labelPosition}
                    key={option.value}
                    label={option.label}
                    name={name}
                    value={option.value}
                    checked={selectedValue === option.value}
                    onChange={() => handleChange(option.value)}
                    disabled={option.disabled}
                />
            ))}
        </div>
    );
};

export default RadioGroup;
