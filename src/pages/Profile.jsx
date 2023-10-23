import { useEffect, useRef, useState } from 'react'
import '../css/Profile.css'
import { FaMoneyBillTransfer } from 'react-icons/fa6'
import { useDispatch, useSelector } from 'react-redux'
import { AiOutlineCamera } from 'react-icons/ai'
import { storage } from '../firebase'
import noti from '../common/noti'
import func from '../common/func'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { changeLoadingState } from '../reducers/SystemReducer'
import API from '../API'
function Profile() {
  const user = useSelector(state => state.auth)
  const fileInputRef = useRef(null)
  const dispatch = useDispatch()
  const [indexTab, setIndexTab] = useState(0)
  const [listOrder, setListOrder] = useState([])
  const listTab = [
    { id: 0, name: 'Tổng quan' },
    { id: 1, name: 'Lịch sử thuê kho' },
  ]
  const [name, setName] = useState(user.auth?.fullName)
  const [username, setUsername] = useState(user.auth?.username)
  const [email, setEmail] = useState(user.auth?.email)
  const [phone, setPhone] = useState(user.auth?.phone || '')
  const [isShowChangeAvt, setIsShowAvt] = useState(false)
  const [isOpenPopup, setIsOpenPopup] = useState(false)
  const [tmpImg, setTmpImg] = useState('')


  useEffect(() => {
    dispatch(changeLoadingState(true))
    API.getOrder()
      .then(res => {
        dispatch(changeLoadingState(false))
        setListOrder(res.data)
      })
      .catch(err => {
        dispatch(changeLoadingState(false))
      })
  }, [])
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

  const handleParentClick = () => {
    cancelAll()
  }
  const handleChildClick = (event) => {
    event.stopPropagation()
  }

  const cancelAll = () => {
    setIsOpenPopup(false)
  }


  const openPopup = () => {
    setIsOpenPopup(true)
    setTmpImg(user.auth?.avatar != 'null' ? user.auth?.avatar : 'https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png')
  }

  const changeImageProfile = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const temporaryImageURL = event.target.result
        setTmpImg(temporaryImageURL)
      }
      reader.readAsDataURL(file)
    }
  }

  const getDetailOrder = (id) => {
    API.getOderById(id)
      .then(res => {
      })
      .catch(err => {
      })
  }

  const saveImage = () => {
    dispatch(changeLoadingState(true))
    const file = fileInputRef.current.files[0]
    if (file) {
      const timestamp = new Date().getTime()
      const fileName = `${timestamp}_${file.name}`
      const storageRef = ref(storage, 'images/' + fileName)

      uploadBytes(storageRef, file).then((snapshot) => {
        noti.success('Tải lên thành công')
        dispatch(changeLoadingState(false))
        cancelAll()
        getDownloadURL(storageRef).then((downloadURL) => {
          // console.log('URL tải về:', downloadURL)
          // Làm gì đó với URL tải về, có thể lưu vào cơ sở dữ liệu của bạn.
        })
      }).catch((error) => {
        console.error('Lỗi khi tải lên:', error)
      })
    } else noti.error('Bạn phải chọn lại ảnh mới để tải lên')
  }
  return (
    <div className="w-full bg-[#f9f5f1] min-h-screen">
      <div className="w-full md:h-[250px] lg:h-[300px] bg-custom pt-5">
        <div className="w-full h-[70%] flex items-center justify-start">
          <div onClick={openPopup} className='h-[150px] w-[150px] overflow-hidden rounded-full ml-5 relative'>
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
          <div className='w-[90%] mx-auto grid grid-cols-12 gap-3'>
            {listOrder.length == 0
              ? <p className='text-center font-bold text-[#666]'>Không có dữ liệu</p>
              : listOrder.map(item => (
                <div key={item.id} className='my-2 p-3 col-span-12 md:col-span-6 lg:col-span-4 flex items-center justify-between shadow-lg flex-wrap flex-col lg:flex-row'>
                  <div className='flex items-start justify-around w-full mb-2'>
                    <FaMoneyBillTransfer className={`text-[24px] ${item?.orderStatus == 1 ? 'text-green-500' : 'text-red-500'}`} />
                    <span className='font-bold'>- {func.convertVND(item?.deposit)}</span>
                  </div>
                  <div className='flex items-center justify-between w-full'>
                    <span>Trạng thái</span>
                    <span className={`font-bold ${item?.paymentStatus == 'Waiting' ? 'text-orange-500' : item?.paymentStatus == 'Fail' ? 'text-gray-500' : 'text-green-500'}`}>
                      {item?.paymentStatus == 'Waiting' ? 'Đang đợi' : 'Thành công'}
                    </span>
                  </div>
                  <div className='flex items-center justify-between w-full'>
                    <span>Tài khoản/thẻ</span>
                    <span className='font-bold'>Ví MoMo</span>
                  </div>
                  <div className='flex items-center justify-between w-full'>
                    <span>Tổng phí</span>
                    <span className='font-bold'>Miễn phí</span>
                  </div>
                  <div className='line block'></div>
                  <div className='flex items-center justify-between w-full'>
                    <span>Loại kho</span>
                    <span className='font-bold'>{`${item?.width} x ${item?.depth} x ${item?.height} ${item?.unitType}`}</span>
                  </div>
                  <div className='flex items-center justify-between w-full'>
                    <span>Mệnh giá</span>
                    <span className='font-bold'>{func.convertVND(item?.warehousePrice)} </span>
                  </div>
                  <div className='flex items-center justify-between w-full'>
                    <span>Phí dịch vụ</span>
                    <span className='font-bold'>{func.convertVND(item?.servicePrice)}</span>
                  </div>
                  <div className="line"></div>
                  <div className='flex items-center justify-between w-full'>
                    <span>Tổng cuộc gọi</span>
                    <span className='font-bold'>{item?.totalCall}</span>
                  </div>
                  <div className='flex items-center justify-between w-full'>
                    <span>Kết nối trong ngày</span>
                    <span className='font-bold'>{item?.contactInDay == false ? 'Không' : 'Có'}</span>
                  </div>
                </div>
              ))}
          </div>

        </div>
      </div>

      {
        isOpenPopup
          ? <div className='fog' onClick={handleParentClick}>
            <div className='w-full md:w-[60%] bg-white rounded-lg p-2' onClick={handleChildClick}>
              <div className='w-[300px] h-[300px] lg:w-[450px] lg:h-[450px] rounded-full overflow-hidden mx-auto'>
                <img className='w-full' src={tmpImg} alt="" />
              </div>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleImageChange}
              />
              <div className='w-full flex lg:w-[50%] items-center mx-auto justify-between mt-4'>
                <button onClick={cancelAll} className='w-[49%] btn-cancel px-3 py-1 rounded-md mr-2'>Huỷ</button>
                <button onClick={saveImage} className='w-[49%] btn-primary px-3 py-1 rounded-md'>Lưu ảnh</button>
              </div>
              <button onClick={changeImageProfile} className='btn-secondary block mx-auto mt-4 px-3 py-1 rounded-md w-full lg:w-[50%]'>Tải hình ảnh lên</button>
            </div>
          </div>
          : null
      }
    </div>
  )
}

export default Profile