import { useEffect, useState } from 'react'
import '../css/Sidebar.css'
import menus from '../common/menus'
import { FaWarehouse, FaBlog } from 'react-icons/fa'
import { MdCategory, MdGroups2, MdDashboard } from 'react-icons/md'
import { useLocation, useNavigate } from 'react-router-dom'
function Sidebar() {
    const navigate = useNavigate()
    const location = useLocation()
    const [curTab, setCurTab] = useState('dashboard')
    const menu = menus.adminMenu()
    useEffect(() => {
        const curPathName = location.pathname.substring(7)
        const matchedMenuItem = menu.find(item => item.path === curPathName)

        if (matchedMenuItem) setCurTab(matchedMenuItem.name)
        else setCurTab('')

    }, [location.pathname, menu])


    function changeRoute(route, path) {
        navigate(`/admin/${path}`)
        setCurTab(route)
    }
    return (
        <nav className="main-menu">
            <ul>
                <li className={`${curTab == 'dashboard' ? 'active' : ''}`} onClick={() => changeRoute('dashboard', 'admin-dashboard')}>
                    <div className='link-text'>
                        <MdDashboard className='nav-icon' />
                        <span className="nav-text">Bảng điều khiển</span>
                    </div>
                </li>
                <li className={`${curTab == 'warehouses' ? 'active' : ''}`} onClick={() => changeRoute('warehouses', 'admin-warehouses')}>
                    <div className='link-text'>
                        <FaWarehouse className='nav-icon' />
                        <span className="nav-text">Nhà kho</span>
                    </div>
                </li>

                <li className={`${curTab == 'categories' ? 'active' : ''}`} onClick={() => changeRoute('categories', 'admin-categories')}>
                    <div className='link-text'>
                        <MdCategory className='nav-icon' />
                        <span className="nav-text">Danh mục</span>
                    </div>
                </li>

                <li className={`${curTab == 'partners' ? 'active' : ''}`} onClick={() => changeRoute('partners', 'admin-partners')}>
                    <div className='link-text'>
                        <MdGroups2 className='nav-icon' />
                        <span className="nav-text">Đối tác</span>
                    </div>
                </li>

                <li className={`${curTab == 'blogs' ? 'active' : ''}`} onClick={() => changeRoute('blogs', 'admin-blogs')}>
                    <div className='link-text'>
                        <FaBlog className='nav-icon' />
                        <span className="nav-text">Bài viết</span>
                    </div>
                </li>
            </ul>

            <ul className="logout">
                {/* <li>
                    <a href="#">
                        <i className="fa fa-cogs nav-icon"></i>
                        <span className="nav-text">Settings</span>
                    </a>
                </li>

                <li>
                    <a href="#">
                        <i className="fa fa-right-from-bracket nav-icon"></i>
                        <span className="nav-text">
                            Logout
                        </span>
                    </a>
                </li> */}
            </ul>
        </nav>
    )
}

export default Sidebar