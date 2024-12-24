import React, { useEffect, useState } from 'react'
import { Button } from '../../utils'
import Sidebar from './Sidebar'
// import './Dashboard.css'
// import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import CreateProduct from './CreateProduct'
// import { getAdminProducts } from '../../redux/actions/productActions'
// import { getAllOrders } from '../../redux/actions/orderActions'
// import { getAllUsers } from '../../redux/actions/userAction'
// import {
//     Chart as ChartJS,
//     CategoryScale,
//     PointElement,
//     LineElement,
//     Title,
//     ArcElement,
//     Tooltip,
//     Legend
// } from 'chart.js'
// import { Doughnut, Line } from 'react-chartjs-2'
// import { Typography } from '@mui/material'
// import { toast } from 'react-toastify'

// ChartJS.register(
//     CategoryScale,
//     LinearScale,
//     PointElement,
//     LineElement,
//     ArcElement,
//     Title,
//     Tooltip,
//     Legend
// )

const Dashboard = () => {

    // const navigate = useNavigate()
    const dispatch = useDispatch()

    const { sidebarState } = useSelector(state => state.admin)

    const renderContent = () => {
        switch (sidebarState) {
            case 'Create a Product':
                return (
                    <CreateProduct />
                )

            case 'Dashboard':
                return (
                    <div>Coming Soon</div>
                )

            default:
                return null
        }
    }

    // const { user } = useSelector(state => state.user)
    // const { products } = useSelector(state => state.products)
    // const { orders } = useSelector(state => state.allOrders)
    // const { users } = useSelector(state => state.allUsers)

    // let outOfStock = 0

    // products && products.forEach(product => {
    //     if (product.stock === 0) {
    //         outOfStock += 1
    //     }
    // })

    // let totalAmount = 0
    // orders && orders.forEach(order => totalAmount += order.totalPrice)

    // const lineState = {
    //     labels: ['Initial Amount', 'Amount Earned'],
    //     datasets: [
    //         {
    //             label: 'TOTAL AMOUNT',
    //             backgroundColor: ['tomato'],
    //             hoverBackgroundColor: ['rgb(197,72,49)'],
    //             data: [0, totalAmount]
    //         }
    //     ]
    // }

    // const doughnutState = {
    //     labels: ['Out of Stock', 'In Stock'],
    //     datasets: [
    //         {
    //             backgroundColor: ['#00A6B4', '#6800B4'],
    //             hoverBackgroundColor: ['#4B5000', '#35014F'],
    //             data: [outOfStock, products.length - outOfStock]
    //         }
    //     ]
    // }

    // useEffect(() => {
    //     if (user.role !== 'admin') {
    //         navigate('/products')
    //         toast.error('You are not authorized to access this resource.')
    //     }

    //     dispatch(getAdminProducts())
    //     dispatch(getAllOrders())
    //     dispatch(getAllUsers())
    // }, [navigate, user, toast, dispatch])


    return (
        <div className='dashboard'>
            <Sidebar />
            <div className='app__center'>
                {renderContent()}
            </div>

            {/* <div className='dashboard-container'>
                <Typography component='h1'>Dashboard</Typography>

                <div className="dashboard-summary">
                    <div>
                        <p>Total Amount <br /> ₹{totalAmount}</p>
                    </div>

                    <div className="dashboard-summary-box2">
                        <Link to='/admin/products'>
                            <p>Products</p>
                            <p>{products && products.length}</p>
                        </Link>

                        <Link to='/admin/orders'>
                            <p>Orders</p>
                            <p>{orders && orders.length}</p>
                        </Link>

                        <Link to='/admin/users'>
                            <p>Users</p>
                            <p>{users && users.length}</p>
                        </Link>
                    </div>
                </div>

                <div className="line-chart">
                    <Line data={lineState} />
                </div>

                <div className="doughnut-chart">
                    <Doughnut data={doughnutState} />
                </div>

            </div> */}
        </div>
    )
}

export default Dashboard
