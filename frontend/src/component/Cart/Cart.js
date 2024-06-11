import React, { useEffect, useState } from 'react'
import CartItem from './CartItem'
import './Cart.css'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

// const cartItem = {
//   id: '66644a3088755f9baffccd62',
//   img: 'https://m.media-amazon.com/images/I/91VmSIbpHfL._AC_AA180_.jpg',
//   name: 'Gear Vintage2 28L Faux Leather Water Resistant Anti Theft Laptop Bag/Backpack for Men/Women-Navy',
//   price: 979,
//   quantity: 1
// }

const Cart = () => {

  const navigate = useNavigate()
  // const dispatch = useDispatch()

  const [subtotal, setSubtotal] = useState(0)

  const { cartItems } = useSelector(state => state.cart)

  const handleCartCheckout = () => navigate('/login?redirect=checkout')

  useEffect(() => {
    setSubtotal(cartItems.reduce((acc, cartItem) => acc + (cartItem.price * cartItem.quantity), 0))
  }, [cartItems])

  return (
    <>
      <div className='cart'>
        {
          cartItems.length ?
            <>
              <div className='cart__left'>
                <div>
                  <img className='cart__ad' src='https://www.thehoth.com/wp-content/uploads/2022/06/image10-1.png' alt='Advertisement' />

                  <h2 className='cart__title'>Shopping Cart</h2>

                  <div className='line-break'></div>


                  <div>
                    {
                      cartItems && cartItems.map(cartItem => <CartItem key={cartItem?.product} data={cartItem} />)
                    }
                  </div>

                  <h3>Subtotal (2 items): <strong><small>₹</small> {subtotal.toLocaleString('en-IN')}</strong></h3>
                </div>

                <p className='app_note'>
                The price and availability of items at Amazon.in are subject to change. The shopping cart is a temporary place to store a list of your items and reflects each item's most recent price. Do you have a promotional code? We'll ask you to enter your claim code when it's time to pay.
              </p>
              </div>
            </>
            :
            <div className='cart__empty'>
              <div>
                <h1>Your Amazone Cart is empty.</h1>

                <p>Check your Saved for later items below or <span><Link to='/'>continue shopping</Link></span>.</p>
              </div>

              <div>
                <h1>Your Items.</h1>

                <p>You have not yet saved any items for later.</p>
              </div>

              <p className='app_note'>
                The price and availability of items at Amazon.in are subject to change. The shopping cart is a temporary place to store a list of your items and reflects each item's most recent price. Do you have a promotional code? We'll ask you to enter your claim code when it's time to pay.
              </p>
            </div>

        }

        <div className='cart__right'>
          <div>
            <h3>Subtotal (2 items): <strong><small>₹</small> 1,999.00</strong></h3>

            <div className='cart__gift'>
              <input type='checkbox' />
              <span>This order conatins a gift</span>
            </div>

            <button className='button-new' onClick={handleCartCheckout}>Proceed to Buy</button>
          </div>
        </div>

      </div>


    </>
  )
}

export default Cart
