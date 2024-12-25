import React from 'react'
import ad1 from '../../assets/ad1.jpg'

const AdCard = () => {
    return (
        <div style={{ width: 710, height: 430, overflow: 'hidden', margin: 14, position: 'relative', color: 'white' }}>
            <img src={ad1} alt="ad1" />
            <div style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                top: 0,
                left: 0,
                background: "linear-gradient(0deg, rgba(0,0,0,0) 0%, rgba(255,255,255,0) 15%, rgba(255,255,255,0) 80%, rgba(0,0,0,1) 100%)"
            }}></div>

            <div style={{
                padding: '10px 20px',
                position: 'absolute',
                left: 0,
                top: 0,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '100%'
            }}>
                <div>
                    <h2 style={{
                        fontSize: 21
                    }}>Prime Video: Recommended for you</h2>
                    <p style={{ fontSize: 15 }}>Bandish Bandits - Season 1</p>
                </div>

            </div>
            <p style={{ fontSize: 13, position: 'absolute', left: 0, bottom: 0, padding: '10px 20px', }}>Start watching on Prime Video</p>
        </div>
    )
}

export default AdCard