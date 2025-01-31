import { Link } from "react-router-dom"

const AdminSidebar = () => {

  const LINKS = [
    { label: "AddPhotoGrafher", to: "/admin/photografher", },

  ]
  return <>
    <div
      className='bg-dark text-light'
      style={{
        width: "200px",
        height: "100vh",
        position: "fixed",
        top: "0",
        left: "0"
      }}>
      <div
        style={{ height: "55px" }}
        className='bg-primary d-flex justify-content-center align-items-center fs-4'>Flipkart-Lite</div>

      {LINKS.map(item => <div style={{ height: "55px" }}
        className='bg-light d-flex  align-items-center px-3'>
        <span className='text-dark me-2'>{item.icon}</span>
        <Link
          className='text-decoration-none text-dark text-uppercase'
          to={item.to}>
          {item.label}
        </Link>
      </div>)}
    </div>
  </>
}

export default AdminSidebar