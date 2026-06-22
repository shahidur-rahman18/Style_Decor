import { Outlet } from 'react-router'
import Navbar from '../components/Shared/Navbar/Navbar'
import Footer from '../components/Shared/Footer/Footer'
import Hero from '../pages/Home/Hero'
const MainLayout = () => {
  return (
    <div>
      <Navbar />
      
      <div className='mt-[68px] min-h-[calc(100vh-68px)]'>
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default MainLayout
