import React from 'react'
import { Link } from 'react-router-dom'
import { primeIcon } from '../../assets'
import { MetaData } from '../Layout'
import { useDispatch } from 'react-redux'
import { addItemsToCart, removeFromCart } from '../../redux/actions/cartActions'

const quantities = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

const CartItem = ({ data }) => {
    const dispatch = useDispatch()

    const handleQuantityChange = event => {
        dispatch(addItemsToCart(data?.product, parseInt(event.target.value)))
    }

    const handleDeleteFromCart = () => {
        dispatch(removeFromCart(data?.product))
    }

    return (
        <>
            <div className='cartItem'>

                <MetaData title='Amazone.in Shopping Cart' />

                <div>
                    <Link to={`/product/${data?.product}`}>
                        <img src={data?.image} alt={data.name} />
                    </Link>
                </div>

                <div>

                    <h4><Link to={`/product/${data?.product}`}>{data.name}</Link></h4>

                    <div className='cartItem__discount'>11% off</div>

                    <div className='cartItem__price app__center'>
                        <p><small>₹ </small>{data?.price.toLocaleString('en-IN')}</p>
                        <p>M.R.P.: <small>₹ </small><span>{(data?.price * .11 + data?.price).toLocaleString('en-IN')}</span></p>
                    </div>

                    <p className='green-color'>In stock</p>

                    <div>
                        <img src={primeIcon} alt="Prime" />
                    </div>

                    <div className='cartItem__gift'>
                        <input type='checkbox' />
                        <span>This will be a gift <Link to='/learnmore'>Learn more</Link></span>
                    </div>

                    <div className='cartItem__buttons app__center'>

                        <div>
                            <label htmlFor='quantity'>Qty: </label>
                            <select
                                id='quantity'
                                value={data?.quantity}
                                onChange={handleQuantityChange}
                            >
                                {
                                    data?.stock < 11
                                        ? [...Array(data?.stock)].map((_, index) => <option key={index} value={index + 1}>{index + 1}</option>)
                                        : quantities.map(item => <option key={item} value={item}>{item}</option>)
                                }
                            </select>
                        </div>


                        <button onClick={handleDeleteFromCart}>Delete</button>
                        <button>Save for later</button>
                        <button>See more like this</button>
                        <button>Share</button>
                    </div>
                </div>

            </div>

            <div className='line-break'></div>
        </>
    )
}

export default CartItem
