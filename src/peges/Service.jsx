import React from 'react'
import { useGetallServiceQuery } from '../redux/photografher/photografher.Api'
import { MdArrowRightAlt } from "react-icons/md"
import { Link } from 'react-router-dom'


const Service = () => {
    const { data } = useGetallServiceQuery()

    return (
        <>
            <section id="services" className="bg-gray-50 py-16">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold text-gray-800">
                            <span className="text-blue-500">S</span>ervices
                        </h1>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {data &&
                            data.map((item) => (
                                <div
                                    key={item._id}
                                    className="group bg-white shadow-md hover:shadow-lg transform hover:-translate-y-2 transition duration-300 rounded-lg"
                                >
                                    <div className="flex justify-center items-center h-40">
                                        {/* Displaying service image */}
                                        <img
                                            src={item.image[0]}
                                            alt={item.title}
                                            className="w-full h-40 object-cover rounded-t-lg"
                                        />
                                    </div>
                                    <div className="p-6 text-center">
                                        <h3 className="text-xl font-semibold text-gray-800 group-hover:text-blue-500">
                                            {item.title}
                                        </h3>
                                        <p className="text-gray-600 mt-2">{item.desc}</p>
                                        <div className="flex justify-between items-center mt-4">
                                            <button className="text-blue-500 hover:underline flex items-center font-medium">
                                                Book Service <MdArrowRightAlt className='h-5 w-5' />
                                            </button>
                                            <Link to={`/servicedetail/${item._id}`}>
                                                <button className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-semibold py-2 px-6 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out">
                                                    Show Details
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </section>
        </>
    )
}

export default Service
