import GoogleMapReact from 'google-map-react';
import '../css/Home.css'
import PinLocation from '../components/PinLocation';
function Contact() {
  const defaultProps = {
    center: {
      lat: 10.882359,
      lng: 106.782523
    },
    zoom: 15
  };
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
          <p className='text-[#666] font-bold'>warehousebridge.service@gmail.com</p>
        </div>
        <div>
          <p className='text-secondary font-bold text-[18px] text-center md:text-left my-2'>LIÊN HỆ</p>
          <p className='text-[#666] font-bold'>0975688774</p>
        </div>
        <div>
          <p className='text-secondary font-bold text-[18px] text-center md:text-left my-2'>ĐỊA CHỈ</p>
          <p className='text-[#666] font-bold'>Tầng 6 NVH Sinh Viên - ĐHQG, TP.HCM</p>
        </div>

      </div>
      <div className="w-full md:w-[70%] mx-auto h-[500px] mt-5">
        <GoogleMapReact
          bootstrapURLKeys={{
            key: 'AIzaSyCAPfe1hBNDgKaDLdgayN3KAGsHjebY7Cg',
            // key: 'AIzaSyDQg29CzefG-QLdH9Agrxl3VokTjiQyfCA',
            // language: 'en',
          }}
          defaultCenter={defaultProps.center}
          defaultZoom={defaultProps.zoom}
        >
          <PinLocation lat={10.882359} lng={106.782523} text="Trụ sở WarehouseBridge" />
        </GoogleMapReact>
      </div>
    </div>
  )
}

export default Contact