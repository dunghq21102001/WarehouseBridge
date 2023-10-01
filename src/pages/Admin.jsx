import { Route, Routes } from "react-router-dom"
import AdminHeader from "../components/AdminHeader"
import AdminBlog from '../pages/Admin/AdminBlog'
import AdminWarehouse from '../pages/Admin/AdminWarehouse'
import AdminCategory from '../pages/Admin/AdminCategory'
import AdminPartner from '../pages/Admin/AdminPartner'
function Admin() {

    return (
        <div className="w-full ">
            <AdminHeader />
            <div className="w-full">
                <Routes>
                    <Route index path="/admin-warehouses" element={<AdminWarehouse />} />
                    <Route path="/admin-categories" element={<AdminCategory/>} />
                    <Route path="/admin-partners" element={<AdminPartner />} />
                    <Route path="/admin-blogs" element={<AdminBlog />} />
                </Routes>
            </div>
        </div>
    )
}

export default Admin