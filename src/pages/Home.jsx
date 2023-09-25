import '../css/Home.css'
import img2 from '../assets/images/kho2.jpg'
import { BsListCheck } from 'react-icons/bs'
import { BiLogoFacebook, BiLogoInstagramAlt, BiLogoTwitter, BiMoney, BiSolidCheckboxChecked } from 'react-icons/bi'
import { AiFillSetting, AiOutlineLineChart } from 'react-icons/ai'
import { FaShieldAlt } from 'react-icons/fa'
import SliderComment from '../components/SliderComment'
import AboutUs from '../components/AboutUs'
import { useNavigate } from 'react-router-dom'
import WarehouseItem from '../components/WarehouseItem'
function Home() {
  const navigate = useNavigate()
  const listWarehouse = [
    {
      id: 1,
      name: 'MyStorage',
      image: 'https://dunghq21102001.github.io/exe101_tmp/img/khokechung//kho1.jpg',
      address: 'Số 103 Đường Vạn Phúc, Quận Hà Đông, Hà Nội',
      description: 'Kho kệ chung: là giải pháp tối ưu chi phí nhất cho cá nhân và doanh nghiệp'
    },
    {
      id: 2,
      name: 'MyStorage',
      image: 'https://dunghq21102001.github.io/exe101_tmp/img/khokechung//kho1.jpg',
      address: 'Số 103 Đường Vạn Phúc, Quận Hà Đông, Hà Nội',
      description: 'Kho kệ chung: là giải pháp tối ưu chi phí nhất cho cá nhân và doanh nghiệp'
    },
    {
      id: 3,
      name: 'MyStorage',
      image: 'https://dunghq21102001.github.io/exe101_tmp/img/khokechung//kho1.jpg',
      address: 'Số 103 Đường Vạn Phúc, Quận Hà Đông, Hà Nội',
      description: 'Kho kệ chung: là giải pháp tối ưu chi phí nhất cho cá nhân và doanh nghiệp'
    }
  ]
  const comments = [
    {
      fullName: 'Nguyen Van A',
      warehouse: 'King Kho',
      avt: 'https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg',
      comment: 'Kho đáp ứng được các yêu cầu đặc biệt của tôi. Họ luôn sẵn lòng tìm giải pháp và thích ứng để đáp ứng nhu cầu riêng của từng khách hàng.'
    },
    {
      fullName: 'Tran Thi B',
      warehouse: 'My Storage',
      avt: 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png',
      comment: 'Kho duy trì môi trường lưu trữ hàng hóa tốt. Tôi không bao giờ phải lo lắng về sự an toàn và bảo quản của sản phẩm của mình.'
    },
    {
      fullName: 'Nguyen Thi C',
      warehouse: 'My Storage',
      avt: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrAHxLoBZGF4RlguIMeUgBZuJ62D05v8IOklSdiW4&s',
      comment: 'Kho duy trì môi trường lưu trữ hàng hóa tốt. Tôi không bao giờ phải lo lắng về sự an toàn và bảo quản của sản phẩm của mình.'
    },
  ];
  return (
    <div className="w-full">

      {/* screen 1 */}
      <div className="h-[250px] md:h-screen w-full bg-cus">
        <div className='bg-black/70 w-full h-full flex items-center justify-center'>
          <div className='flex flex-col items-center'>
            <h1 className='text-white font-bold text-[10px] lg:text-[16px] title-cus relative'>TIỆN LỢI, NHANH CHÓNG, CHẤT LƯỢNG</h1>
            <h1 className='text-white font-bold text-[30px] lg:text-[78px]'>WarehouseBridge</h1>
            <div>
              <button onClick={() => navigate('/about')} className='btn-secondary px-4 md:px-8 py-4 font-bold uppercase text-[10px] lg:text-[17px] mx-6'>về chúng tôi</button>
              <button className='btn-primary  px-4 md:px-8 py-4 font-bold uppercase text-[10px] lg:text-[17px] mx-6'>đặt ngay</button>
            </div>
          </div>
        </div>
      </div>

      {/* screen 2 */}
      <AboutUs />

      {/* screen 3 */}
      <div className='w-full min-h-screen'>
        <div className='w-[60%] mx-auto flex items-center flex-col'>
          <h1 className='text-secondary font-bold text-[16px] md:text-[20px] lg:text-[26px] title-cus relative text-center uppercase'>Warehouse Bridge</h1>
          <h1 className='text-[26px] lg:text-[47px] uppercase font-bold text-primary'>kho <span className='text-secondary'>nổi bật</span></h1>
        </div>
        <div className='w-[80%] mx-auto grid grid-cols-12 gap-3'>
          {listWarehouse.map(item => (
            <div key={item.id} className='col-span-12 md:col-span-6 lg:col-span-4'>
              <WarehouseItem item={item} />
            </div>
          ))}
        </div>
      </div>

      {/* screen 4 */}
      <div className='w-full min-h-[500px] hidden md:flex'>
        <div className='w-[50%] bg-primary flex flex-col items-start pl-20 pt-24 pr-8'>
          <h1 className='uppercase text-[18px] font-bold text-white'>Đối tác chất lượng</h1>
          <h1 className='text-[38px] font-bold text-white mt-4'>My Storage</h1>
          <p className='text-white my-5'>Bạn còn phân vân giữa hai mô hình cho thuê kho để đồ TP HCM, hay muốn tham khảo thêm về giá? Đừng ngần ngại liên hệ MyStorage hoặc đọc thêm bài viết dưới đây để có thông tin bao quát nhất về dịch vụ của chúng tôi.</p>
          <div className='flex mt-3 justify-between w-full'>
            <button className='btn-secondary px-3 md:px-4 py-2 font-bold uppercase w-[45%] text-[10px] xl:text-[15px] mr-3'>tìm hiểu thêm</button>
            <button className='btn-sub  px-3 md:px-4 py-2 font-bold uppercase w-[45%] text-[10px] xl:text-[15px]'>đặt ngay</button>
          </div>
        </div>
        <div className='bg-s4 w-[50%]'></div>
      </div>

      {/* screen 5 */}
      <div className='w-full min-h-screen mt-20'>
        <div className='w-[60%] mx-auto flex items-center flex-col'>
          <h1 className='text-secondary font-bold text-[16px] md:text-[20px] lg:text-[26px] title-cus relative text-center uppercase'>Warehouse Bridge</h1>
          <h1 className='text-[26px] lg:text-[47px] uppercase font-bold text-primary'>lợi ích của <span className='text-secondary'>kho cá nhân</span></h1>
        </div>
        <div className='w-[80%] mx-auto grid grid-cols-12 gap-3'>
          <div className='col-span-12 md:col-span-6 lg:col-span-4 shadow-lg pb-4 my-3 flex items-center justify-center flex-col px-3 s5-item min-h-[400px]'>
            <BsListCheck className='br-cus-s5 text-[20px] text-secondary my-2 s5-icon' />
            <h1 className='text-primary text-[20px] font-bold my-2'>Kiểm soát và quản lý tốt hơn</h1>
            <p className='text-[#666] text-center my-2'>
              Khi bạn tự quản lý kho, bạn có toàn quyền kiểm soát và quản lý quy
              trình lưu trữ, vận chuyển và quản lý hàng hóa. Điều này giúp bạn dễ dàng theo dõi tồn
              kho, tối ưu hóa quy trình làm việc và đảm bảo chất lượng hàng hóa.
            </p>
          </div>

          <div className='col-span-12 md:col-span-6 lg:col-span-4 shadow-lg pb-4 my-3 flex items-center justify-center flex-col px-3 s5-item min-h-[400px]'>
            <BiMoney className='br-cus-s5 text-[20px] text-secondary my-2 s5-icon' />
            <h1 className='text-primary text-[20px] font-bold my-2'>Tiết kiệm chi phí</h1>
            <p className='text-[#666] text-center my-2'>
              Bằng cách sở hữu và quản lý kho tự quản, bạn có thể tiết kiệm chi
              phí thuê kho của bên thứ ba. Điều này đặc biệt hữu ích nếu bạn có nhu cầu lưu trữ hàng
              hóa lâu dài hoặc nếu quy mô kinh doanh của bạn lớn.
            </p>
          </div>

          <div className='col-span-12 md:col-span-6 lg:col-span-4 shadow-lg pb-4 my-3 flex items-center justify-center flex-col px-3 s5-item min-h-[400px]'>
            <AiFillSetting className='br-cus-s5 text-[20px] text-secondary my-2 s5-icon' />
            <h1 className='text-primary text-[20px] font-bold my-2'>Tăng tính linh hoạt</h1>
            <p className='text-[#666] text-center my-2'>
              Khi sở hữu kho tự quản, bạn có thể dễ dàng thay đổi quy trình và
              sắp xếp hàng hóa theo cách mà bạn tìm thấy phù hợp nhất. Bạn cũng có khả năng đáp ứng
              nhanh chóng với các yêu cầu và thay đổi của khách hàng.
            </p>
          </div>

          <div className='col-span-12 md:col-span-6 lg:col-span-4 shadow-lg pb-4 my-3 flex items-center justify-center flex-col px-3 s5-item min-h-[400px]'>
            <FaShieldAlt className='br-cus-s5 text-[20px] text-secondary my-2 s5-icon' />
            <h1 className='text-primary text-[20px] font-bold my-2'>Bảo mật và an toàn</h1>
            <p className='text-[#666] text-center my-2'>
              Khi quản lý kho tự quản, bạn có quyền kiểm soát an ninh và bảo mật
              của kho hàng. Bạn có thể áp dụng các biện pháp bảo vệ như kiểm soát truy cập, giám sát
              hệ thống và bảo vệ chống cháy nổ để đảm bảo an toàn cho hàng hóa.
            </p>
          </div>

          <div className='col-span-12 md:col-span-6 lg:col-span-4 shadow-lg pb-4 my-3 flex items-center justify-center flex-col px-3 s5-item min-h-[400px]'>
            <AiOutlineLineChart className='br-cus-s5 text-[20px] text-secondary my-2 s5-icon' />
            <h1 className='text-primary text-[20px] font-bold my-2'>Tăng khả năng đáp ứng</h1>
            <p className='text-[#666] text-center my-2'>
              Quản lý kho tự quản giúp bạn nắm bắt và đáp ứng nhanh chóng với
              nhu cầu của khách hàng. Bạn có thể tăng cường khả năng xử lý đơn hàng, điều chỉnh lịch
              trình vận chuyển, và tối ưu hóa quy trình giao nhận hàng hóa, từ đó nâng cao hài lòng và
              trải nghiệm của khách hàng.
            </p>
          </div>

          <div className='col-span-12 md:col-span-6 lg:col-span-4 shadow-lg pb-4 my-3 flex items-center justify-center flex-col px-3 s5-item min-h-[400px]'>
            <BiSolidCheckboxChecked className='br-cus-s5 text-[20px] text-secondary my-2 s5-icon' />
            <h1 className='text-primary text-[20px] font-bold my-2'>Đảm bảo chất lượng hàng hoá</h1>
            <p className='text-[#666] text-center my-2'>
              Khi có kho tự quản, bạn có thể áp dụng các tiêu chuẩn chất lượng
              cao cho hàng hóa của mình. Bạn có thể kiểm soát quá trình kiểm tra, đóng gói và lưu trữ
              hàng hóa, đảm bảo rằng hàng hóa luôn đáp ứng các yêu cầu và tiêu chuẩn chất lượng của
              doanh nghiệp và khách hàng.
            </p>
          </div>
        </div>
      </div>

      {/* screen 6 */}
      <div className='w-full h-[500px] lg:h-[350px] bg-primary hidden md:flex items-center justify-center'>
        <div className='w-[70%]'>
          <SliderComment comments={comments} />
        </div>
      </div>

      {/* screen 7 */}
      <div className='w-full my-10'>
        <div className='w-[60%] mx-auto flex items-center flex-col'>
          <h1 className='text-secondary font-bold text-[16px] md:text-[20px] lg:text-[26px] title-cus relative text-center uppercase'>Warehouse Bridge</h1>
          <h1 className='text-[26px] lg:text-[47px] uppercase font-bold text-primary'>đối tác <span className='text-secondary'>nổi bật</span></h1>
        </div>
        <div className='w-[80%] mx-auto grid grid-cols-12 gap-3 mt-3'>
          <div className='col-span-12 md:col-span-6 lg:col-span-3 shadow-lg pb-4 my-3'>
            <img src="https://s3-eu-west-1.amazonaws.com/tpd/logos/62a6b838121e5619aa08681b/0x0.png" className='w-full' alt="" />
            <div className='w-[60%] mx-auto flex items-center justify-around my-3'>
              <BiLogoFacebook className='icon-s7' />
              <BiLogoTwitter className='icon-s7' />
              <BiLogoInstagramAlt className='icon-s7' />
            </div>
            <p className='text-[24px] text-primary text-center'>King Kho</p>
            <p className='text-center text-[#666]'>Đối tác</p>
          </div>

          <div className='col-span-12 md:col-span-6 lg:col-span-3 shadow-lg pb-4 my-3'>
            <img src="https://s3-eu-west-1.amazonaws.com/tpd/logos/62a6b838121e5619aa08681b/0x0.png" className='w-full' alt="" />
            <div className='w-[60%] mx-auto flex items-center justify-around my-3'>
              <BiLogoFacebook className='icon-s7' />
              <BiLogoTwitter className='icon-s7' />
              <BiLogoInstagramAlt className='icon-s7' />
            </div>
            <p className='text-[24px] text-primary text-center'>King Kho</p>
            <p className='text-center text-[#666]'>Đối tác</p>
          </div>

          <div className='col-span-12 md:col-span-6 lg:col-span-3 shadow-lg pb-4 my-3'>
            <img src="https://s3-eu-west-1.amazonaws.com/tpd/logos/62a6b838121e5619aa08681b/0x0.png" className='w-full' alt="" />
            <div className='w-[60%] mx-auto flex items-center justify-around my-3'>
              <BiLogoFacebook className='icon-s7' />
              <BiLogoTwitter className='icon-s7' />
              <BiLogoInstagramAlt className='icon-s7' />
            </div>
            <p className='text-[24px] text-primary text-center'>King Kho</p>
            <p className='text-center text-[#666]'>Đối tác</p>
          </div>

          <div className='col-span-12 md:col-span-6 lg:col-span-3 shadow-lg pb-4 my-3'>
            <img src="https://s3-eu-west-1.amazonaws.com/tpd/logos/62a6b838121e5619aa08681b/0x0.png" className='w-full' alt="" />
            <div className='w-[60%] mx-auto flex items-center justify-around my-3'>
              <BiLogoFacebook className='icon-s7' />
              <BiLogoTwitter className='icon-s7' />
              <BiLogoInstagramAlt className='icon-s7' />
            </div>
            <p className='text-[24px] text-primary text-center'>King Kho</p>
            <p className='text-center text-[#666]'>Đối tác</p>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Home