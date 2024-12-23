import React from 'react'
import './Checkout.css'
import CheckoutHeader from './CheckoutHeader'
import CheckoutAddress from './CheckoutAddress'
import { Link } from 'react-router-dom'

const Checkout = () => {
    return (
        <div className='checkout'>
            <CheckoutHeader />

            <div className='checkout__wrapper'>
                <CheckoutAddress />

                <div>
                    <div>
                        <button>Use this address</button>
                    </div>

                    <p>Choose an address to continue checking out. You will still have a chance to review and edit your order before it is final.</p>

                    <div className="line-break"></div>

                    <div>
                        <h1>Order Summary</h1>

                        <div>
                            <p>Items:</p>
                            <p>--</p>
                        </div>

                        <div>
                            <p>Delivery:</p>
                            <p>--</p>
                        </div>

                        <div className="line-break"></div>

                        <h1>Order Total: 2,511.00</h1>

                        <div className="line-break"></div>
                    </div>

                    <div>
                        <Link>How are delivery costs calculated?</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Checkout