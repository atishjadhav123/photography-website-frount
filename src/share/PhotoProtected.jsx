import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const PhotoProtected = ({ compo }) => {
    const { photographer } = useSelector(state => state.auth)
    return photographer ? compo : <Navigate to="/login" />
}

export default PhotoProtected