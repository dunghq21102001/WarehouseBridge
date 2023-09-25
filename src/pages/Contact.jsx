import '../css/Home.css'
function Contact() {
  return (
    <div className="w-full">
      <div className='w-full md:w-[80%] lg:w-[50%] mx-auto flex justify-center mt-10'>
        <h1 className='text-secondary lg:w-[50%] font-bold text-[18px] md:text-[20px] lg:text-[26px] title-cus relative text-center uppercase'>
          liện hệ chúng tôi
        </h1>
      </div>
      <div className='flex w-[80%] flex-col md:flex-row mx-auto mt-6 items-center justify-between px-4 flex-wrap text-[12px]'>
        <div>
          <p className='text-secondary font-bold text-[18px] text-center md:text-left my-2'>EMAIL</p>
          <p className='text-[#666]'>warehousebridge.service@gmail.com</p>
        </div>
        <div>
          <p className='text-secondary font-bold text-[18px] text-center md:text-left my-2'>LIÊN HỆ</p>
          <p className='text-[#666]'>0975688774</p>
        </div>
        <div>
          <p className='text-secondary font-bold text-[18px] text-center md:text-left my-2'>ĐỊA CHỈ</p>
          <p className='text-[#666]'>Tầng 6 NVH Sinh Viên - ĐHQG, TP.HCM</p>
        </div>

      </div>
    </div>
  )
}

export default Contact