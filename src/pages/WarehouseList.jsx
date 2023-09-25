import { useParams } from "react-router-dom"
import WarehouseItem from '../components/WarehouseItem'
function WarehouseList() {
  const { name } = useParams()
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
    },
  ]

  const revertText = () => {
    const finalName = name.replaceAll('-', ' ')
    return finalName
  }
  return (
    <div className="w-full bg-[#eeeeee] min-h-screen pt-10">
      <h1 className='text-[26px] lg:text-[47px] uppercase font-bold text-primary text-center'>kho <span className='text-secondary'>
          {revertText()}
        </span>
      </h1>

      <div className='w-[80%] mx-auto grid grid-cols-12 gap-3'>
      {listWarehouse.map(item => (
            <div key={item.id} className='col-span-12 md:col-span-6 lg:col-span-4'>
              <WarehouseItem item={item} />
            </div>
          ))}
      </div>
    </div>
  )
}

export default WarehouseList