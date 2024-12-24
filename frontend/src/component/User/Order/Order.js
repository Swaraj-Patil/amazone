import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Loader, MetaData } from '../../Layout'
import { Box, Breadcrumbs, Tab, Tabs, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { clearErrors, myOrders } from '../../../redux/actions/orderActions'
import OrderCard from './OrderCard'
import './Order.css'

const Order = () => {

    const dispatch = useDispatch()
    const { user } = useSelector(state => state.user)
    const { loading, error, orders } = useSelector(state => state.myOrders)
    orders?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

    const [tab, setTab] = useState('orders')

    const displayTabContent = () => {
        switch (tab) {
            case 'orders':
                return (
                    <div style={{ marginTop: '20px' }}>
                        {orders?.map(order => <OrderCard key={order._id} order={order} />)}
                    </div>
                )

            default:
                return null
        }
    }

    const handleTabChange = (_, newValue) => {
        setTab(newValue)
    }

    useEffect(() => {
        if (error) {
            toast.error(error)
            dispatch(clearErrors())
        }
        dispatch(myOrders())
    }, [error, dispatch])

    return (
        <Fragment>
            {loading ? <Loader /> : (
                <div className='addresses'>
                    <MetaData title='Your Addresses' />

                    <Breadcrumbs aria-label='breadcrumb' separator='›'>
                        <Link to='/account' underline='hover'>Your Account</Link>
                        <Typography color='text.primary'>Your Orders</Typography>
                    </Breadcrumbs>

                    <div className='addresses__container'>
                        <h1>Your Orders</h1>
                        <Tabs
                            value={tab}
                            onChange={handleTabChange}
                            // textColor="primary"
                            indicatorColor="secondary"
                            aria-label="orders-tabs"
                        >
                            <Tab value="orders" label="Orders" />
                            <Tab value="buy_again" label="Buy Again" />
                            <Tab value="to_be_shipped" label="Not Yet Shipped" />
                            <Tab value="cancelled" label="Cancelled Orders" />
                        </Tabs>

                        {displayTabContent()}

                        <div className='addresses__card-wrapper'>
                            {/* {orders?.map(order => (
                                <div></div>
                            ))} */}
                        </div>

                    </div>
                </div>
            )}
        </Fragment>
    )
}

export default Order