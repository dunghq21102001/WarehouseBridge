import { useEffect, useState } from "react"
import { AiFillEye, AiFillStar } from 'react-icons/ai'
import { MdLocationOn } from 'react-icons/md'
import { FaMoneyBillAlt } from 'react-icons/fa'
import WarehouseItem from "../components/WarehouseItem"
import noti from '../common/noti'
import { useLocation, useParams } from "react-router-dom"
import API from "../API"
import { useDispatch } from "react-redux"
import { changeLoadingState } from "../reducers/SystemReducer"
import '../css/WarehouseDetail.css'
import GoogleMapReact from 'google-map-react';
import func from '../common/func'
const AnyReactComponent = ({ text }) => <div>{text}</div>
function WarehouseDetail() {
    const dispatch = useDispatch()
    const [listWarehouse, setListWarehouse] = useState([])
    const [indexTab, setIndexTab] = useState(1)
    const [listDetail, setListDetail] = useState([])
    const [curIndex, setCurIndex] = useState(0)
    const [isValidCoordinate, setIsValidCoordinate] = useState(true)
    const { id } = useParams()
    const location = useLocation()
    const { state } = location
    const { WHname, latitude, longitude, firstImage } = state || {}

    // if (!func.isValidCoordinates(latitude, longitude) && isValidCoordinate) {
    //     setIsValidCoordinate(false)
    // }
    const defaultProps = {
        center: {
            lat: 10.882359,
            lng: 106.782523
        },
        zoom: 15
    };

    useEffect(() => {
        dispatch(changeLoadingState(true))
        API.warehouseDetailById(id)
            .then(res => {
                dispatch(changeLoadingState(false))
                setListDetail(res.data)
            })
            .catch(err => {
                dispatch(changeLoadingState(false))
                noti.error(err?.response.data)
            })

        API.warehouses()
            .then(res => {
                setListWarehouse(res.data.slice(0, 3))
            })
            .catch(err => { })


    }, [])
    const listTab = [
        { id: 1, name: 'Tổng quan', icon: <AiFillEye /> },
        { id: 2, name: 'Giá cả', icon: <FaMoneyBillAlt /> },
        { id: 3, name: 'Vị trí', icon: <MdLocationOn /> },
        { id: 4, name: 'Đánh giá', icon: <AiFillStar /> },
    ]
    const changeTab = (index) => {
        setIndexTab(index)
    }

    const changeWarehouseType = (index) => {
        setCurIndex(index)
    }
    return (
        <div className="w-full bg-whitex">
            <div className="w-[90%] mx-auto mt-10 flex justify-between">
                <div className="w-[65%]">
                    <div className="w-full relative overflow-hidden h-[500px]">
                        <img className="w-full top-0 left-0 absolute" src={firstImage} alt="" />
                    </div>
                    <p className="text-primary font-bold text-[50px] mt-4">{WHname}</p>
                    <p className="text-[#666]">
                        Một số đặc điểm và lợi ích của cho thuê kho tự quản bao gồm:
                        <br />
                        1. Linh hoạt về không gian: Cho thuê kho tự quản cho phép bạn tùy chỉnh không gian lưu trữ theo nhu cầu cụ thể của bạn. Bạn có thể thuê kho có kích thước và công suất phù hợp với yêu cầu của hàng hóa của bạn. Nếu cần, bạn có thể thay đổi kích thước kho hoặc thêm kho mới để đáp ứng sự thay đổi trong nhu cầu lưu trữ của bạn.
                        <br />
                        2.Quản lý và kiểm soát: Khi bạn thuê kho tự quản, bạn có toàn quyền quản lý và kiểm soát kho của mình. Bạn có thể tổ chức hàng hóa, xác định phương pháp lưu trữ, quản lý lưu lượng hàng hóa và thực hiện các quy trình và quy định riêng của mình.
                        <br />
                        3.An ninh và bảo mật: Kho tự quản thường được trang bị hệ thống an ninh và bảo mật để đảm bảo an toàn cho hàng hóa của bạn. Các biện pháp an ninh có thể bao gồm hệ thống giám sát video, hệ thống báo động chống trộm, cửa an toàn và hệ thống kiểm soát truy cập.
                        <br />
                        4.Vị trí thuận tiện: Kho tự quản thường được đặt tại các vị trí thuận tiện gần các tuyến giao thông chính, các cảng biển, các khu vực sản xuất và các trung tâm thương mại. Điều này giúp tối ưu hóa việc vận chuyển và giao nhận hàng hóa và giảm thời gian và chi phí vận chuyển.
                        <br />
                        5.Tiết kiệm chi phí: So với việc xây dựng và quản lý một kho lưu trữ riêng, thuê kho tự quản có thể giảm thiểu các chi phí vốn, chi phí hoạt động và chi phí duy trì.
                    </p>

                    {listDetail.length > 0
                        ? <div className="w-full mt-10 mb-4 px-4 py-2 flex items-center justify-between">
                            {listTab.map(tab => (
                                <p onClick={() => changeTab(tab.id)} className={`flex items-center text-[24px] text-secondary cursor-pointer hover:bg-[#dbdbdb] p-1 ${indexTab == tab.id ? 'bg-[#dbdbdb]' : ''}`} key={tab.id}>
                                    {tab.icon}&nbsp;<span className="text-primary">{tab.name}</span>
                                </p>
                            ))}
                        </div>
                        : null}
                    {listDetail.length > 0
                        ? <div className="w-full mt-4 mb-10">
                            {/* tab 1 */}
                            <div className={`w-full ${indexTab == 1 ? 'block' : 'hidden'}`}>
                                <p className="text-[#666]">
                                    Cho thuê kho tự quản là dịch vụ cung cấp không gian lưu trữ cho cá nhân hoặc doanh nghiệp để quản lý và kiểm soát trực tiếp hàng hóa của mình. Người thuê có linh hoạt về không gian và quyền tổ chức lưu trữ theo nhu cầu. Kho tự quản có đặc điểm về an ninh, vị trí thuận tiện và tiết kiệm chi phí so với việc tự xây dựng kho lưu trữ. Đây là một giải pháp hiệu quả để quản lý và lưu trữ hàng hóa một cách chuyên nghiệp.
                                </p>
                            </div>

                            {/* tab2 */}
                            <div className={`w-full flex items-start justify-center ${indexTab == 2 ? 'block' : 'hidden'}`}>
                                <div className="w-[50%]">
                                    {listDetail.length > 0 ? <p className="text-primary font-bold text-[20px]">Các loại kích thước kho:</p> : null}
                                    <div className="w-full flex items-center justify-start flex-wrap my-2">
                                        {listDetail.map((item, index) => (
                                            <div onClick={() => changeWarehouseType(index)} key={item.id} className={`bg-white border-[#0f1728] border-solid border-[1px] rounded-md flex items-center cursor-pointer w-[80px] justify-center mr-4 text-[14px] ${index == curIndex ? 'isActive' : null}`}>
                                                {item?.width}x{item?.depth}x{item?.height}
                                            </div>
                                        ))}
                                    </div></div>
                                <div>
                                    <p className="text-[16px]"><span className="font-bold text-primary">Giá kho:</span> {func.convertVND(listDetail[curIndex]?.warehousePrice)}</p><br />
                                    <p className="text-[14px]"><span className="font-bold text-primary">Giá dịch vụ:</span> {func.convertVND(listDetail[curIndex]?.servicePrice)}</p><br />
                                </div>
                            </div>

                            {/* tab3 */}
                            <div className={`w-full ${indexTab == 3 ? 'block' : 'hidden'}`}>
                                {/* {isValidCoordinate
                                    ? <div className="w-full h-[500px]">
                                        <GoogleMapReact
                                            bootstrapURLKeys={{
                                                // key: 'AIzaSyCAPfe1hBNDgKaDLdgayN3KAGsHjebY7Cg',
                                                key: 'AIzaSyDQg29CzefG-QLdH9Agrxl3VokTjiQyfCA',
                                                // language: 'en',
                                            }}
                                            defaultCenter={defaultProps.center}
                                            defaultZoom={defaultProps.zoom}
                                        >
                                            <AnyReactComponent
                                                lat={latitude}
                                                lng={longitude}
                                                text="Warehouse"
                                            />
                                        </GoogleMapReact>
                                    </div>
                                    : <p className="font-bold text-[18px] text-red-500">Kinh độ và vĩ độ không hợp lệ</p>} */}
                                <div className="w-full h-[500px]">
                                    <GoogleMapReact
                                        bootstrapURLKeys={{
                                            // key: 'AIzaSyCAPfe1hBNDgKaDLdgayN3KAGsHjebY7Cg',
                                            key: 'AIzaSyDQg29CzefG-QLdH9Agrxl3VokTjiQyfCA',
                                            // language: 'en',
                                        }}
                                        defaultCenter={defaultProps.center}
                                        defaultZoom={defaultProps.zoom}
                                    >
                                        <AnyReactComponent
                                            lat={latitude}
                                            lng={longitude}
                                            text="Warehouse"
                                        />
                                    </GoogleMapReact>
                                </div>
                            </div>

                            {/* tab4 */}
                            <div className={`w-full ${indexTab == 4 ? 'block' : 'hidden'}`}>
                                <p className="font-bold text-[18px] text-primary">Không có dữ liệu</p>
                            </div>
                        </div>
                        : null}
                </div>
                <div className="w-[30%]">
                    <div className="w-[80%] text-center py-3 mx-auto bg-secondary text-white text-[24px] btn-secondary">
                        Đặt ngay
                    </div>
                    <p className="mt-10 text-[30px] text-primary font-bold">Danh mục</p>
                    <div className="flex w-full flex-wrap mt-3">
                        <div className="w-full relative mt-2">
                            <img className="w-full" src="https://img.freepik.com/free-photo/interior-large-distribution-warehouse-with-shelves-stacked-with-palettes-goods-ready-market_342744-1481.jpg?w=2000" alt="" />
                            <div className="absolute bottom-0 left-0 p-2 bg-secondary text-[20px] text-white font-bold">Kho lạnh</div>
                        </div>
                        <div className="w-full relative mt-2">
                            <img className="w-full" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQH45Ye7IRd3U6VHEsjtPkxt_HgNyzAx2HJ3_eT8tKJYf87MyI9znKzUYwKhWNx-guB_QI&usqp=CAU" alt="" />
                            <div className="absolute bottom-0 left-0 p-2 bg-secondary text-[20px] text-white font-bold">Kho thương mại điện tử</div>
                        </div>
                        <div className="w-full relative mt-2">
                            <img className="w-full" src="https://media.istockphoto.com/id/1138429558/photo/rows-of-shelves.jpg?s=612x612&w=0&k=20&c=0E4uvaa-THb-Wj-QZKpUSPgwjfIMFW3vH7NRx1iWMIc=" alt="" />
                            <div className="absolute bottom-0 left-0 p-2 bg-secondary text-[20px] text-white font-bold">Kho mini</div>
                        </div>
                    </div>

                    <p className="mt-10 text-[30px] text-primary font-bold">Hỗ trợ, liên hệ</p>
                    <div className="w-[80%] text-center py-3 mx-auto bg-secondary btn-secondary text-white text-[24px] mt-5">
                        +0975688774
                    </div>
                </div>
            </div>

            <div className="w-full bg-white min-h-screen pt-10">
                <h1 className='text-[26px] lg:text-[47px] uppercase font-bold text-primary text-center'>Khám phá thêm <span className='text-secondary'>kho</span></h1>

                <div className='w-[80%] mx-auto grid grid-cols-12 gap-3'>
                    {listWarehouse.map(item => (
                        <div key={item.id} className='col-span-12 md:col-span-6 lg:col-span-4'>
                            <WarehouseItem item={item} />
                        </div>
                    ))}
                </div>
            </div>

        </div>
    )
}

export default WarehouseDetail