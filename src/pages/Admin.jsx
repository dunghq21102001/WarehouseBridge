import { useDispatch } from 'react-redux'
import logo from '../assets/images/fav.png'
import { Menu } from '@headlessui/react'
import { authen } from '../reducers/UserReducer'
import noti from '../common/noti'

function Admin() {
    const dispatch = useDispatch()
    function logout() {
        dispatch(authen(null))
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        noti.success('Đăng xuất thành công')
    }
    return (
        <div className="w-full ">
            <div className="bg-white shadow-lg flex justify-end md:justify-between px-5">
                <div className='w-[18%] flex items-center'>
                <img src={logo} alt="" className='w-full hidden md:block' />
                </div>
                <div className='w-[20%] h-[100px] relative'>
                    <Menu>
                        <Menu.Button className="absolute top-[50%] translate-y-[-50%] bottom-0 right-0 md:right-5 flex items-center justify-center cursor-pointer text-[16px] text-white overflow-hidden w-[60px] h-[60px]">
                            <img src='https://static.vecteezy.com/system/resources/thumbnails/009/734/564/small/default-avatar-profile-icon-of-social-media-user-vector.jpg' className='rounded-full object-fill' alt='' />
                        </Menu.Button>
                        <Menu.Items className="absolute top-[80%] min-w-[150px] right-2 md:right-8 flex flex-col items-end bg-gray-100 text-black py-1 shadow-md">
                            <Menu.Item>
                                {({ active }) => (
                                    <p
                                        className={`${active ? 'bg-[#fea116] text-white p-1 cursor-pointer w-full text-right' : 'p-1 cursor-pointer w-full text-right'}`}
                                        onClick={logout}>
                                        Đăng xuất
                                    </p>
                                )}
                            </Menu.Item>
                        </Menu.Items>
                    </Menu>
                </div>
            </div>
            {/* menu */}
            <div className='w-full flex items-center justify-around flex-wrap'>

            </div>
        </div>
    )
}

export default Admin