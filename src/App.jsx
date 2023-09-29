import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Header from './components/Header'
import About from './pages/About'
import Login from './pages/Login'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import Partner from './pages/Partner'
import Warehouse from './pages/Warehouse'
import News from './pages/News'
import Contact from './pages/Contact'
import WarehouseList from './pages/WarehouseList'
import Profile from './pages/Profile'
import PartnerProfile from './pages/PartnerProfile'
import WarehouseDetail from './pages/WarehouseDetail'
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import LoadingLocal from './components/LoadingLocal'
import { useSelector } from 'react-redux'
import ConfirmEmail from './pages/ConfirmEmail'
function App() {
  const system = useSelector(state => state.system)


  return (
    <>
      <div className='w-full'>
        <Header />
        <div className='w-full min-h-screen'>
          <ScrollToTop />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/partner' element={<Partner />} />
            <Route path='/warehouse' element={<Warehouse />} />
            <Route path='/warehouse/:name' element={<WarehouseList />} />
            <Route path='/warehouse-detail/:id' element={<WarehouseDetail />} />
            <Route path='/news' element={<News />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/profile/:pnname' element={<PartnerProfile />} />
            <Route path='/login' element={<Login />} />
            <Route path='/ConfirmEmail' element={<ConfirmEmail />} />
          </Routes>
        </div>
        <Footer />
        <ToastContainer />
        {system?.loading == true ? <LoadingLocal /> : ''}
      </div>
    </>
  )
}

export default App
