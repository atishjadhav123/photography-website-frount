import React from 'react'
import { useGetAllTransactionQuery } from '../../redux/transactionApi'
import { format } from 'date-fns'

const GetAllTransaction = () => {
    const { data, error, isLoading } = useGetAllTransactionQuery()


    if (isLoading) return <p>Loading...</p>
    if (error) return <p>Error loading transactions: {error.message}</p>

    return (
        <div className="overflow-x-auto p-4">
            <table className="min-w-full border border-gray-300 shadow-lg rounded-lg">
                <thead className="bg-gray-700 text-white text-lg">
                    <tr>
                        <th className="px-6 py-3 border-r border-gray-500">Transaction ID</th>
                        <th className="px-6 py-3 border-r border-gray-500">Amount</th>
                        <th className="px-6 py-3 border-r border-gray-500">Payment Method</th>
                        <th className="px-6 py-3">Timestamp</th>
                    </tr>
                </thead>
                <tbody className="bg-gray-100 text-md">
                    {data.map((transaction) => (
                        <tr key={transaction._id} className="border-b border-gray-300 hover:bg-gray-200 transition">
                            <td className="px-6 py-3 border-r">{transaction._id}</td>
                            <td className="px-6 py-3 border-r text-green-600 font-semibold">${transaction.amount}</td>
                            <td className="px-6 py-3 border-r">{transaction.paymentMethod}</td>
                            <td className="px-6 py-3">{format(new Date(transaction.timestamp), 'dd-MM-yyyy')}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default GetAllTransaction