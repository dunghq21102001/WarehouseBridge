import { useState } from 'react'
import '../css/Profile.css'
import { useSelector } from 'react-redux'
import { AiOutlineCamera } from 'react-icons/ai'
function Profile() {
  const user = useSelector(state => state.auth)

  const [indexTab, setIndexTab] = useState(0)
  const listTab = [
    { id: 0, name: 'Tổng quan' },
    { id: 1, name: 'Lịch sử thuê kho' },
  ]
  const [name, setName] = useState(user.auth?.fullName)
  const [username, setUsername] = useState(user.auth?.username)
  const [email, setEmail] = useState(user.auth?.email)
  const [phone, setPhone] = useState(user.auth?.phone || '')
  const [isShowChangeAvt, setIsShowAvt] = useState(false)

  const updateData = (type) => {
    switch (type) {
      case 'fullName':
        console.log('fullName')
        break
      case 'email':
        console.log('email')
        break
      case 'username':
        console.log('username')
        break
      case 'phone':
        console.log('phone')
        break


    }
  }
  return (
    <div className="w-full bg-[#f9f5f1] min-h-screen">
      <div className="w-full md:h-[250px] lg:h-[300px] bg-custom pt-5">
        <div className="w-full h-[70%] flex items-center justify-start">
          <div className='h-[150px] w-[150px] overflow-hidden rounded-full ml-5 relative'>
            <img onMouseOver={() => setIsShowAvt(true)} onMouseLeave={() => setIsShowAvt(false)} src={user.auth?.avatar != 'null' ? user.auth?.avatar : 'https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png'} className='w-full object-fill cursor-pointer' alt="" />
            {isShowChangeAvt
              ? <div onMouseOver={() => setIsShowAvt(true)} onMouseLeave={() => setIsShowAvt(false)} className='absolute w-full bg-black/60 h-[50px] bottom-0 flex justify-center items-center cursor-pointer'>
                <AiOutlineCamera className='text-white text-[24px]' />
              </div>
              : null}
          </div>
          <div className=' ml-10 text-[24px] text-white'>
            <p>{user.auth?.username}</p>
            <p>{user.auth?.listRoles[0]}</p>
          </div>
        </div>
        <div className='h-[30%] flex items-center justify-start flex-wrap px-5'>
          {listTab.map(i => (
            <div onClick={() => setIndexTab(i.id)} key={i.id} className={`text-white font-bold px-3 py-2 cursor-pointer hover:bg-[#ffffff1a] mr-3 ${i.id == indexTab ? 'active' : ''}`}>
              {i.name}
            </div>
          ))}
        </div>
      </div>

      {/* body */}
      <div className='w-full'>
        {/* tab 1 */}
        <div className={`w-[90%] mx-auto shadow-xl rounded-lg mt-5 bg-white p-4 ${indexTab == 0 ? 'block' : 'hidden'}`}>
          <span className='font-bold text-[30px]'>Thông tin cơ bản</span>
          <div className='w-full flex items-start'>
            <div className='w-[40%] flex-col flex items-start font-bold text-[14px]'>
              <span className='px-2 py-1'>Họ và Tên:</span>
              <span className='px-2 py-1'>Tên tài khoản:</span>
              <span className='px-2 py-1'>Email:</span>
              <span className='px-2 py-1'>Số điện thoại</span>
            </div>
            <div className='w-[60%] flex flex-col items-start'>
              <input type="text" className='w-full focus:outline-none focus:bg-[#ccc] px-2 rounded-md py-1' onChange={e => setName(e.target.value)} onBlur={() => updateData('fullName')} value={name} />
              <input type="text" className='w-full focus:outline-none focus:bg-[#ccc] px-2 rounded-md py-1' onChange={e => setUsername(e.target.value)} onBlur={() => updateData('username')} value={username} />
              <input type="text" className='w-full focus:outline-none focus:bg-[#ccc] px-2 rounded-md py-1' onChange={e => setEmail(e.target.value)} onBlur={() => updateData('email')} value={email} />
              <input type="text" className='w-full focus:outline-none focus:bg-[#ccc] px-2 rounded-md py-1' onChange={e => setPhone(e.target.value)} onBlur={() => updateData('phone')} value={phone} />
            </div>
          </div>
        </div>

        {/* tab 2 */}
        <div className={`w-[90%] mx-auto shadow-xl rounded-lg mt-5 bg-white p-4 ${indexTab == 1 ? 'block' : 'hidden'}`}>
          <span>Lịch sử thuê kho</span>

        </div>
      </div>
    </div>
  )
}

export default Profile