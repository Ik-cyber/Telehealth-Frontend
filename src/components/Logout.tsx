import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthProvider'

function Logout() {
    const {logout} = useAuth()
    logout()
    return <Navigate to="/login" replace={true} />
}

export default Logout
