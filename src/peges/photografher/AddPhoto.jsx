import React, { useEffect, useState } from 'react'
import * as yup from 'yup'
import { useFormik } from 'formik'
import { useAddImageMutation, useDeleteImageMutation, useGetallImageDetailQuery, useUpdateImageMutation } from '../../redux/photografher/photografher.Api'
import { toast } from 'react-toastify'

const AddPhoto = () => {
    const [Addphoto, { isSuccess, isError, isLoading, error }] = useAddImageMutation()
    const { data } = useGetallImageDetailQuery()
    // console.log(data)

    const [updateImage, {
        isSuccess: updateimagesuccess,
        isError: updateiserror,
        error: updateerror,
        isLoading: updateisloding
    }] = useUpdateImageMutation()
    const [deleteImage, { isSuccess: deletesuccess, isLoading: deleteisloding }] = useDeleteImageMutation()
    const [darkMode, setDarkMode] = useState(false)
    const [selectedImage, seTSelectedImage] = useState()
    const [newHero, setNewHero] = useState(false)
    const [remove, setRemove] = useState([])
    const [preview, setPreview] = useState([])

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            title: selectedImage ? selectedImage.title : '',
            description: selectedImage ? selectedImage.description : '',
            tags: selectedImage ? selectedImage.tags : '',
            category: selectedImage ? selectedImage.category : '',
            resolution: selectedImage ? selectedImage.resolution : '',
            // url: selectedImage ? selectedImage.url : '',
            hero: selectedImage ? selectedImage.hero : null,
            price: selectedImage ? selectedImage.price : '',
        },
        validationSchema: yup.object({
            title: yup.string().required('title is required'),
            description: yup.string().required('Email is required'),
            tags: yup.string().required('tags number is required'),
            category: yup.string().required('category is required'),
            resolution: yup.string().required('resolution picture is required'),
            // url: yup.string().required('url is required'),
            hero: yup.string().required('hero is required'),
            price: yup.string().required('price is required'),
        }),
        onSubmit: (values, { resetForm }) => {
            const fd = new FormData();

            // Append other form fields
            for (const key of Object.keys(values)) {
                if (key !== "hero") {
                    fd.append(key, values[key]);
                }
            }

            // Handle the `hero` field
            if (values.hero) {
                if (Array.isArray(values.hero)) {
                    values.hero.forEach((file) => {
                        fd.append("hero", file);
                    });
                } else {
                    fd.append("hero", values.hero);
                }
            }

            // Append the `remove` field
            if (remove.length > 0) {
                remove.forEach((item) => {
                    fd.append("remove[]", item);
                });
            }

            // Update or Add new
            if (selectedImage) {
                updateImage({ _id: selectedImage._id, fd });
                seTSelectedImage(null);
                setRemove([]);
            } else {
                Addphoto(fd);
                resetForm();
            }
        }




    })
    useEffect(() => {
        if (isSuccess) {
            toast.success("photo added succees")
        }
    }, [isSuccess])
    useEffect(() => {
        if (updateimagesuccess) {
            toast.success("photo Update succees")
        }
    }, [updateimagesuccess])
    useEffect(() => {
        if (deletesuccess) {
            toast.success("photo delete succees")
        }
    }, [deletesuccess])
    if (isLoading || updateisloding || deleteisloding) return (
        <h3 className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </h3>
    );

    if (isError) return (
        <h3 className="text-red-500 font-medium text-center">
            Failed to add profile: {error?.message}
        </h3>
    );

    return <>
        <form onSubmit={formik.handleSubmit}>
            <div className="flex flex-col justify-center items-center w-full h-[1500px] bg-[#282D2D] px-4 sm:px-5">
                <div className={`xl:max-w-3xl ${darkMode ? 'bg-black' : 'bg-white'} w-full p-4 sm:p-6 rounded-md`}>
                    <h1 className={`text-center text-xl sm:text-2xl font-semibold ${darkMode ? 'text-white' : 'text-black'}`}>
                        Register for a free account
                    </h1>
                    <div className="flex flex-col items-end justify-start overflow-hidden mb-2 xl:max-w-3xl w-full">
                        <div className="flex">
                            <h3 className="text-white">Dark Mode : &nbsp;</h3>
                            <label className="inline-flex relative items-center mr-5 cursor-pointer">
                                <input type="checkbox" className="sr-only peer" checked={darkMode} readOnly />
                                <div
                                    onClick={() => setDarkMode(!darkMode)}
                                    className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-green-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"
                                ></div>
                            </label>
                        </div>
                    </div>
                    <div className="w-full mt-6">
                        <div className="mx-auto max-w-xs sm:max-w-md flex flex-col gap-4">
                            {/* Form Fields */}
                            <div className="flex flex-col sm:flex-row gap-2">
                                <input
                                    {...formik.getFieldProps('title')}
                                    className={`w-full px-4 py-2 rounded-lg font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2 focus:outline ${darkMode ? 'bg-[#302E30] text-white focus:border-white' : 'bg-gray-100 text-black focus:border-black'}`}
                                    type="text"
                                    placeholder="Your title"
                                />
                                {formik.touched.title && formik.errors.title && (
                                    <p className="text-red-500 text-sm mt-1">{formik.errors.title}</p>
                                )}
                            </div>
                            <input
                                {...formik.getFieldProps('description')}
                                className={`w-full px-4 py-2 rounded-lg font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2 focus:outline ${darkMode ? 'bg-[#302E30] text-white focus:border-white' : 'bg-gray-100 text-black focus:border-black'}`}
                                type="text"
                                placeholder="Enter your description"
                            />
                            {formik.touched.description && formik.errors.description && (
                                <p className="text-red-500 text-sm mt-1">{formik.errors.description}</p>
                            )}
                            <input
                                {...formik.getFieldProps('tags')}
                                className={`w-full px-4 py-2 rounded-lg font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2 focus:outline ${darkMode ? 'bg-[#302E30] text-white focus:border-white' : 'bg-gray-100 text-black focus:border-black'}`}
                                type="text"
                                placeholder="Enter your tags"
                            />
                            {formik.touched.tags && formik.errors.tags && (
                                <p className="text-red-500 text-sm mt-1">{formik.errors.tags}</p>
                            )}
                            <input
                                {...formik.getFieldProps('category')}
                                className={`w-full px-4 py-2 rounded-lg font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2 focus:outline ${darkMode ? 'bg-[#302E30] text-white focus:border-white' : 'bg-gray-100 text-black focus:border-black'}`}
                                type="text"
                                placeholder="Category"
                            />
                            {formik.touched.category && formik.errors.category && (
                                <p className="text-red-500 text-sm mt-1">{formik.errors.category}</p>
                            )}
                            <input
                                {...formik.getFieldProps('resolution')}
                                className={`w-full px-4 py-2 rounded-lg font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2 focus:outline ${darkMode ? 'bg-[#302E30] text-white focus:border-white' : 'bg-gray-100 text-black focus:border-black'}`}
                                type="text"
                                placeholder="Resolution"
                            />
                            {formik.touched.resolution && formik.errors.resolution && (
                                <p className="text-red-500 text-sm mt-1">{formik.errors.resolution}</p>
                            )}

                            <input
                                {...formik.getFieldProps('price')}
                                className={`w-full px-4 py-2 rounded-lg font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2 focus:outline ${darkMode ? 'bg-[#302E30] text-white focus:border-white' : 'bg-gray-100 text-black focus:border-black'}`}
                                type="number"
                                placeholder="Your price"
                            />
                            {formik.touched.price && formik.errors.price && (
                                <p className="text-red-500 text-sm mt-1">{formik.errors.price}</p>
                            )}

                            {/* Profile Picture Upload */}
                            <div className="flex flex-col">
                                <label htmlFor="hero" className="text-sm text-gray-500"> Profile Picture</label>
                                <input
                                    type="file"
                                    onChange={(e) => formik.setFieldValue("hero", e.target.files[0])}
                                    className="w-full px-4 py-2 rounded-lg font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2 focus:outline bg-gray-100 text-black"
                                />
                                {formik.touched.hero && formik.errors.hero && (
                                    <p className="text-red-500 text-sm mt-1">{formik.errors.hero}</p>
                                )}
                            </div>

                            {/* Existing or New Hero Image */}
                            {selectedImage ? (
                                <>
                                    {selectedImage?.hero.map((item) => (
                                        <div key={item} className="mb-4">
                                            <div
                                                className={`${remove.includes(item) ? "border border-red-500" : ""} flex justify-between items-center p-4 bg-gray-800 rounded-md`}
                                            >
                                                <img src={item} className="h-24 w-auto rounded-md object-cover" alt="Preview" />
                                                {remove.includes(item) ? (
                                                    <button
                                                        type='button'
                                                        onClick={() => setRemove(remove.filter((r) => item !== r))}
                                                        className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                                                    >
                                                        Cancel
                                                    </button>
                                                ) : (
                                                    <button
                                                        type='button'
                                                        onClick={() => {
                                                            if (!remove.includes(item)) {
                                                                setRemove([...remove, item]);
                                                            }
                                                        }}
                                                        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                                                    >
                                                        Remove
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    ))}


                                    {newHero ? (
                                        <>
                                            <input
                                                type="file"
                                                multiple
                                                onChange={(e) => {
                                                    const x = [];
                                                    for (const item of e.target.files) {
                                                        x.push(URL.createObjectURL(item));
                                                    }
                                                    setPreview(x);
                                                    formik.setFieldValue("hero", e.target.files);
                                                }}
                                                className={`w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                            />
                                            <button
                                                onClick={() => setNewHero(false)}
                                                className="mt-2 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                                            >
                                                Cancel
                                            </button>
                                        </>
                                    ) : (
                                        <button
                                            onClick={() => setNewHero(true)}
                                            className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                                        >
                                            Add New Image
                                        </button>
                                    )}
                                </>
                            ) : (
                                <>
                                    <input
                                        type="file"
                                        multiple
                                        onChange={(e) => {
                                            const x = [];
                                            for (const item of e.target.files) {
                                                x.push(URL.createObjectURL(item));
                                            }
                                            formik.setFieldValue("hero", e.target.files);
                                            setPreview(x);
                                        }}
                                        className={`w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                        placeholder="Upload Product Images"
                                    />
                                </>
                            )}

                            {/* Preview of selected images */}
                            {preview.map((item) => (
                                <img src={item} height={50} alt="" key={item} />
                            ))}

                            {/* Submit Button */}
                            {selectedImage ? (
                                <button
                                    type="submit"
                                    className="mt-5 tracking-wide font-semibold bg-[#82cb2f] text-gray-100 w-full py-3 rounded-lg hover:bg-[#E9522C]/90 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                                >
                                    <span className="ml-3">Update Image</span>
                                </button>
                            ) : (
                                <button
                                    type="submit"
                                    className="mt-5 tracking-wide font-semibold bg-[#E9522C] text-gray-100 w-full py-3 rounded-lg hover:bg-[#E9522C]/90 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                                >
                                    <span className="ml-3">Add Photo</span>
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </form>



        <table className="min-w-full bg-gray-800 border border-gray-700 rounded-lg shadow-md">
            <thead>
                <tr className="bg-gray-700 text-white">
                    <th className="px-4 py-2 text-left">Title</th>
                    <th className="px-4 py-2 text-left">Description</th>
                    <th className="px-4 py-2 text-left">Tags</th>
                    <th className="px-4 py-2 text-left">Category</th>
                    <th className="px-4 py-2 text-left">Resolution</th>
                    <th className="px-4 py-2 text-left">URL</th>
                    <th className="px-4 py-2 text-left">Hero</th>
                    <th className="px-4 py-2 text-left">Price</th>
                    <th className="px-4 py-2 text-center">Action</th>
                </tr>
            </thead>
            <tbody className="text-gray-300">
                {data && data.map((item) => (
                    <tr key={item._id} className="border-b border-gray-700 hover:bg-gray-700">
                        <td className="px-4 py-2">{item.title}</td>
                        <td className="px-4 py-2">{item.description}</td>
                        <td className="px-4 py-2">{item.tags}</td>
                        <td className="px-4 py-2">{item.category}</td>
                        <td className="px-4 py-2">{item.resolution}</td>
                        <td className="px-4 py-2">
                            <a
                                href={item.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-400 hover:underline"
                            >
                                View
                            </a>
                        </td>
                        <td className="px-4 py-2 flex flex-wrap gap-2">
                            {item.hero.map((h) => (
                                <img
                                    key={h}
                                    src={h}
                                    alt="Hero"
                                    className="h-12 w-12 rounded-md object-cover border border-gray-600"
                                />
                            ))}
                        </td>
                        <td className="px-4 py-2">{item.price}</td>
                        <td className="px-4 py-2 text-center space-x-2">
                            <button
                                onClick={() => seTSelectedImage(item)}
                                className="px-3 py-1 bg-yellow-500 text-black rounded-md hover:bg-yellow-600 transition duration-300"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => deleteImage(item._id)}
                                className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-300"
                            >
                                Remove
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>

    </>
}

export default AddPhoto