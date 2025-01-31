import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { useLogoutUserMutation } from "../../redux/authApi"
import { useEffect, useState } from "react"
import { CiLogin } from "react-icons/ci"
import { CgProfile } from "react-icons/cg"
import LazyLoad from "react-lazyload"
import { toast } from "react-toastify"
import GetAllPhotos from "../../peges/GetAllPhotos"
import grafix3 from "../../assets/graf (3).jpeg"
import nature4 from "../../assets/nature (4).jpg"
import nature5 from "../../assets/nature (5).jpg"
import nature6 from "../../assets/nature (6).jpg"
import nature7 from "../../assets/nature (7).jpg"
import nature8 from "../../assets/nature (8).jpg"
import nature9 from "../../assets/nature (9).jpg"
import nature10 from "../../assets/nature (10).jpg"
import nature12 from "../../assets/nature (12).jpg"
import nature13 from "../../assets/nature (13).jpg"


const PublicNavbar = () => {
  const { user } = useSelector(state => state.auth)
  const [logout, { isSuccess }] = useLogoutUserMutation()
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const toggleProfile = () => setIsProfileOpen(!isProfileOpen)
  const [menuOpen, setMenuOpen] = useState(false)
  const toggleMenu = () => setMenuOpen(!menuOpen)
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0)
  const images = [
    nature4,
    nature5,
    nature6,
    nature7,
    nature8,
    nature9,
    nature10,
    nature12,
    nature13,

  ]
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [images.length])
  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("logout succcess")
    }
  }, [isSuccess])


  return <>
    <header>
      <nav className=" navbarsticky shadow sticky top-0 bg-white z-50">
        <div className="flex justify-between items-center py-5 container mx-auto">
          <div>
            <h1 className="text-2xl font-serif flex bg-gradient-to-tr from-indigo-600 to-green-600 bg-clip-text text-transparent hover:cursor-pointer">
              <img src={grafix3} alt="" className="h-10 w-10 animate-pulse" />
              Photography
            </h1>
          </div>

          <div className="flex items-center ">
            {/* Mobile menu toggle */}
            <div className="hover:cursor-pointer sm:hidden" onClick={toggleMenu}>
              <span className="h-1 rounded-full block w-8 mb-1 bg-gradient-to-tr from-indigo-600 to-green-600"></span>
              <span className="h-1 rounded-full block w-8 mb-1 bg-gradient-to-tr from-indigo-600 to-green-600"></span>
              <span className="h-1 rounded-full block w-8 mb-1 bg-gradient-to-tr from-indigo-600 to-green-600"></span>
            </div>

            {/* Desktop menu */}
            <div className="flex items-center">
              <ul className="sm:flex space-x-4 hidden items-center">
                <li><a href="#" className="text-gray-700 hover:text-indigo-600 text-md">Home</a></li>
                <li><a href="#" className="text-gray-700 hover:text-indigo-600 text-md">About</a></li>
                <li><a href="#services" className="text-gray-700 hover:text-indigo-600 text-md">Services</a></li>
                <li><a href="#contact" className="text-gray-700 hover:text-indigo-600 text-md">Contact</a></li>
              </ul>

              <div className="md:flex items-center hidden space-x-4 ml-8 lg:ml-12">
                <Link to="/login" className="text-gray-600 py-2 hover:cursor-pointer hover:text-indigo-600 font-serif flex items-center">Login <CiLogin /></Link>
                <div className="flex items-center gap-10">
                  <button
                    onClick={toggleProfile}
                    className=" flex items-center gap-1 btn-sm text-center font-serif hover:cursor-pointer px-4 rounded text-white bg-gradient-to-tr from-indigo-600 to-green-600"
                    aria-label="Toggle profile view"
                  >
                    View Profile
                    <CgProfile />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {user && ( // Check if the user is logged in
          <div className="md:flex items-center hidden space-x-4 ml-8 lg:ml-12">
            <Link to="/getallbooking">
              <button
                onClick={() => setIsOpen(true)}
                className="me-5 flex items-center gap-1 btn-sm text-center font-serif hover:cursor-pointer px-4 rounded text-white bg-gradient-to-tr from-indigo-600 to-green-600"
                aria-label="New Booking"
              >
                Your Booking
              </button>
            </Link>
          </div>
        )}
        {/* Mobile Menu */}
        {menuOpen && (
          <div className="sm:hidden bg-white p-4 absolute top-16 left-0 w-full shadow-md">
            <ul className="space-y-4">
              <Link to="/login" className="text-gray-600 py-2 hover:cursor-pointer hover:text-indigo-600 font-serif flex items-center">Login <CiLogin /></Link>
              <li><a href="#" className="text-gray-700 hover:text-indigo-600 text-md">Home</a></li>
              <li><a href="#" className="text-gray-700 hover:text-indigo-600 text-md">About</a></li>
              <li><a href="#services" className="text-gray-700 hover:text-indigo-600 text-md">Services</a></li>
              <li><a href="#contact" className="text-gray-700 hover:text-indigo-600 text-md">Contact</a></li>
              <li>
                <button
                  onClick={toggleProfile}
                  className="flex items-center bg-blue-800 text-white px-3 py-1 rounded-full text-sm hover:bg-blue-700 focus:outline-none"
                  aria-label="Toggle profile view"
                >
                  <h4 className="btn-sm py-1 hover:cursor-pointer px-4 rounded text-white bg-gradient-to-tr from-indigo-600 to-green-600 hover:shadow-lg">
                    View Profile
                  </h4>
                  <i className="bi bi-person-circle text-lg"></i>
                </button>
              </li>
            </ul>
          </div>
        )}
      </nav>

      {/* offcanwas */}
      <div className="">
        {/* Off-Canvas Profile */}
        <div
          className={`fixed top-0 right-0 h-full w-64 bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg transform transition-transform duration-300 ${isProfileOpen ? "translate-x-0" : "translate-x-full"
            }`}
          style={{ zIndex: 60 }}
        >
          <div className="flex items-center justify-between px-4 py-4 bg-gray-800">
            <h2 className="text-lg font-bold text-white">Your Profile</h2>
            <button
              className="text-gray-300 hover:text-white focus:outline-none"
              onClick={toggleProfile}
            >
              <i className="bi bi-x-lg text-lg"></i>
            </button>
          </div>

          <div className="px-4 py-6">
            <div className="flex flex-col items-center">
              <img
                className="h-20 w-20 rounded-full shadow-lg"
                src={`http://localhost:5000/uploads/${user?.profilePicture}`}
                alt="Profile"
              />
              <h3 className="mt-4 text-lg font-semibold text-gray-800">
                {user?.name}
                <p>{user?.email}</p>
              </h3>
            </div>

            <div className="mt-6">
              <button className="block w-full text-left bg-blue-600 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700">
                Edit Profile
              </button>
              <button
                onClick={() => logout({ role: user?.role })}
                className="mt-4 block w-full text-left bg-red-600 text-white px-4 py-2 rounded-md font-medium hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Overlay */}
        {isProfileOpen && (
          <div
            onClick={toggleProfile}
            className="fixed inset-0 bg-black bg-opacity-50"
            style={{ zIndex: 50 }} // Overlay should be below the off-canvas but above the content
          ></div>
        )}
      </div>
    </header>
    <main>
      <section>
        <div class="bg-gray-100 sm:grid grid-cols-5 grid-rows-1 px-4 py-24  min-h-full lg:min-h-screen space-y-6 sm:space-y-0 sm:gap-4">

          <div class="h-96 col-span-4 bg-gradient-to-tr from-indigo-800 to-indigo-500 rounded-md flex items-center">
            <div className=" w-96 carousel carousel-center rounded-box relative overflow-hidden">
              <div

                className="flex transition-transform duration-1000 ease-in-out"
                style={{
                  transform: `translateX(-${activeIndex * 50}%)`,
                  width: `${images.length * 100}%`,

                }}
              >
                {images.map((src, index) => (
                  <LazyLoad
                    key={index}
                    className="carousel-item flex-shrink-0 w-full h-48"
                    style={{ flex: "0 0 70%" }}
                  >
                    <img
                      src={src}
                      alt={`Slide ${index + 1}`}
                      className="w-[90%] h-[200px] object-cover"
                    />
                  </LazyLoad>
                ))}
              </div>
            </div>
            <div class="ml-20 w-80">
              <h2 class="text-white text-4xl">Photography</h2>
              <p class="text-indigo-100 mt-4 capitalize font-thin tracking-wider leading-7">
                Capture the beauty of life through the lens. Explore the art of photography, where moments become timeless.
              </p>

              <a href="#" class="uppercase inline-block mt-8 text-sm bg-white py-2 px-4 rounded font-semibold hover:bg-indigo-100">
                Get Started
              </a>
            </div>


          </div>
          <div class="h-96 col-span-1">
            {/* <!-- Search Bar --> */}
            <div class=" py-3 px-4 rounded-lg flex items-center relative bg-white">
              <input
                type="text"
                placeholder="Search"
                class="bg-gray-100 rounded-md outline-none pl-4 pr-3 ring-indigo-700 w-full sm:w-72 p-2"
              />
              <span class="absolute right-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </span>
            </div>


            {/* <!-- Service Section --> */}
            <div class="bg-white rounded-md mt-4">

              {/* <!-- Service List - Initially Hidden on Mobile --> */}
              <div id="service-list" class="bg-white rounded-md list-none text-center sm:block hidden">
                <li class="py-3 border-b-2"><a href="#services" class="list-none hover:text-indigo-600">Services</a></li>
                <li class="py-3 border-b-2"><a href="#" class="list-none hover:text-indigo-600">Models</a></li>
                <li class="py-3 border-b-2"><a href="#" class="list-none hover:text-indigo-600">Pricing</a></li>
                <li class="py-3 border-b-2"><a href="#" class="list-none hover:text-indigo-600">Hire</a></li>
                <li class="py-3"><a href="#" class="list-none hover:text-indigo-600">Business</a></li>
              </div>
            </div>
          </div>



        </div>

      </section>

    </main>

    <div className="  w-full h-[400px] carousel carousel-center relative overflow-hidden">
      <div
        className="flex transition-transform duration-1000 ease-in-out"
        style={{
          transform: `translateX(-${activeIndex * 100}%)`, // Full width shift
          width: `${images.length * 100}%`, // Ensures that all images are lined up horizontally
        }}
      >
        {images.map((src, index) => (
          <LazyLoad key={index} className="carousel-item flex-shrink-0 w-full h-full">
            <img
              src={src}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </LazyLoad>
        ))}
      </div>

      {/* Optional controls to navigate the carousel */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white text-3xl bg-black bg-opacity-50 p-2 rounded-full"
      >
        &#10094;
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white text-3xl bg-black bg-opacity-50 p-2 rounded-full"
      >
        &#10095;
      </button>
    </div>

    <GetAllPhotos />
  </>

}


export default PublicNavbar