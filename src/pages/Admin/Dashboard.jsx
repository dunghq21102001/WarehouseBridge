import { useState } from "react"
import { FcMoneyTransfer } from 'react-icons/fc'
import { GrGroup } from 'react-icons/gr'
import { MdOutlineGroups2 } from 'react-icons/md'
import { FaWarehouse } from 'react-icons/fa'
import PieChart from "../../components/charts/PieChart"
function Dashboard() {
  const [listCounting, setListCounting] = useState([
    { id: 1, name: 'Doanh thu', number: '582.589.128 VND', icon: <FcMoneyTransfer className="text-[26px]" /> },
    { id: 4, name: 'Kho', number: '1174', icon: <FaWarehouse className="text-[26px] text-[#0f1728]" /> },
    { id: 2, name: 'Khách hàng', number: '1058', icon: <GrGroup className="text-[26px] text-[#ff7f61]" /> },
    { id: 3, name: 'Đối tác', number: '281', icon: <MdOutlineGroups2 className="text-[26px] text-[#efae4e]" /> },
  ])
  return (
    <div className="w-[90%] mx-auto mt-[40px]">
      {/* counting */}
      <div className="grid grid-cols-12 gap-3 w-full">
        {listCounting.map(i => (
          <div className="col-span-12 md:col-span-6 lg:col-span-3 bg-[#faf9f9] rounded-md hover:translate-y-[-5px] transition-transform h-[160px] shadow-lg" key={i.id}>
            <p className="w-full text-[#878a99] text-[18px] m-4">{i.name}</p>
            <p className="text-[24px] text-black mt-5 ml-4">
              {i.number}
            </p>
            <div className="flex items-center w-full px-4 mt-5 justify-between">
              <span className="underline cursor-pointer text-[#687cfe]">Xem chi tiết</span>
              {i.icon}
            </div>
          </div>
        ))}
      </div>
      <div className="w-full flex flex-wrap mt-10">
        <div className="w-[40%] rounded-md shadow-lg p-4 bg-[#faf9f9]">
          <PieChart />
        </div>
      </div>
    </div>
  )
}

export default Dashboard