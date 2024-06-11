import React from 'react'
import { logoDark } from '../../assets'
import { LockRounded } from '@mui/icons-material'

const CheckoutHeader = () => {
  return (
    <nav>
        <div>
            <img src={logoDark} alt="" />
        </div>

        <h1>Checkout</h1>

        <LockRounded
            style={{
                color: 'grey',
                fontSize: '26px'
            }}
        />
    </nav>
  )
}

export default CheckoutHeader