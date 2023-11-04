import './App.css'
import AppRoutes from './Routes/AppRoutes'
import { Link } from 'react-router-dom'

function App() {

  return (
    <>
    <div className='container-fluid my-2'>
      <div className="row">
        {/* Clickable Logo that redirects to Home Page */}
        <Link to='/' className='col-2 m-auto'><img src='./assets/Images/logo.svg' alt='Logo' /></Link>
      </div>
    </div>
        {/* the router component that contains all routes */}
    <AppRoutes />
    </>
  )
}

export default App
