import { Tooltip } from '@mui/material'
import React from 'react'
import { Button } from '../../../utils'
import { Link } from 'react-router-dom'

const OrderCard = ({ order }) => {
    console.log('order', order)
    return (
        <div className='order__card'>
            <div className='app__between'>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    fontSize: '14px',
                    color: '#565959',
                    fontWeight: 400,
                    columnGap: '20px'
                }}>
                    <div>
                        <p>ORDER PLACED</p>
                        <p>23 December 2024</p>
                    </div>
                    <div>
                        <p>TOTAL</p>
                        <p>₹1,238.00</p>
                    </div>
                    <div>
                        <p>SHIP TO</p>
                        <a className='app__link'>
                            <Tooltip
                                title={<div style={{ width: '150px', fontSize: '12px', lineHeight: '16px' }}>
                                    <p style={{ fontWeight: 700 }}>Swaraj Patil</p>
                                    <p>Shree Samartha Krupa Vadgaon PEN, MAHARASHTRA 402107 India</p>
                                </div>}
                            >Swaraj Patil</Tooltip></a>
                    </div>
                </div>
                <div style={{
                    fontSize: '14px',
                    color: '#565959',
                    fontWeight: 400,
                }}>
                    <p>Order # 171-9518754-6974758</p>
                    <p><a href="" className='app__link'>View order details</a> | <a href="" className='app__link'>Invoice</a></p>
                </div>
            </div>
            <div className='app__between'>
                <div>
                    <p style={{ fontSize: '18px', fontWeight: 700, color: '#008577' }}>Arriving tomorrow by 10 PM</p>
                    <p style={{ fontSize: '14px' }}>Dispatched</p>

                    <div style={{ margin: '20px 0' }}>
                        {order?.orderItems?.map(item => (
                            <div key={item._id} style={{ display: 'flex', columnGap: '10px', marginBottom: '20px' }}>
                                <div>
                                    <img width='80px' src={item.image} alt="Product" />
                                </div>
                                <Link to={`/product/${item.product}`} className='app__link' style={{ maxWidth: '70%' }}>{item.name}</Link>
                            </div>
                        ))}
                    </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', rowGap: '5px', minWidth: '200px' }}>
                    <Button type='primary' label='Track package' />
                    <Button type='secondary' label='Request cancellation' />
                    <Button type='secondary' label='Return or Replace items' />
                    <Button type='secondary' label='Leave seller feedback' />
                    <Button type='secondary' label='Write a product review' />
                </div>
            </div >
        </div >
    )
}

export default OrderCard