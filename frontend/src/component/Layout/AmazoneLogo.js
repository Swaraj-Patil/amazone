import React from 'react'
import { logoDark } from '../../assets'
import { Link } from 'react-router-dom'

const AmazoneLogo = () => {

  const logoStyles = {
    margin: '20px auto',
    objectFit: 'contain',
    width: 100
  }
  
  return (
    <Link to='/'>
      <div style={{ display: 'flex', backgroundColor: 'white' }}>
        <img style={ logoStyles } src={logoDark} alt='AMAZONE' />
      </div>
    </Link>
  )
}

export default AmazoneLogo
