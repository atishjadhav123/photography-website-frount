import Contact from "../../peges/contact/Contact"
import Footer from "../../peges/Footer"
import Service from "../../peges/Service"
import PublicNavbar from "./PublicNavbar"
import LazyLoad from "react-lazyload";

const PublicLayout = () => {
  return <LazyLoad>
    <PublicNavbar />
    <Service />
    <Contact />
    <Footer />
  </LazyLoad>
}

export default PublicLayout