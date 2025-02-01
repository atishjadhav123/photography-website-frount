import { useFormik } from 'formik'
import { useEffect, useState } from 'react'
import * as yup from 'yup'
import { toast } from 'react-toastify'
import { useRegisterUserMutation } from '../redux/authApi'
import { Link } from 'react-router-dom'

const Register = () => {
  const [registerUser, { isSuccess, isLoading, isError, error }] = useRegisterUserMutation()
  const [darkMode, setDarkMode] = useState(false)


  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      mobile: '',
      password: '',
      profilePicture: '',
      role: '',
    },
    validationSchema: yup.object({
      name: yup.string().required('Name is required'),
      email: yup.string().email('Invalid email').required('Email is required'),
      mobile: yup.string().required('Mobile number is required'),
      password: yup.string().required('Password is required'),
      profilePicture: yup.string().required('Profile picture is required'),
      role: yup.string().required('role is required'),
    }),
    onSubmit: (values, { resetForm }) => {
      const fd = new FormData()
      fd.append('name', values.name)
      fd.append('email', values.email)
      fd.append('mobile', values.mobile)
      fd.append('role', values.role)
      fd.append('password', values.password)
      fd.append('profilePicture', values.profilePicture)

      registerUser(fd)
      resetForm()
    }
  })

  useEffect(() => {
    if (isSuccess) {
      toast.success('Registration successful')
    }
  }, [isSuccess])

  if (isLoading) return <h3 className='spinner-border'></h3>
  if (isError) return <h3>Failed to add profile: {error?.message}</h3>

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div className="flex flex-col justify-center items-center w-full h-[600px] bg-[#282D2D] px-4 sm:px-5">
          <div className={`xl:max-w-3xl ${darkMode ? 'bg-black' : 'bg-white'} w-full p-4 sm:p-6 rounded-md`}>
            <h1 className={`text-center text-xl sm:text-2xl font-semibold ${darkMode ? 'text-white' : 'text-black'}`}>
              Register for a free account
            </h1>
            <div className="flex flex-col items-end justify-start overflow-hidden mb-2 xl:max-w-3xl w-full">
              <div className="flex">
                <h3 className="text-white">Dark Mode : &nbsp</h3>
                <label className="inline-flex relative items-center mr-5 cursor-pointer">
                  <input type="checkbox" className="sr-only peer" checked={darkMode} readOnly />
                  <div
                    onClick={() => {
                      setDarkMode(!darkMode)
                    }}
                    className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-green-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"
                  ></div>
                </label>
              </div>
            </div>
            <div className="w-full mt-6">
              <div className="mx-auto max-w-xs sm:max-w-md flex flex-col gap-4">
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    {...formik.getFieldProps('name')}
                    className={`w-full px-4 py-2 rounded-lg font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2 focus:outline ${darkMode ? 'bg-[#302E30] text-white focus:border-white' : 'bg-gray-100 text-black focus:border-black'}`}
                    type="text"
                    placeholder="Your name"
                  />
                  {formik.touched.name && formik.errors.name && (
                    <p className="text-red-500 text-sm mt-1">{formik.errors.name}</p>
                  )}
                </div>
                <input
                  {...formik.getFieldProps('email')}
                  className={`w-full px-4 py-2 rounded-lg font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2 focus:outline ${darkMode ? 'bg-[#302E30] text-white focus:border-white' : 'bg-gray-100 text-black focus:border-black'}`}
                  type="email"
                  placeholder="Enter your email"
                />
                {formik.touched.email && formik.errors.email && (
                  <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
                )}
                <input
                  {...formik.getFieldProps('mobile')}
                  className={`w-full px-4 py-2 rounded-lg font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2 focus:outline ${darkMode ? 'bg-[#302E30] text-white focus:border-white' : 'bg-gray-100 text-black focus:border-black'}`}
                  type="tel"
                  placeholder="Enter your phone"
                />
                {formik.touched.mobile && formik.errors.mobile && (
                  <p className="text-red-500 text-sm mt-1">{formik.errors.mobile}</p>
                )}
                <div className="w-full max-w-xs sm:max-w-md mx-auto flex flex-col gap-4">
                  <label htmlFor="role" className="text-sm font-semibold text-gray-700">Select Role</label>
                  <select
                    {...formik.getFieldProps('role')}
                    // id="role"
                    // value={role}
                    // onChange={handleRoleChange}
                    className="w-full px-4 py-2 rounded-lg font-medium border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Choose a role</option>
                    <option value="user">User</option>

                  </select>
                  {formik.touched.role && formik.errors.role && (
                    <p className="text-red-500 text-sm mt-1">{formik.errors.role}</p>
                  )}
                </div>
                <input
                  {...formik.getFieldProps('password')}
                  className={`w-full px-4 py-2 rounded-lg font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2 focus:outline ${darkMode ? 'bg-[#302E30] text-white focus:border-white' : 'bg-gray-100 text-black focus:border-black'}`}
                  type="password"
                  placeholder="Password"
                />
                {formik.touched.password && formik.errors.password && (
                  <p className="text-red-500 text-sm mt-1">{formik.errors.password}</p>
                )}

                {/* Profile Picture Upload */}
                <div className="flex flex-col">
                  <label htmlFor="profilePicture" className="text-sm text-gray-500">Upload Profile Picture</label>
                  <input
                    type="file"
                    onChange={(e) => formik.setFieldValue("profilePicture", e.target.files[0])}
                    className="w-full px-4 py-2 rounded-lg font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2 focus:outline bg-gray-100 text-black"
                  />
                  {formik.touched.profilePicture && formik.errors.profilePicture && (
                    <p className="text-red-500 text-sm mt-1">{formik.errors.profilePicture}</p>
                  )}
                </div>

                <button
                  type="submit"
                  className="mt-5 tracking-wide font-semibold bg-[#E9522C] text-gray-100 w-full py-3 rounded-lg hover:bg-[#E9522C]/90 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                >
                  <span className="ml-3">Register</span>
                </button>
                <p className="mt-6 text-xs text-gray-600 text-center">
                  Already have an account?{' '}
                  <Link to="/login">
                    <span className="text-[#E9522C] font-semibold">Login</span>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  )
}

export default Register
