import React, { useState } from 'react'
import { useAddlikeMutation, useGetallImageDetailQuery } from '../redux/photografher/photografher.Api'
import { BsBadgeHd } from "react-icons/bs"
import { CiHeart } from "react-icons/ci"
import { toast } from 'react-toastify'
import { IoMdDownload } from "react-icons/io"
import { useSelector } from 'react-redux'
import payicon2 from '../assets/paid (1).png'
import { Link } from 'react-router-dom'
import LazyLoad from "react-lazyload"


const ITEMS_PER_PAGE = 10 // Number of items to show per click

const GetAllPhotos = () => {
    const { user } = useSelector((state) => state.auth)
    const { data } = useGetallImageDetailQuery()
    const [loadingIndex, setLoadingIndex] = useState(null)
    const [addlike] = useAddlikeMutation()
    const [likedItems, setLikedItems] = useState({})
    const [startIndex, setStartIndex] = useState(0)

    const totalItems = data ? data.length : 0

    // Get the current set of items to display
    const visibleItems = data ? data.slice(startIndex, startIndex + ITEMS_PER_PAGE) : []

    const handleNext = () => {
        if (startIndex + ITEMS_PER_PAGE < totalItems) {
            setStartIndex((prev) => prev + ITEMS_PER_PAGE)
        }
    }

    const handlePrev = () => {
        if (startIndex - ITEMS_PER_PAGE >= 0) {
            setStartIndex((prev) => prev - ITEMS_PER_PAGE)
        }
    }

    const handleLike = async (id) => {
        const isAlreadyLiked = likedItems[id]
        try {
            await addlike({ id }).unwrap()
            setLikedItems((prevState) => ({
                ...prevState,
                [id]: !prevState[id],
            }))
            toast.success("Thank you for the like!")
        } catch (error) {
            toast.error('Failed to add like')
        }
    }

    const handleDownload = async (url, filename, index) => {
        if (!user) {
            toast.error("Please log in to download")
            return
        }
        setLoadingIndex(index)
        await new Promise((resolve) => setTimeout(resolve, 3000))

        try {
            const response = await fetch(url, { method: 'GET' })
            const blob = await response.blob()
            const blobUrl = window.URL.createObjectURL(blob)

            const link = document.createElement('a')
            link.href = blobUrl
            link.download = filename || 'image.jpg'
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
            window.URL.revokeObjectURL(blobUrl)
        } catch (error) {
            toast.error('Failed to download image')
        } finally {
            setLoadingIndex(null)
        }
    }

    return <LazyLoad>
        <div className="min-h-[100vh] flex items-center bg-gradient-to-br from-gray-100 to-blue-100">
            <div className="mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 py-10 text-left mx-5 xl:mx-10">
                    {visibleItems.map((item, index) => (
                        <div
                            className="border rounded-lg overflow-hidden relative bg-white hover:scale-105 transition-all duration-300"
                            key={index}
                        >
                            <div className="cursor-pointer h-48 overflow-hidden relative">
                                <img
                                    src={item.hero}
                                    alt="Profile image for particular category"
                                    className="w-full h-full object-cover transform hover:scale-125 transition-all duration-300"
                                />
                                <span className="absolute top-4 right-4 w-8 h-8 items-center bg-gray-100 flex justify-center rounded-full">
                                    <BsBadgeHd />
                                </span>
                            </div>
                            <div className="p-4 space-y-2 relative h-48 text-gray-400">
                                <div className="flex justify-between">
                                    <p className="text-sm font-bold truncate text-gray-700">{item.category}</p>
                                    <CiHeart
                                        className={`h-7 w-7 cursor-pointer ${likedItems[item._id] ? 'text-red-500' : 'hover:text-red-500'}`}
                                        onClick={() => handleLike(item._id)}
                                    />
                                </div>
                                <div>
                                    <span className="text-2xl font-bold text-gray-800 hover:text-blue-600 transition duration-300 ease-in-out">
                                        {item.title}
                                    </span>
                                </div>
                                <p className="text-sm font-normal text-gray-600 hover:text-gray-800 transition duration-300">
                                    {item.description}
                                </p>
                                <div className="flex justify-evenly bottom-2 text-center absolute inset-x-0">
                                    {item.category !== "free" ? (
                                        user ? (
                                            <Link
                                                to={`/imagedetail/${item._id}`}
                                                className="bg-[#365CCE] btn-sm rounded px-6 text-white font-medium text-xs shadow-md hover:shadow-lg flex items-center"
                                            >
                                                Go & Download
                                            </Link>
                                        ) : (
                                            <button
                                                onClick={() => toast.error("Please log in to view details")}
                                                className="bg-[#365CCE] btn-sm rounded px-6 text-white font-medium text-xs shadow-md hover:shadow-lg flex items-center"
                                            >
                                                Go & Download
                                            </button>
                                        )
                                    ) : (
                                        <button
                                            onClick={() => handleDownload(item.hero, `${item.title}.jpg`, index)}
                                            className="bg-[#365CCE] btn-sm rounded px-6 text-white font-medium text-xs shadow-md hover:shadow-lg flex items-center"
                                            disabled={loadingIndex === index}
                                        >
                                            <IoMdDownload />
                                            {loadingIndex === index ? (
                                                <div className="animate-spin rounded-full h-4 w-4 border-t-4 border-b-4 border-zinc-100"></div>
                                            ) : (
                                                'Download'
                                            )}
                                        </button>
                                    )}
                                    <span className="flex items-center text-xl font-semibold text-gray-800 pl-4 hover:text-green-600">
                                        {item.category !== "free" && (
                                            <img src={payicon2} alt="" className="h-5 w-5 animate-pulse" />
                                        )}
                                        {item.price}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Next/Previous Buttons */}
                <div className="flex justify-center space-x-4 mt-6">
                    <button
                        className={`px-4 py-2 bg-emerald-500 rounded ${startIndex === 0 && 'opacity-50 cursor-not-allowed'}`}
                        onClick={handlePrev}
                        disabled={startIndex === 0}
                    >
                        Previous
                    </button>
                    <button
                        className={`px-4 py-2 bg-blue-500 text-white rounded ${startIndex + ITEMS_PER_PAGE >= totalItems && 'opacity-50 cursor-not-allowed'}`}
                        onClick={handleNext}
                        disabled={startIndex + ITEMS_PER_PAGE >= totalItems}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    </LazyLoad>
}

export default GetAllPhotos
