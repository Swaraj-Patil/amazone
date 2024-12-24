import React, { useRef } from 'react'
import './Checkout.css'
import CheckoutHeader from './CheckoutHeader'
import CheckoutAddress from './CheckoutAddress'
import Button from '../../utils/Button'
import { useDispatch, useSelector } from 'react-redux'
import { setAccordion } from '../../redux/actions/paymentActions'
import { useNavigate } from 'react-router-dom'
import { createOrder } from '../../redux/actions/orderActions'
import { generateID } from '../../utils'

const Checkout = () => {

    const payButton = useRef(null)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { accordionExpanded } = useSelector(state => state.payment)
    const { cartItems, shippingInfo } = useSelector(state => state.cart)

    const itemsSubTotal = cartItems?.reduce((acc, item) => acc + (item.price * item.quantity), 0)
    const deliveryCharges = itemsSubTotal > 499 ? 0 : 70
    const tax = Math.round(itemsSubTotal * .18)
    const total = itemsSubTotal + deliveryCharges + tax

    const order = {
        shippingInfo,
        orderItems: cartItems,
        itemsPrice: itemsSubTotal,
        taxPrice: tax,
        shippingPrice: deliveryCharges,
        totalPrice: total,
        paymentInfo: {
            id: generateID(8),
            status: 'COD'
        }
    }

    const handleSubmit = () => {
        switch (accordionExpanded) {
            case 'address':
                dispatch(setAccordion('payment'))
                break

            case 'payment':
                dispatch(setAccordion('review'))
                break

            case 'review':
                console.log('order', order)
                payButton.current.disabled = true

                dispatch(createOrder(order))
                navigate('/orders/me')
                break
            default:
                return
        }
    }

    return (
        <div className='checkout'>
            <CheckoutHeader />

            <div className='checkout__wrapper'>
                <CheckoutAddress />

                <div style={{ marginLeft: '30px', width: '350px', height: 'max-content' }} className='checkout__summary'>
                    <div style={{}}>
                        <Button
                            label={`${accordionExpanded === 'address' ? 'Use this address' : accordionExpanded === 'payment' ? 'Use this payment method' : 'Place your order'}`}
                            onClick={handleSubmit}
                            inputProps={{
                                ref: payButton
                            }}
                        />
                    </div>

                    <p style={{ fontSize: '12px', textAlign: 'center', margin: '10px 0' }}>Continue to step 3 to finish checking out. You'll have a chance to review your order before it's final.</p>

                    <div className="line-break"></div>

                    <div>
                        <h3 style={{ fontSize: '18px', fontWeight: 700 }}>Order Summary</h3>

                        <div style={{ fontSize: '12px' }}>
                            <div className='app__between' style={{}}>
                                <p>Items:</p>
                                <p>₹{itemsSubTotal.toLocaleString()}</p>
                            </div>

                            <div className='app__between'>
                                <p>Tax:</p>
                                <p>₹{tax.toLocaleString()}</p>
                            </div>

                            <div className='app__between'>
                                <p>Delivery:</p>
                                <p>₹{deliveryCharges}</p>
                            </div>
                        </div>


                        <div className="line-break"></div>

                        <p style={{ fontSize: '18px', color: '#b12704', fontWeight: 700 }} className='app__between'><span>Order Total:</span> <span>₹{total.toLocaleString()}</span></p>

                        <div className="line-break"></div>
                    </div>

                    <div>
                        <a href='https://www.amazon.in/gp/help/customer/display.html/ref=chk_help_shipcosts_pri?nodeId=GRK3YG3G4Y3R4LWJ&ie=UTF8&ref_=chk_help_shipcosts_pri' target='_blank' rel='noreferrer' className='app__link' style={{ fontSize: '12px' }}>How are delivery costs calculated?</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Checkout