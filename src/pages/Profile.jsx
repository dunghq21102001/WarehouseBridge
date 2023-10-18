import { useState } from 'react'
import '../css/Profile.css'
function Profile() {
  const [indexTab, setIndexTab] = useState(0)
  const listTab = [
    { id: 0, name: 'Tổng quan' },
    { id: 1, name: 'Lịch sử thuê kho' },
  ]
  return (
    <div className="w-full bg-[#f9f5f1] min-h-screen">
      <div className="w-full md:h-[250px] lg:h-[300px] bg-custom pt-5">
        <div className="w-full h-[70%] flex items-center justify-start">
          <div className='h-[150px] w-[150px] overflow-hidden rounded-full ml-5'>
            <img src="https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png" className='w-full object-fill' alt="" />
          </div>
          <div className=' ml-10 text-[24px] text-white'>
            <p>Hoang quoc dugn</p>
            <p>customer</p>
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
        <div className='w-[90%] mx-auto shadow-xl rounded-lg mt-5 bg-white p-4'>
          <span>Thông tin cơ bản</span>

        </div>
      </div>
    </div>
  )
}

export default Profile