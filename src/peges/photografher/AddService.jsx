import { useFormik } from 'formik';
import React, { useState, useEffect } from 'react';
import * as yup from 'yup';
import { toast } from 'react-toastify'

import { useAddServiceMutation, useDeleteServiceMutation, useGetallServiceQuery, useUpdateServiceMutation } from '../../redux/photografher/photografher.Api';

const AddService = () => {
    const [addService, { isSuccess, isLoading, isError, error }] = useAddServiceMutation();
    const [updateService, { isLoading: isUpdating, isSuccess: updatesuccess }] = useUpdateServiceMutation();
    const [deleteService, { isSuccess: deletesuccess }] = useDeleteServiceMutation();
    const { data, refetch } = useGetallServiceQuery();
    const [selectedService, setSelectedservice] = useState(null);

    // Setting up the form for adding or updating services
    const formik = useFormik({
        initialValues: {
            title: selectedService ? selectedService.title : '',
            desc: selectedService ? selectedService.desc : '',
            price: selectedService ? selectedService.price : '',
            category: selectedService ? selectedService.category : '',
            // rating: selectedService ? selectedService.rating : '',
            image: selectedService ? selectedService.image : null,
        },
        validationSchema: yup.object({
            title: yup.string().required('Title is required'),
            desc: yup.string().required('Description is required'),
            price: yup
                .number()
                .required('Price is required')
                .positive('Price must be a positive number'),
            category: yup
                .string()
                .required('Category is required')
                .oneOf(['wedding', 'portrait', 'event', 'fashion', 'sports', 'landscape'], 'Invalid category'),
            // rating: yup
            //     .number()
            //     .required('Rating is required')
            //     .min(1, 'Rating must be at least 1')
            //     .max(5, 'Rating cannot be more than 5'),
            image: yup.mixed().required('Image is required'),
        }),
        onSubmit: (values, { resetForm }) => {
            const fd = new FormData();

            // Append other form fields
            Object.keys(values).forEach(key => {
                if (key !== "image") {
                    fd.append(key, values[key]);
                }
            });

            // Append image if it exists
            if (values.image) {
                fd.append("image", values.image);
            }

            if (selectedService) {
                updateService({ _id: selectedService._id, fd });
            } else {
                addService(fd);
                resetForm();
            }
        }
    });

    useEffect(() => {
        if (isSuccess) {
            toast.success("add success")
        }
    }, [isSuccess])
    useEffect(() => {
        if (updatesuccess) {
            toast.success("update success")
        }
    }, [updatesuccess])
    useEffect(() => {
        if (deletesuccess) {
            toast.success("delete success")
        }
    }, [deletesuccess])


    useEffect(() => {
        if (selectedService) {
            formik.setValues({
                title: selectedService.title,
                desc: selectedService.desc,
                price: selectedService.price,
                category: selectedService.category,
                rating: selectedService.rating,
                image: selectedService.image,
            });
        }
    }, [selectedService]);

    return (
        <>
            <div className="max-w-lg mx-auto p-4 bg-yellow-300 shadow-md rounded-lg">
                <h1 className="text-2xl font-bold mb-4 text-gray-800">{selectedService ? 'Update Service' : 'Add Service'}</h1>
                <form onSubmit={formik.handleSubmit}>
                    {/* Title */}
                    <div className="mb-4">
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                        <input
                            id="title"
                            name="title"
                            type="text"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.title}
                            className={`mt-1 block w-full rounded-md shadow-sm border-gray-300 ${formik.touched.title && formik.errors.title ? 'border-red-500' : ''}`}
                        />
                        {formik.touched.title && formik.errors.title && (
                            <span className="text-sm text-red-500">{formik.errors.title}</span>
                        )}
                    </div>

                    {/* Description */}
                    <div className="mb-4">
                        <label htmlFor="desc" className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            id="desc"
                            name="desc"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.desc}
                            className={`mt-1 block w-full rounded-md shadow-sm border-gray-300 ${formik.touched.desc && formik.errors.desc ? 'border-red-500' : ''}`}
                        />
                        {formik.touched.desc && formik.errors.desc && (
                            <span className="text-sm text-red-500">{formik.errors.desc}</span>
                        )}
                    </div>

                    {/* Price */}
                    <div className="mb-4">
                        <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
                        <input
                            id="price"
                            name="price"
                            type="number"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.price}
                            className={`mt-1 block w-full rounded-md shadow-sm border-gray-300 ${formik.touched.price && formik.errors.price ? 'border-red-500' : ''}`}
                        />
                        {formik.touched.price && formik.errors.price && (
                            <span className="text-sm text-red-500">{formik.errors.price}</span>
                        )}
                    </div>

                    {/* Category */}
                    <div className="mb-4">
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                        <select
                            id="category"
                            name="category"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.category}
                            className={`mt-1 block w-full rounded-md shadow-sm border-gray-300 ${formik.touched.category && formik.errors.category ? 'border-red-500' : ''}`}
                        >
                            <option value="" label="Select category" />
                            <option value="wedding" label="Wedding" />
                            <option value="portrait" label="Portrait" />
                            <option value="event" label="Event" />
                            <option value="fashion" label="Fashion" />
                            <option value="landscape" label="Landscape" />
                            <option value="sports" label="sports" />
                        </select>
                        {formik.touched.category && formik.errors.category && (
                            <span className="text-sm text-red-500">{formik.errors.category}</span>
                        )}
                    </div>
                    {/* Image */}
                    <div className="mb-4">
                        <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image</label>
                        <input
                            id="image"
                            name="image"
                            type="file"
                            accept="image/*"
                            onChange={(event) => formik.setFieldValue('image', event.target.files[0])}
                            className={`mt-1 block w-full rounded-md shadow-sm border-gray-300 ${formik.touched.image && formik.errors.image ? 'border-red-500' : ''}`}
                        />
                        {formik.touched.image && formik.errors.image && (
                            <span className="text-sm text-red-500">{formik.errors.image}</span>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                        disabled={isLoading || isUpdating}
                    >
                        {isLoading || isUpdating ? 'Submitting...' : 'Submit'}
                    </button>
                </form>

                {/* Feedback Messages */}
                {isSuccess && <p className="mt-4 text-green-500">Service added successfully!</p>}
                {isError && <p className="mt-4 text-red-500">Error: {error?.data?.message}</p>}
            </div>

            {/* Services Table */}
            <table className="w-full mt-6 table-auto border-collapse border border-gray-400">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border border-gray-400 px-4 py-2">Title</th>
                        <th className="border border-gray-400 px-4 py-2">Description</th>
                        <th className="border border-gray-400 px-4 py-2">Price</th>
                        <th className="border border-gray-400 px-4 py-2">Category</th>
                        <th className="border border-gray-400 px-4 py-2">Rating</th>
                        <th className="border border-gray-400 px-4 py-2">Image</th>
                        <th className="border border-gray-400 px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data && data.map(item => (
                        <tr key={item.id}>
                            <td className="border border-gray-400 px-4 py-2">{item.title}</td>
                            <td className="border border-gray-400 px-4 py-2">{item.desc}</td>
                            <td className="border border-gray-400 px-4 py-2">{item.price}</td>
                            <td className="border border-gray-400 px-4 py-2">{item.category}</td>
                            <td className="border border-gray-400 px-4 py-2">{item.rating}</td>
                            <td className="border border-gray-400 px-4 py-2 w-[20%] ">
                                <div className="flex space-x-2">
                                    <div className='flex'>
                                        {Array.isArray(item.image) ? (
                                            item.image.map((img, index) => (
                                                <img
                                                    key={index}
                                                    src={img}
                                                    alt={`Service ${index + 1}`}
                                                    className="w-10 h-10 object-cover"
                                                />
                                            ))
                                        ) : (
                                            <img
                                                src={item.image}
                                                alt="Service"
                                                className="w-20 h-20 object-cover"
                                            />
                                        )}
                                    </div>
                                </div>
                            </td>
                            <td className="border border-gray-400 px-4 py-2">
                                <button onClick={() => setSelectedservice(item)} className="mr-2 text-yellow-500">Update</button>
                                <button onClick={() => deleteService(item._id)} className="text-red-500">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}

export default AddService;
