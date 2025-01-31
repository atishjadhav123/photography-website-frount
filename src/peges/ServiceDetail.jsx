import React, { useState, useEffect } from 'react'
import { useGetallServicePhotoQuery } from '../redux/photografher/photografher.Api'
import { useCreateBookingMutation } from '../redux/bookingApi'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaStar } from 'react-icons/fa'
import LazyLoad from "react-lazyload"


const ServiceDetail = () => {
    const [createBooking, { isSuccess, isLoading: bookingisloading }] = useCreateBookingMutation()
    const { id } = useParams()
    const { data, isLoading, isError, error } = useGetallServicePhotoQuery(id)
    const [selectedHero, setSelectedHero] = useState("")
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [rating, setRating] = useState(0)
    const [hover, setHover] = useState(null)

    useEffect(() => {
        if (data) {
            setSelectedHero(data.image[0])
        }
    }, [data])

    useEffect(() => {
        if (isSuccess) {
            toast.success("Your booking was successful!")
            setIsModalOpen(false)
        }
    }, [isSuccess])

    const handleBooking = async () => {
        try {
            await createBooking({
                userId: "user_id_placeholder",
                serviceId: id,
                bookingDate: new Date().toISOString(),
                rating,
            })
        } catch (error) {
            console.error("Error creating booking:", error)
            toast.error("Failed to create booking.")
        }
    }

    if (isLoading) {
        return <p className="text-center text-2xl text-gray-600">Loading...</p>
    }


    if (isError || !data) {
        console.error("Error:", error)
        return <p className="text-center text-2xl text-red-600">Error loading service details.</p>
    }

    return <LazyLoad>
        <div className="flex flex-col-reverse md:flex-row p-5 bg-gray-100 min-h-screen">
            {/* Service Info (on right side) */}
            <div className="w-full md:w-1/2 p-5 bg-white shadow-lg rounded-lg">
                <h3 className="text-4xl font-extrabold text-gray-800 mb-4">{data.title}</h3>
                <h4 className="text-xl font-semibold text-gray-600 mb-2">{data.category}</h4>
                <div className="flex items-center my-4">
                    <p className="mr-3 text-2xl font-semibold text-blue-600">₹{data.price}</p>
                </div>
                <p className="text-gray-700 text-lg mb-6">{data.desc}</p>

                {/* Book Service Button */}
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold py-3 rounded-lg hover:from-blue-600 hover:to-blue-700 shadow-lg hover:shadow-xl transition duration-300"
                >
                    Book Service
                </button>
            </div>

            {/* Image Section */}
            <div className="w-full md:w-1/2 p-5">
                <div className="mb-6">
                    <img
                        src={selectedHero}
                        alt={data.title}
                        className="w-full h-96 object-cover rounded-lg shadow-md"
                    />
                </div>

                {/* Thumbnail Images */}
                <div className="flex gap-3 overflow-x-auto">
                    {data.image.map((item, index) => (
                        <img
                            key={index}
                            src={item}
                            alt={data.title}
                            className="w-20 h-20 object-cover rounded-lg cursor-pointer border-2 border-gray-300 hover:border-blue-600"
                            onClick={() => setSelectedHero(item)}
                        />
                    ))}
                </div>
            </div>

            {/* Booking Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-8 rounded-lg shadow-lg w-11/12 md:w-1/3">
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">Rate and Book Service</h3>
                        <div className="mb-6">
                            <p className="text-gray-700 mb-2">Rating:</p>
                            <div className="flex">
                                {[...Array(5)].map((_, index) => {
                                    const starValue = index + 1;
                                    return (
                                        <FaStar
                                            key={index}
                                            size={30}
                                            className={`cursor-pointer ${starValue <= (hover || rating)
                                                ? "text-yellow-500"
                                                : "text-gray-300"
                                                }`}
                                            onClick={() => setRating(starValue)}
                                            onMouseEnter={() => setHover(starValue)}
                                            onMouseLeave={() => setHover(null)}
                                        />
                                    );
                                })}
                            </div>
                        </div>
                        <div className="flex gap-4 flex-col md:flex-row">
                            <button
                                onClick={handleBooking}
                                className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-300"
                                disabled={bookingisloading} // Disable button while loading
                            >
                                {bookingisloading ? (
                                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div> // Show spinner
                                ) : (
                                    "Book Now"
                                )}
                            </button>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="bg-gray-300 text-gray-700 py-2 px-6 rounded-lg hover:bg-gray-400 transition duration-300"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>

    </LazyLoad>
}

export default ServiceDetail
