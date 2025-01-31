import React from "react"
import { format } from 'date-fns'
import { useGetAllBookingQuery, useUpdatebookingMutation } from "../redux/bookingApi"

const GetAllBooking = () => {
    const { data, error, isLoading, isError } = useGetAllBookingQuery()
    const [updatebooking] = useUpdatebookingMutation()

    if (isLoading) return <p>Loading...</p>
    if (error) return <p>no service book? plese book service: {error?.message}</p>
    if (!data || data.length === 0) return <p>No bookings found.</p>

    const handleUpdateStatus = async (id, newStatus) => {
        try {
            await updatebooking({ _id: id, status: newStatus }).unwrap()
            alert(`Booking updated to ${newStatus}`)
        } catch (error) {
            alert("Failed to update booking")
        }
    }

    return (
        <>
            <table className="w-full border border-gray-300 rounded-lg overflow-hidden text-gray-900">
                <thead className="bg-gray-700 text-white text-lg">
                    <tr>
                        <th className="px-6 py-3 border-r border-gray-500">Service</th>
                        <th className="px-6 py-3 border-r border-gray-500">Category</th>
                        <th className="px-6 py-3 border-r border-gray-500">Price</th>
                        <th className="px-6 py-3 border-r border-gray-500">Status</th>
                        <th className="px-6 py-3 border-gray-500">Created At</th>
                        <th className="px-6 py-3">Actions</th>
                    </tr>
                </thead>
                <tbody className="bg-gray-100 text-md">
                    {data.map((item) => (
                        <tr key={item._id} className="border-b border-gray-300 hover:bg-gray-200 transition">
                            <td className="px-6 py-3 border-r">{item.serviceId.title}</td>
                            <td className="px-6 py-3 border-r">{item.serviceId.category}</td>
                            <td className="px-6 py-3 border-r text-green-600 font-semibold">${item.serviceId.price}</td>
                            <td className="px-6 py-3 border-r">
                                <span className={`px-3 py-1 rounded text-white ${item.status === "cancelled" ? "bg-red-600" : "bg-blue-600"}`}>
                                    {item.status}
                                </span>
                            </td>
                            <td >{format(new Date(item.createdAt), 'dd-MM-yyyy')}</td>
                            <td className="px-6 py-3 space-x-2">
                                {item.status !== "cancelled" ? (
                                    <button
                                        onClick={() => handleUpdateStatus(item._id, "cancelled")}
                                        className="px-4 py-2 text-sm font-semibold text-white bg-red-700 rounded hover:bg-red-600 transition"
                                    >
                                        Cancel
                                    </button>
                                ) : (
                                    <button
                                        disabled
                                        className="px-4 py-2 text-sm font-semibold text-gray-500 bg-gray-300 rounded cursor-not-allowed"
                                    >
                                        Canceled
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default GetAllBooking
