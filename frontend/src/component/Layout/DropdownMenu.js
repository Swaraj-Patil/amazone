import React, { useState } from 'react'

const DropdownMenu = () => {

    const [selectedSort, setSelectedSort] = useState('featured')

    const divStyle = {
        position: 'relative',
        fontSize: 11,
        textShadow: '0.05em 0.05em rgba(0, 0, 0, 0.2)'
    }

    const labelStyle = {
        position: 'absolute',
        left: 5,
        top: '50%',
        transform: 'translateY(-50%)',
        padding: '0 2px',
        zIndex: 1,
        pointerEvents: 'none'
    }

    const selectStyle = {
        height: 'unset',
        padding: '5px 2px 5px 45px',
        borderRadius: 8,
        boxShadow: '0 2px 5px rgba(15,17,17,.15)',
        fontSize: 11,
        textShadow: '0.05em 0.05em rgba(0, 0, 0, 0.2)',
        outline: 'none'
    }

    return (
        <div style={divStyle}>
            <label 
                htmlFor='sort' 
                style={ labelStyle }
                // onClick={}
            >Sort by: </label>
            <select 
                id='sort' 
                value={selectedSort} 
                onChange={e => setSelectedSort(e.target.value)} 
                className='button-secondary' 
                style={ selectStyle }
            >
                <option value='featured'>Featured</option>
                <option value='priceLow'>Price: Low to High</option>
                <option value='priceHigh'>Price: High to Low</option>
                <option value='average'>Avg. Customer Review</option>
                <option value='newest'>Newest Arrival</option>
            </select>
        </div>
    )
}

export default DropdownMenu
