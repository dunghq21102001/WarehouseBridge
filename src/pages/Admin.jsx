import { Route, Routes } from "react-router-dom"
import AdminHeader from "../components/AdminHeader"
import AdminBlog from '../pages/Admin/AdminBlog'
import AdminWarehouse from '../pages/Admin/AdminWarehouse'
import AdminCategory from '../pages/Admin/AdminCategory'
import AdminPartner from '../pages/Admin/AdminPartner'
import Sidebar from "../components/Sidebar"
import { useEffect, useState } from "react"
import Dashboard from "./Admin/Dashboard"
function Admin() {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    useEffect(() => {
        handleResize()

        window.addEventListener("resize", handleResize)
        return () => {
            window.removeEventListener("resize", handleResize)
        }
    }, [])

    const handleResize = () => {
        // if (window.innerWidth > 767) setWindowWidth(window.innerWidth - 60)
        // else setWindowWidth(window.innerWidth)
        setWindowWidth(window.innerWidth - 60)
    }


    return (
        <div className="w-full ">
            <Sidebar />
            <AdminHeader />
            <div className="float-right" style={{ width: `${windowWidth}px` }}>
                <Routes>
                    <Route index path="/admin-dashboard" element={<Dashboard />} />
                    <Route path="/admin-warehouses" element={<AdminWarehouse />} />
                    <Route path="/admin-categories" element={<AdminCategory />} />
                    <Route path="/admin-partners" element={<AdminPartner />} />
                    <Route path="/admin-blogs" element={<AdminBlog />} />
                </Routes>
            </div>
        </div>
    )
}

export default Admin