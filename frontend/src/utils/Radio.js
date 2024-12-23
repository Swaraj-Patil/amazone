import React from 'react'


const Radio = ({
    label,
    labelPosition = 'right',
    checked,
    onChange,
    disabled = false,
    value,
    inputProps = {}
}) => {
    return (
        <div
            style={{
                position: 'relative',
                width: '100%',
                display: 'flex',
                columnGap: '4px',
                opacity: disabled ? '0.6' : '1',
                cursor: disabled ? 'default' : 'pointer',
            }}
            onClick={disabled ? undefined : onChange}
        >

            <input
                type="radio"
                name={inputProps.name || 'radio'}
                value={value}
                checked={checked}
                onChange={onChange}
                className="sr-only"
                disabled={disabled}
            />
            <div
                className='prevent-select app__center'
                style={{
                    width: '16px',
                    height: '16px',
                    borderRadius: '100%',
                    border: `1px solid ${checked ? '#007185' : 'grey'}`,
                    backgroundColor: checked ? '#007185' : 'white',
                    order: labelPosition ? '1' : 'unset',
                    position: 'absolute',
                    top: '50%',
                    transform: 'translateY(-50%)'
                }}
            >
                {checked && (
                    <div style={{ height: '8px', width: '8px', borderRadius: '100%', backgroundColor: 'white' }} />
                )}
            </div>

            {labelPosition && (
                <span style={{ marginLeft: '10px', width: '100%' }}>
                    {label}
                </span>
            )}

        </div>
    );
};

export default Radio
