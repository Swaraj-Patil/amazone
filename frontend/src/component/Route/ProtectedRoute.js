import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const ProtectedRoute = () => {

    const { isAuthenticated } = useSelector(state => state.user)

    if (isAuthenticated === false) {
        return <Navigate to='/login' />
    }
    return <Outlet />
}

export default ProtectedRoute
