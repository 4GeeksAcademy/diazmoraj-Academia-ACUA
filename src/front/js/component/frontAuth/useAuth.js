import { useState, useEffect } from 'react'
import { useContext } from 'react';
import { Context } from '../../store/appContext';
import React from 'react';
import { navigate, useNavigate } from 'react-router-dom';

const useAuth = () => {
    const navigate = useNavigate()
    const { store, actions } = useContext(Context)

    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [role, setRole] = useState('');
    const [token, setToken] = useState('')


    useEffect(() => {
        const tokenGuardado = localStorage.getItem('access_token') // Obtiene el token guardado
        const rolGuardado = localStorage.getItem('user_type')
        if (tokenGuardado && rolGuardado) {
            setIsLoggedIn(true)
            setRole(rolGuardado)
            setToken(tokenGuardado)
        }
    }, [])

    const login = async (email, password) => {
        const result = await actions.login(email, password)
        if (result.success) {
            setIsLoggedIn(true)
            console.log(isLoggedIn)
            const user_type = localStorage.getItem('user_type')
            setRole(user_type)
        }
        return result
    }

    const logout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('user_type');
        actions.logout();
        navigate('/login')
    }

    return { isLoggedIn, role, login, logout }
}

export default useAuth