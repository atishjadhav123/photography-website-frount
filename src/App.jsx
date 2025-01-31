import React, { Suspense, lazy } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/ReactToastify.css'
import { ErrorBoundary } from 'react-error-boundary'
const GetAllTransaction = lazy(() => import('./componants/photographer/GetAllTransaction'))
const BokkingFetch = lazy(() => import('./peges/photografher/BokkingFetch'))
const Getallbooking = lazy(() => import('./peges/Getallbooking'));
const ServiceDetail = lazy(() => import('./peges/ServiceDetail'))
const AddService = lazy(() => import('./peges/photografher/AddService'))
const Service = lazy(() => import('./peges/Service'))
const Footer = lazy(() => import('./peges/Footer'))
const Contact = lazy(() => import('./peges/contact/Contact'))
const ImageDetail = lazy(() => import('./peges/ImageDetail'))
const GetAllPhotos = lazy(() => import('./peges/GetAllPhotos'))
const AddPhoto = lazy(() => import('./peges/photografher/AddPhoto'))
const AddPhotoGrafher = lazy(() => import('./peges/admin/AddPhotoGrafher'))
const AdminProtected = lazy(() => import('./share/AdminProtected'))
const PhotoProtected = lazy(() => import('./share/PhotoProtected'))
const PhotoLayout = lazy(() => import('./componants/photographer/PhotoLayout'))
const Login = lazy(() => import('./peges/Login'))
const Register = lazy(() => import('./peges/Register'))
const PublicLayout = lazy(() => import('./componants/public/PublicLayout'))
const AdminLayout = lazy(() => import('./componants/admin/AdminLayout'))


const App = () => {
  const publicRoutes = [
    { path: 'login', element: <Login /> },
    { path: 'register', element: <Register /> },
    { path: 'getallphotos', element: <GetAllPhotos /> },
    { path: 'imagedetail/:id', element: <ImageDetail /> },
    { path: 'contact', element: <Contact /> },
    { path: 'footer', element: <Footer /> },
    { path: 'service', element: <Service /> },
    { path: 'servicedetail/:id', element: <ServiceDetail /> },
    { path: 'getallbooking', element: <Getallbooking /> },

  ]
  const adminRoutes = [
    { path: 'photografher', element: <AddPhotoGrafher /> },

  ]
  const photoGrapher = [
    { path: 'addphoto', element: <AddPhoto /> },
    { path: 'addservice', element: <AddService /> },
    { path: 'bookingfetch', element: <BokkingFetch /> },
    { path: 'getalltransaction', element: <GetAllTransaction /> },


  ]
  const ErrorFallback = ({ error, resetErrorBoundary }) => (
    <div>
      <h2>Something went wrong!</h2>
      <p>{error.message}</p>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  )

  return <>
    <ToastContainer />
    <BrowserRouter>
      <ErrorBoundary FallbackComponent={ErrorFallback} fall>
        <Suspense fallback={<div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>}>
          <Routes>
            <Route path="/" element={<PublicLayout />} />
            {publicRoutes.map(({ path, element }) => (
              <Route key={path} path={path} element={element} />
            ))}

            <Route path="/admin" element={<AdminProtected compo={<AdminLayout />} />}>
              {adminRoutes.map(({ path, element }) => (
                <Route key={path} path={path} element={element} />
              ))}
            </Route>
            <Route path="/photographer" element={<PhotoProtected compo={<PhotoLayout />} />}>
              {photoGrapher.map(({ path, element }) => (
                <Route key={path} path={path} element={element} />
              ))}
            </Route>

            <Route path="*" element={<h1>Page Not Found</h1>} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </BrowserRouter>
  </>
}


export default App