import { useState } from 'react'
import image1 from '../assets/images/kho1.jpg'
import image2 from '../assets/images/kho2.jpg'
function Login() {
  const [isRegister, setIsRegister] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')

  const login = () => {
    if(username == 'dung' && password == '1') {
      setUsername('')
      setPassword('')
      return alert('ok') 
    }
  }

  const register = () => {

  }
  return (
    <div className="w-full flex justify-center py-5 h-screen bg-[#f5f5f3]">
      {!isRegister
        ? <div className="flex w-[97%] md:w-[70%] h-[500px] shadow-lg overflow-hidden">
          <img src={image1} alt="" className='w-[50%] object-cover hidden md:block' />
          <div className='w-full md:w-[50%] flex justify-center items-center bg-white'>
            <div className='w-full flex flex-col items-center'>
              <h1 className='text-[28px] text-[#666] font-bold'>ĐĂNG NHẬP</h1>
              <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className='input-cus w-[80%] px-3 py-2 my-3 bg-[#eaeaea]' placeholder='Email' />
              <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} className='input-cus w-[80%] px-3 py-2 my-3 bg-[#eaeaea]' placeholder='Mật khẩu' />
              <button className='btn-primary w-[80%] mt-3 px-3 py-2' onClick={login}>Đăng nhập</button>
              <p className='my-3 text-center'>Bạn chưa có tài khoản? <span className='text-[#fea116] cursor-pointer' onClick={() => setIsRegister(!isRegister)}>Đăng ký</span> ngay!</p>
            </div>
          </div>
        </div>
        : <div className="flex w-[97%] md:w-[70%] h-[500px] shadow-lg overflow-hidden">
          <div className='w-full md:w-[50%] flex justify-center items-center bg-white'>
            <div className='w-full flex flex-col items-center'>
              <h1 className='text-[28px] text-[#666] font-bold'>ĐĂNG KÝ</h1>
              <input type="text" className='input-cus w-[80%] px-3 py-2 my-3 bg-[#eaeaea]' placeholder='Email' />
              <input type="text" className='input-cus w-[80%] px-3 py-2 my-3 bg-[#eaeaea]' placeholder='Mật khẩu' />
              <input type="text" className='input-cus w-[80%] px-3 py-2 my-3 bg-[#eaeaea]' placeholder='Nhập lại mật khẩu' />
              <button className='btn-primary w-[80%] mt-3 px-3 py-2'>Đăng ký</button>
              <p className='my-3 text-center'>Bạn đã có tài khoản? <span className='text-[#fea116] cursor-pointer' onClick={() => setIsRegister(!isRegister)}>Đăng nhập</span> ngay!</p>
            </div>
          </div>
          <img src={image2} alt="" className='w-[50%] object-cover hidden md:block' />
        </div>}
    </div>
  )
}

export default Login