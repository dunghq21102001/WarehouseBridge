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
import { authen } from '../reducers/UserReducer'
import API from '../API'
function Profile() {
  const user = useSelector(state => state.auth)
  const fileInputRef = useRef(null)
  const dispatch = useDispatch()
  const [indexTab, setIndexTab] = useState(0)
  const [listOrder, setListOrder] = useState([])
  const [listWH, setListWH] = useState([])
  const listTab = [
    { id: 0, name: 'Tổng quan' },
    { id: 1, name: 'Kho đã thuê' },
    { id: 2, name: 'Lịch sử giao dịch' },
  ]
  const role = user.role
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [avt, setAvt] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [birthday, setBirthday] = useState('')
  const [dataUser, setDataUser] = useState({})
  const [pass, setPass] = useState('')
  const [passAgain, setPassAgain] = useState('')
  const [isShowChangeAvt, setIsShowAvt] = useState(false)
  const [isOpenPopup, setIsOpenPopup] = useState(false)
  const [tmpImg, setTmpImg] = useState('')


  useEffect(() => {
    dispatch(changeLoadingState(true))
    API.getOrder()
      .then(res => {
        dispatch(changeLoadingState(false))
        if (Array.isArray(res.data)) {
          setListOrder(res.data.reverse())
        } else setListOrder(res.data)

      })
      .catch(err => {
        dispatch(changeLoadingState(false))
      })
    fetchWH()
    fetchUser()
  }, [])

  function fetchUser() {
    API.getInfo()
      .then(res => {
        setDataUser(res?.data)
        setName(res?.data.fullname)
        setAddress(res?.data.address)
        setAvt(res?.data.avatar)
        setBirthday(res?.data.birthday)
        setEmail(res?.data.email)
        setPhone(res?.data.phoneNumber)
        setUsername(res?.data.userName)
      })
      .catch(err => { })
  }

  const fetchWH = () => {
    dispatch(changeLoadingState(true))
    API.rentWarehouseList()
      .then(res => {
        dispatch(changeLoadingState(false))
        setListWH(res.data)
      })
      .catch(err => {
        dispatch(changeLoadingState(false))
      })
  }

  const getUserAgain = () => {
    API.getInfo()
      .then(res => {
        dispatch(authen(res.data))
        setDataUser(res?.data)
        setName(res?.data.fullname)
        setAddress(res?.data.address)
        setAvt(res?.data.avatar)
        setBirthday(res?.data.birthday)
        setEmail(res?.data.email)
        setPhone(res?.data.phoneNumber)
        setUsername(res?.data.userName)
      })
      .catch(err => { })
  }
  const updateData = (type) => {

    switch (type) {
      case 'fullName':
        if (user.auth?.fullname != name) updateUser()
        break
      case 'email':
        if (user.auth?.email != email) updateUser()
        break
      case 'username':
        if (user.auth?.userName != username) updateUser()
        break
      case 'phone':
        if (user.auth?.phoneNumber != phone) updateUser()
        break
      case 'address':
        if (user.auth?.address != address) updateUser()
        break
      case 'birthday':
        if (user.auth?.birthday != birthday) updateUser()
        break
    }
  }

  const updateUser = () => {
    dispatch(changeLoadingState(true))
    API.updateInfo({
      userName: username,
      fullname: name,
      address: address,
      avatar: avt,
      birthday: birthday,
      email: email,
      phoneNumber: phone
    })
      .then(res => {
        noti.success(res.data)
        dispatch(changeLoadingState(false))
        getUserAgain()
      })
      .catch(err => {
        noti.error(err?.response?.data)
        dispatch(changeLoadingState(false))
      })
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
    setTmpImg(avt != 'null' ? avt : 'https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png')
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
    const file = fileInputRef.current.files[0]
    if (file) {
      dispatch(changeLoadingState(true))
      const timestamp = new Date().getTime()
      const fileName = `${timestamp}_${file.name}`
      const storageRef = ref(storage, 'images/' + fileName)

      uploadBytes(storageRef, file).then((snapshot) => {
        noti.success('Tải lên thành công')
        dispatch(changeLoadingState(false))
        cancelAll()
        getDownloadURL(storageRef).then((downloadURL) => {
          // console.log('URL tải về:', downloadURL)
          setAvt(downloadURL)
          // Làm gì đó với URL tải về, có thể lưu vào cơ sở dữ liệu của bạn.
        })
      }).catch((error) => {
        console.error('Lỗi khi tải lên:', error)
      })
    } else noti.error('Bạn phải chọn lại ảnh mới để tải lên')
  }

  const changePass = () => {
    if (pass != passAgain) return noti.error('Mật khẩu không khớp, vui lòng nhập lại mật khẩu!')
    if (pass.length < 6) return noti.error('Mật khẩu phải có ít nhất 6 ký tự!')
    if (passAgain.length < 6) return noti.error('Mật khẩu phải có ít nhất 6 ký tự!')
    if (!/[A-Z]/.test(pass)) return noti.error('Mật khẩu phải chứa ít nhất 1 chữ hoa!')
    if (!/[a-z]/.test(pass)) return noti.error('Mật khẩu phải chứa ít nhất 1 chữ thường!')
    if (!/\d/.test(pass)) return noti.error('Mật khẩu phải chứa ít nhất 1 số!')
    if (!/[!@#$%^&*]/.test(pass)) return noti.error('Mật khẩu phải chứa ít nhất 1 ký tự đặc biệt!')
    dispatch(changeLoadingState(true))
    API.changePass(pass, passAgain)
      .then(res => {
        // noti.success(res.data)
        noti.success('Đổi mật khẩu thành công')
        dispatch(changeLoadingState(false))
        setPass('')
        setPassAgain('')
      })
      .catch(err => {
        noti.error(err?.response?.data)
        dispatch(changeLoadingState(false))
      })

  }

  const getStatus = (status) => {
    let tmpStatus = ''
    switch (status) {
      case 'Success':
        tmpStatus = 'Thành công'
        break
      case 'Waiting':
        tmpStatus = 'Đang đợi'
        break
      case 'Fail':
        tmpStatus = 'Thất bại'
        break

      default:
        break
    }
    return tmpStatus
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
            <p>{username}</p>
            <p>{role}</p>
          </div>
        </div>
        <div className='h-[30%] flex items-center justify-start flex-wrap px-5 mt-2'>
          {listTab.map(i => (
            <div onClick={() => setIndexTab(i.id)} key={i.id} className={`text-white font-bold px-3 py-2 cursor-pointer  mr-1 lg:mr-3 ${i.id == indexTab ? 'active' : 'hover:bg-[#ffffff1a]'}`}>
              {i.name}
            </div>
          ))}
        </div>
      </div>

      {/* body */}
      <div className='w-full'>
        {/* tab 1 */}
        <div className={`w-[90%] mx-auto my-5 ${indexTab == 0 ? 'block' : 'hidden'}`}>
          <div className={`w-full shadow-xl rounded-lg mt-5 bg-white p-8`}>
            <span className='font-bold text-[30px]'>Thông tin cơ bản</span>
            <div className='w-full flex items-start'>
              <div className='w-[40%] flex-col flex items-start font-bold text-[14px] h-[200px] justify-between'>
                <span className='px-2 py-1'>Họ và Tên:</span>
                <span className='px-2 py-1'>Tên tài khoản:</span>
                <span className='px-2 py-1'>Email:</span>
                <span className='px-2 py-1'>Sinh nhật:</span>
                <span className='px-2 py-1'>Số điện thoại:</span>
                <span className='px-2 py-1'>Địa chỉ:</span>
              </div>
              <div className='w-[60%] flex flex-col items-start h-[200px] justify-between'>
                <input type="text" className='w-full focus:outline-none focus:bg-[#ccc] px-2 rounded-md py-1' onChange={e => setName(e.target.value)} onBlur={() => updateData('fullName')} value={name} />
                <input type="text" className='w-full focus:outline-none focus:bg-[#ccc] px-2 rounded-md py-1' onChange={e => setUsername(e.target.value)} onBlur={() => updateData('username')} value={username} />
                <input type="text" className='w-full focus:outline-none focus:bg-[#ccc] px-2 rounded-md py-1' onChange={e => setEmail(e.target.value)} onBlur={() => updateData('email')} value={email} />
                <input type="datetime-local" className='w-full focus:outline-none focus:bg-[#ccc] px-2 rounded-md py-1' onChange={e => setBirthday(e.target.value)} onBlur={() => updateData('birthday')} value={birthday} />
                <input type="text" className='w-full focus:outline-none focus:bg-[#ccc] px-2 rounded-md py-1' onChange={e => setPhone(e.target.value)} onBlur={() => updateData('phone')} value={phone} />
                <input type="text" className='w-full focus:outline-none focus:bg-[#ccc] px-2 rounded-md py-1' onChange={e => setAddress(e.target.value)} onBlur={() => updateData('address')} value={address} />
              </div>
            </div>
          </div>

          <div className={`w-full shadow-xl rounded-lg mt-5 bg-white p-8`}>
            <span className='font-bold text-[30px]'>Thông tin cơ bản</span>
            <div className='w-full flex items-start'>
              <div className='w-[40%] flex-col flex items-start font-bold text-[14px]'>
                <span className='px-2 py-1'>Nhập mật khẩu mới:</span>
                <span className='px-2 py-1 mt-5'>Nhập lại mật khẩu mới:</span>
              </div>
              <div className='w-[60%] flex flex-col items-end'>
                <input type="text" className='w-full focus:outline-none bg-gray-100 focus:bg-[#ccc] px-2 rounded-md py-1' onChange={e => setPass(e.target.value)} value={pass} />
                <input type="text" className='w-full mt-5 focus:outline-none bg-gray-100 focus:bg-[#ccc] px-2 rounded-md py-1' onChange={e => setPassAgain(e.target.value)} value={passAgain} />
                <button className='btn-primary mt-5 rounded-md px-3 py-1' onClick={changePass}>Lưu</button>
              </div>
            </div>
          </div>
        </div>

        {/* tab 2 */}
        <div className={`w-[90%] mx-auto shadow-xl rounded-lg mt-5 bg-white p-4 ${indexTab == 2 ? 'block' : 'hidden'}`}>
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
                      {/* {item?.paymentStatus == 'Waiting' ? 'Đang đợi' : 'Thành công'} */}
                      {getStatus(item?.paymentStatus)}
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

        {/* tab 3 */}
        <div className={`w-[90%] mx-auto shadow-xl rounded-lg mt-5 bg-white p-4 ${indexTab == 3 ? 'block' : 'hidden'}`}>
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
                      {/* {item?.paymentStatus == 'Waiting' ? 'Đang đợi' : 'Thành công'} */}
                      {getStatus(item?.paymentStatus)}
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