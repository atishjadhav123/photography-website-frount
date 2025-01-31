import React, { useEffect } from 'react';
import { useContactAddMutation } from '../../redux/contact/contactApi';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';

const Contact = () => {
    const [Addcontact, { isSuccess, isError, isLoading, error }] = useContactAddMutation();

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            message: '',
        },
        validationSchema: yup.object({
            name: yup.string().required('Name is required'),
            email: yup.string().email('Invalid email').required('Email is required'),
            message: yup.string().required('Message is required'),
        }),
        onSubmit: (values, { resetForm }) => {
            Addcontact(values);
            resetForm();
        },
    });

    useEffect(() => {
        if (isSuccess) {
            toast.success('Message sent successfully');
        }
    }, [isSuccess]);

    return <>
        <div id="contact" className="min-h-screen flex items-center px-1 justify-start bg-gradient-to-br from-gray-100 to-blue-100 relative">
            {/* Background Image */}
            <div className="absolute inset-0 bg-cover bg-center bg-opacity-50" style={{ backgroundImage: 'url(your-background-image-url-here)' }}></div>

            <div className="home flex flex-col  sm:flex-col md:flex-row w-full bg-white rounded-xl shadow-2xl overflow-hidden relative z-10">
                {/* Left Section - Contact Form */}
                <div className="flex-initial flex flex-col  justify-center items-center sm:w-full md:w-[30%] p-8 sm:min-h-[400px] md:min-h-full">
                    <h2 className="text-4xl font-bold text-blue-700 mb-6 text-center">Get in Touch</h2>
                    <form onSubmit={formik.handleSubmit} className="w-full  max-w-lg space-y-6">
                        {/* Name Input */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-semibold text-gray-600 mb-1">
                                Name
                            </label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.name}
                                className={`w-full px-4 py-2 border ${formik.touched.name && formik.errors.name
                                    ? 'border-red-500'
                                    : 'border-gray-300'
                                    } rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none`}
                                placeholder="Enter your name"
                            />
                            {formik.touched.name && formik.errors.name && (
                                <p className="text-sm text-red-500 mt-1">{formik.errors.name}</p>
                            )}
                        </div>

                        {/* Email Input */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-semibold text-gray-600 mb-1">
                                Email
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.email}
                                className={`w-full px-4 py-2 border ${formik.touched.email && formik.errors.email
                                    ? 'border-red-500'
                                    : 'border-gray-300'
                                    } rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none`}
                                placeholder="Enter your email"
                            />
                            {formik.touched.email && formik.errors.email && (
                                <p className="text-sm text-red-500 mt-1">{formik.errors.email}</p>
                            )}
                        </div>

                        {/* Message Input */}
                        <div>
                            <label htmlFor="message" className="block text-sm font-semibold text-gray-600 mb-1">
                                Message
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.message}
                                className={`w-full px-4 py-2 border ${formik.touched.message && formik.errors.message
                                    ? 'border-red-500'
                                    : 'border-gray-300'
                                    } rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none`}
                                placeholder="Write your message here..."
                                rows="4"
                            ></textarea>
                            {formik.touched.message && formik.errors.message && (
                                <p className="text-sm text-red-500 mt-1">{formik.errors.message}</p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-center mt-4">
                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`w-full px-4 py-2 text-white font-semibold rounded-lg shadow-md transition ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'}`}
                            >
                                {isLoading ? 'Submitting...' : 'Send Message'}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Right Section - Camera Image */}
                <div className="homeone animate-pulse flex-1 flex-col justify-center sm:w-full md:w-[70%] bg-blue-100 p-6 relative">
                    {/* Camera Image Section */}
                    <div className="w-full h-64 bg-cover bg-center" style={{ backgroundImage: 'url(your-camera-image-url-here)' }}></div>
                </div>
            </div>
        </div>

        s


    </>
};

export default Contact;
