import React from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import useAuth from './useAuth'
import { BrowserRouter, Route, Routes } from "react-router-dom";


const ProtectedRoute = ({ children, requiredRole, ...rest }) => {
    const { isLoggedIn, role } = useAuth();

    const navigate = useNavigate()
    if (isLoggedIn && (!requiredRole || requiredRole === role)) {
        return children
    } else {
        return <Navigate to="/login" />
    }

}

export default ProtectedRoute