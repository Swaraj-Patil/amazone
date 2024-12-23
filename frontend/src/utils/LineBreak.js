import React from 'react'

const LineBreak = ({ marginLeft = 0, marginRight = 0, marginTop = 0, marginBottom = 0 }) => {
    return (
        <div style={{ marginLeft, marginRight, marginTop, marginBottom, backgroundColor: '#d5d9d9', height: '1px', width: '100%' }} />
    )
}

export default LineBreak