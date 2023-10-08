import { useEffect, useState } from "react"
import { AiFillEye, AiFillStar, AiFillCaretRight, AiFillCaretLeft } from 'react-icons/ai'
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
    const [currentImageIndex, setCurrentImageIndex] = useState(0)
    const [isValidCoordinate, setIsValidCoordinate] = useState(true)
    const { id } = useParams()
    const location = useLocation()
    const { state } = location
    const { WHname, latitude, longitude, listImage, description, shortDescription } = state || {}

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

    const nextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % listImage.length)
    }

    const prevImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === 0 ? listImage.length - 1 : prevIndex - 1
        )
    }

    return (
        <div className="w-full bg-white">
            <div className="w-[90%] mx-auto mt-10 flex justify-between flex-col md:flex-row">
                <div className="w-full md:w-[65%]">
                    <div className="w-full relative overflow-hidden h-[175px] sm:h-[300px] md:h-[400px]">
                        {/* <img className="w-full top-0 left-0 absolute" src={firstImage} alt="" /> */}
                        <div className="w-full top-0 left-0 absolute flex justify-around">
                            <button className="absolute top-[50%] btn-primary translate-x-[-50%] left-[21px] px-3 py-1" onClick={prevImage}><AiFillCaretLeft /></button>
                            <img className="w-full max-h-[400px]" src={listImage[currentImageIndex]?.imageURL} alt="Slider" />
                            <button className="absolute top-[50%] translate-x-[-50%] btn-primary right-[-21px] px-3 py-1" onClick={nextImage}><AiFillCaretRight /></button>
                        </div>
                    </div>
                    <p className="text-primary font-bold text-[18px] md:text-[30px] mt-4">{WHname}</p>
                    <p className="text-[#666]">
                        {shortDescription}
                    </p>

                    {listDetail.length > 0
                        ? <div className="w-full mt-10 mb-4 px-4 py-2 flex items-center justify-between flex-wrap">
                            {listTab.map(tab => (
                                <p onClick={() => changeTab(tab.id)} className={`flex items-center text-[24px] text-secondary cursor-pointer hover:bg-[#dbdbdb] p-1 ${indexTab == tab.id ? 'bg-[#dbdbdb]' : ''}`} key={tab.id}>
                                    {tab.icon}&nbsp;<span className="text-primary text-[18px] md:text-[30px]">{tab.name}</span>
                                </p>
                            ))}
                        </div>
                        : null}
                    {listDetail.length > 0
                        ? <div className="w-full mt-4 mb-10">
                            {/* tab 1 */}
                            <div className={`w-full ${indexTab == 1 ? 'block' : 'hidden'}`}>
                                <p className="text-[#666]">
                                    {description}
                                </p>
                            </div>

                            {/* tab2 */}
                            <div className={`w-full flex items-start justify-center ${indexTab == 2 ? 'block' : 'hidden'}`}>
                                <div className="w-[50%] flex ">
                                    {listDetail.length > 0 ? <p className="text-primary font-bold text-[20px]">Các loại kích thước kho:</p> : null}
                                    <div className="w-full flex items-center justify-start flex-wrap my-2">
                                        {listDetail.map((item, index) => (
                                            <div onClick={() => changeWarehouseType(index)} key={item.id} className={`bg-white border-[#0f1728] border-solid border-[1px] rounded-md flex items-center cursor-pointer w-[140px] justify-center mr-4 text-[14px] my-2 ${index == curIndex ? 'isActive' : null}`}>
                                                {item?.width} x {item?.depth} x {item?.height}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <p className="text-[16px]"><span className="font-bold text-primary">Giá kho:</span> {func.convertVND(listDetail[curIndex]?.warehousePrice)}</p><br />
                                    <p className="text-[16px]"><span className="font-bold text-primary">Giá dịch vụ:</span> {func.convertVND(listDetail[curIndex]?.servicePrice)}</p><br />
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
                                            text={WHname}
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
                <div className="w-full md:w-[30%]">
                    <div className="w-[80%] text-center py-3 mx-auto bg-secondary text-white text-[24px] btn-secondary">
                        Đặt ngay
                    </div>
                    <p className="mt-10 text-[30px] text-primary font-bold">Danh mục</p>
                    <div className="flex w-full flex-wrap mt-3">
                        {listWarehouse.map((item, index) => (
                            <div key={index} className="w-full relative mt-2">
                                <img className="w-full" src={item?.imageURL} alt={item?.imageURL} />
                                <div className="absolute bottom-0 left-0 p-2 bg-secondary text-[20px] text-white font-bold">
                                    {item?.name}
                                </div>
                            </div>
                        ))}
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