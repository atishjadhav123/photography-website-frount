import { useSelector } from "react-redux"
import { useLogoutUserMutation } from "../../redux/authApi"
import { useEffect } from "react"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

const AdminNavbar = () => {
  const navigate = useNavigate()
  const { admin } = useSelector(state => state.auth)
  const [logout, { isSuccess }] = useLogoutUserMutation()

  useEffect(() => {
    if (isSuccess) {
      toast.success("admin logout suceess")
      navigate("/login")
    }
  }, [isSuccess])
  return <>
    <nav className="bg-gray-100">
      <div className="container mx-auto flex items-center justify-between px-4 py-2">
        <a className="text-lg font-semibold" href="#">Navbar</a>
        <button
          className="text-gray-500 md:hidden focus:outline-none"
          aria-expanded="false"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>
        <div className="hidden w-full md:flex md:w-auto" id="navbarNavAltMarkup">
          <div className="flex flex-col md:flex-row md:space-x-4">
            <a
              className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              href="#"
            >
              Home
            </a>
            <a
              className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              href="#"
            >
              Features
            </a>
            <a
              className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              href="#"
            >
              Pricing
            </a>
            <button onClick={e => logout({ role: admin?.role })} className="text-text-gray-600  py-2 hover:cursor-pointer px-4 rounded text-white bg-gradient-to-tr from-indigo-600 to-green-600 hover:shadow-lg">Logout</button>

          </div>
        </div>
      </div>
    </nav>

  </>
}

export default AdminNavbar