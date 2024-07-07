import React from 'react'
import { Outlet } from 'react-router-dom'
import { Navigate } from 'react-router-dom'

const Private = ({ role }) => {

    const token = localStorage.getItem('access_token')
    const userRole = localStorage.getItem("user_type")

    const userAuth = userRole == role


    return (
        token && userAuth ? <Outlet /> : <Navigate to="/login" />
    )
}

export default Private