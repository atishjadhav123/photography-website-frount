import React from 'react'
import PhotoNavbar from './PhotoNavbar'
import PhotoSidebar from './PhotoSidebar'
import { Outlet } from 'react-router-dom'

const PhotoLayout = () => {
    return <>
        <PhotoNavbar />
        <PhotoSidebar />
        <div style={{ marginLeft: "200px" }}>
            <Outlet />
        </div>
    </>
}

export default PhotoLayout