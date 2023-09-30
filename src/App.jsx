import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
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
import Admin from './pages/Admin'
function App() {
  const system = useSelector(state => state.system)
  const user = useSelector((state) => state.auth)

  const CheckAuth = ({ children }) => {
    if (user.auth && user.auth.listRoles[0] !== 'Admin') return <Navigate to={'/'} />
    else if (user.auth && user.auth.listRoles[0] === 'Admin') return <Navigate to={'/admin'} />
    return children
  }

  const CheckPermission = ({ children }) => {
    if (!user.auth || user.auth.listRoles[0] != 'Admin') return <Navigate to={'/'} />
    return children
  }

  const CheckIfAdmin = ({ children }) => {
    if (user.auth?.listRoles[0] == 'Admin') return <Navigate to={'/admin'} />
    return children
  }


  return (
    <>
      <div className='w-full'>
        {user.auth?.listRoles[0] == 'Admin' ? '' : <Header />}
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
            <Route path='/login' element={<CheckAuth><Login /></CheckAuth>} />
            <Route path='/ConfirmEmail' element={<ConfirmEmail />} />
            <Route path='/admin' element={<CheckPermission><Admin /></CheckPermission>} />
          </Routes>
        </div>
        {user.auth?.listRoles[0] == 'Admin' ? '' : <Footer />}
        <ToastContainer />
        {system?.loading == true ? <LoadingLocal /> : ''}
      </div>
    </>
  )
}

export default App
