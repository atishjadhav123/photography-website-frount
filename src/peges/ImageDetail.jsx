import React, { useEffect, useState } from "react"
import { useGetallImageQuery } from "../redux/photografher/photografher.Api"
import { toast } from "react-toastify"
import { Link, useParams } from "react-router-dom"
import { FaGooglePay } from "react-icons/fa";
import { AiOutlineHome } from "react-icons/ai";


import {
    useAddTransactionMutation,
    useInitialOrderMutation,
} from "../redux/transactionApi"

const ImageDetail = () => {
    const { id } = useParams()
    const { data, isLoading, error, isError } = useGetallImageQuery(id)
    const [addTransaction, { isSuccess }] = useAddTransactionMutation()
    const [initOrder, { data: orderData, isSuccess: orderSuccess }] =
        useInitialOrderMutation()
    const [loading, setLoading] = useState(false)
    const image = data ? data[0] : null

    const handleDownload = async (url, filename) => {
        try {
            const response = await fetch(url)
            const blob = await response.blob()
            const blobUrl = window.URL.createObjectURL(blob)

            const link = document.createElement("a")
            link.href = blobUrl
            link.download = filename || "image.jpg"
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
            window.URL.revokeObjectURL(blobUrl)

            toast.success("Download successful!")
        } catch (err) {
            console.error("Download error:", err)
            toast.error("Failed to download image. Please try again.")
        }
    }

    const handlePayAndDownload = async () => {
        if (!image) return

        setLoading(true)
        try {
            await initOrder({ amount: image.price })

            if (orderSuccess && orderData) {
                const razorpay = new window.Razorpay({
                    key: import.meta.env.VITE_RAZORPAY_API_KEY,
                    amount: orderData.result.amount,
                    currency: "INR",
                    order_id: orderData.result.id,
                    prefill: {
                        name: "John Doe",
                        contact: "9876543210",
                    },
                    handler: async (response) => {
                        try {
                            await addTransaction({
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_signature: response.razorpay_signature,
                                userId: image?._id,
                                photoId: image?._id,
                                amount: image.price,
                            });
                            toast.success("Payment successful!");
                            handleDownload(image.url, `${image.title}.jpg`);
                        } catch (err) {
                            console.error("Transaction error:", err);
                            toast.error("Failed to record transaction.");
                        }
                    }

                })

                razorpay.open()
            }

        } catch (err) {
            console.error("Payment initialization error:", err)
            toast.error("Failed to initialize payment.")
        } finally {
            setLoading(false)
        }
    }


    if (isLoading)
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="spinner-border text-blue-500" role="status"></div>
                <h4>Loading image details...</h4>
            </div>
        )

    if (isError)
        return (
            <div className="text-center text-red-500">
                <h4>Error: {error?.message || "Unable to fetch image details"}</h4>
            </div>
        )

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center py-10">
            <div className="container mx-auto bg-white rounded-lg shadow-xl overflow-hidden md:flex md:flex-row-reverse">
                {/* Image Section */}
                <div className="md:w-1/2 relative">
                    <img
                        src={image.hero[0]}
                        alt={image.title}
                        className="w-full h-96 object-cover rounded-t-lg md:rounded-t-none md:rounded-l-lg shadow-lg"
                    />
                    <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 text-white p-4 rounded-t-lg md:rounded-none">
                        <p className="font-semibold text-2xl">{image.title}</p>
                        <p className="text-sm">{image.category}</p>
                    </div>
                </div>

                {/* Details Section */}
                <div className="md:w-1/2 p-6 flex flex-col justify-between">
                    <div>
                        <div className=" flex justify-between">
                            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">{image.title}</h2>
                            <Link to="/"><AiOutlineHome className=" h-5 w-5" /></Link>
                        </div>
                        <p className="text-gray-700 mb-6">{image.description}</p>
                        <ul className="space-y-3 text-lg text-gray-600">
                            <li className="flex justify-between">
                                <span className="font-semibold">Category:</span>
                                <span>{image.category}</span>
                            </li>
                            <li className="flex justify-between">
                                <span className="font-semibold">Price:</span>
                                <span>{image.price > 0 ? `$${image.price}` : "Free"}</span>
                            </li>
                            <li className="flex justify-between">
                                <span className="font-semibold">Resolution:</span>
                                <span>{image.resolution}</span>
                            </li>
                        </ul>
                    </div>

                    {/* Payment and Download Section */}
                    <div className="mt-6 flex items-center space-x-4">
                        <button
                            onClick={image.price > 0 ? handlePayAndDownload : () => handleDownload(image.url, `${image.title}.jpg`)}
                            className={`w-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 ${loading && "opacity-50 cursor-not-allowed"}`}
                            disabled={loading}
                        >
                            <FaGooglePay className="h-7 w-7 mr-2 text-teal-400 animate-pulse" />
                            {loading
                                ? "Processing..."
                                : image.price > 0
                                    ? "Pay & Download"
                                    : "Download"
                            }
                        </button>

                    </div>
                </div>
            </div>
        </div>

    )
}

export default ImageDetail
