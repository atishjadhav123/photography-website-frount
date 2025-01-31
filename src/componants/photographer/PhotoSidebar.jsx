import React from 'react'
import { Link } from 'react-router-dom'

const PhotoSidebar = () => {

    const LINKS = [
        { label: "AddPhotos", to: "/photographer/addphoto", },
        { label: "addService", to: "/photographer/addservice", },
        { label: "GetallBokking", to: "/photographer/bookingfetch", },
        { label: "Transaction", to: "/photographer/getalltransaction", },

    ]
    return <>
        <div
            className='bg-dark text-light'
            style={{
                width: "200px",
                height: "100vh",
                position: "fixed",
                top: "0",
                left: "0"
            }}>
            <div
                style={{ height: "55px" }}
                className='bg-primary d-flex justify-content-center align-items-center fs-4'>Flipkart-Lite</div>

            {LINKS.map(item => <div style={{ height: "55px" }}
                className='bg-light d-flex  align-items-center px-3'>
                <span className='text-dark me-2'>{item.icon}</span>
                <Link
                    className='text-decoration-none text-dark text-uppercase'
                    to={item.to}>
                    {item.label}
                </Link>
            </div>)}
        </div>
    </>
}

export default PhotoSidebar