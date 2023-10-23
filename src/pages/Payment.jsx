import { useEffect, useState } from 'react';
import '../css/Payment.css'
import WarehousePayment from '../components/WarehousePayment';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import API from '../API';
import func from '../common/func';
import { changeLoadingState } from '../reducers/SystemReducer';
import noti from '../common/noti';

function Payment() {
    const user = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const [isShow, setIsShow] = useState(false)
    const [WH, setWH] = useState(null)
    const [WHDetail, setWHDetail] = useState(null)
    const location = useLocation()
    const { state } = location
    const { detailId } = state || {}

    useEffect(() => {
        API.warehouseDetailByID(detailId)
            .then(res => {
                setWHDetail(res.data)
                API.warehouseById(res.data.warehouseId)
                    .then(res => {
                        setWH(res.data)
                    })
                    .catch(err => { })
            })
            .catch(err => {

            })
    }, [])

    const postOrder = () => {
        dispatch(changeLoadingState(true))
        API.postOrder(WHDetail?.id)
            .then(res => {
                dispatch(changeLoadingState(false))
                window.open(res.data, '_self')
                // window.close()
            })
            .catch(err => {
                dispatch(changeLoadingState(false))
                noti.error(err?.response?.data)
            })
    }

    return (
        <div className="w-full min-h-screen">
            <div className="w-full relative py-5">
                {/* left side */}
                <div className="w-full lg:w-[50%] flex justify-end pt-[30px]">
                    <div className='w-full lg:w-[82%] lg:ml-[40px]'>
                        <div className="w-[80%] mx-auto flex items-center justify-between">
                            <span className="font-bold text-[24px]">Thông tin liên hệ</span>
                            {/* <p className="text-[#707070] text-[14px] flex items-center">
                <span className="hidden lg:block">Have an account?</span>&nbsp;
                <span className="text-[#1773B0] underline cursor-pointer">
                  Login
                </span>
              </p> */}
                        </div>
                        <input
                            className="w-[80%] block px-2 py-3 my-4 rounded-md mx-auto border-input"
                            placeholder="Email"
                        />
                        <div className="w-[80%] mx-auto flex items-center justify-between">
                            <input
                                className="w-[48%] block px-2 py-3 rounded-md border-input"
                                placeholder="Họ (Không bắt buộc)"
                            />
                            <input
                                className="w-[48%] block px-2 py-3 rounded-md border-input"
                                placeholder="Tên"
                            />
                        </div>
                        <input
                            className="w-[80%] block px-2 py-3 my-4 rounded-md mx-auto border-input"
                            placeholder="Số điện thoại"
                        />
                        <input
                            className="w-[80%] block px-2 py-3 my-4 rounded-md mx-auto border-input"
                            placeholder="Địa chỉ"
                        />
                        <div className=" w-[80%] font-bold mx-auto mt-5">
                            <span className="text-[17px]">Phương thức vận chuyển (Đối với chuyển đồ thuê)</span>
                        </div>
                        <div className="w-[80%] mx-auto">
                            <div className="w-full h-[50px] flex items-center justify-between px-4 rounded-md bg-[#f0f5ff] border-[1px] border-solid border-[#1773B0]">
                                <span>Giao hàng nhanh</span>
                                <span>20.000 VND</span>
                            </div>
                        </div>
                        <div className="w-[80%] mx-auto mt-10">
                            <p className="font-bold text-[24px]">Thanh toán</p>
                            {/* <p className="text-[#707070] text-[14px]">
                                All transactions are secure and encrypted.
                            </p> */}
                            <div className="w-full border-solid border-[1px] border-[#dedede] rounded-md bg-[#f4f4f4] pb-3">
                                <div className="w-full h-[50px] flex items-center justify-between px-4 rounded-md bg-[#f0f5ff] border-[1px] border-solid border-[#1773B0]">
                                    <span>momo</span>
                                    {/* <span className="w-[38px] h-[24px] bg-[#eda024] font-bold text-white text-center leading-[24px] rounded-sm">
                                        M
                                    </span> */}
                                    <img src="https://play-lh.googleusercontent.com/dQbjuW6Jrwzavx7UCwvGzA_sleZe3-Km1KISpMLGVf1Be5N6hN6-tdKxE5RDQvOiGRg" className='w-[24px] h-[24px]' alt="" />
                                </div>
                                {/* <img src="https://scontent.fsgn19-1.fna.fbcdn.net/v/t1.15752-9/387519435_1025615265231411_4625562593644483278_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=8cd0a2&_nc_ohc=1GxH0Lp9uD0AX-XtbJO&_nc_ht=scontent.fsgn19-1.fna&_nc_e2o=s&oh=03_AdQGwn_LPu7oBpRVPzuHB84xW_aE3berZ9H_-PzP1SUNiQ&oe=65534284" className='w-[300px] h-[400px] mx-auto block m-2' alt="" /> */}
                                {/* <input
                                    className="w-[90%] block px-2 py-3 my-4 rounded-md mx-auto border-input"
                                    placeholder="Card number"
                                />
                                <div className="w-[90%] mx-auto flex items-center justify-between">
                                    <input
                                        className="w-[48%] block px-2 py-3 rounded-md border-input"
                                        placeholder="Expiration date (MM / YY)"
                                    />
                                    <input
                                        className="w-[48%] block px-2 py-3 rounded-md border-input"
                                        placeholder="Security code"
                                    />
                                </div>
                                <input
                                    className="w-[90%] block px-2 py-3 my-4 rounded-md mx-auto border-input"
                                    placeholder="Name on card"
                                />

                                <div className="w-[90%] mx-auto flex items-center">
                                    <input
                                        type="checkbox"
                                        checked
                                        className="checkbox-cus w-[20px] h-[20px]"
                                    />
                                    <p className="ml-2">Use shipping address as billing address</p>
                                </div> */}
                            </div>

                            <div onClick={postOrder} className="hidden lg:block w-full hover:bg-[#ff3333] text-center rounded-md bg-[#1773B0] text-white mt-4 py-4 cursor-pointer button">
                                Thanh toán ngay
                            </div>
                        </div>
                    </div>
                </div>

                {/* right side */}
                <div className="hidden lg:block absolute right-0 top-0 bg-[#f5f5f5] h-[100vh] hide-scroll overflow-y-scroll w-full lg:w-[50%] pt-[30px] border-cus">
                    <div className='w-full'>
                        <WarehousePayment wh={WH} whDetail={WHDetail} />
                    </div>
                </div>
                <div className="block lg:hidden overflow-y-scroll hide-scroll w-[80%] mx-auto mt-8 lg:w-[50%] pt-[30px]">
                    <div className="flex w-full items-center justify-between mb-10">
                        <span className='text-[18px] font-bold'>Đơn hàng</span>
                        <span
                            onClick={() => setIsShow(!isShow)}
                            className="text-[#1773B0] showhide cursor-pointer"
                        >
                            {isShow ? "Ẩn" : "Hiện chi tiết"}
                        </span>
                    </div>
                    {isShow ? (
                        <WarehousePayment wh={WH} whDetail={WHDetail} />
                    ) : (
                        <div className="w-full flex-col md:flex-row flex items-start pt-5">
                            <div className='w-full flex flex-col items-center'>
                                <div className='w-full flex flex-wrap items-start'>
                                    <div className="w-full md:w-[60%] h-[80px] text-center md:text-left">
                                        <p
                                            className="text-[18px] md:text-[24px] md:truncate-cus"
                                            title={WH?.name}
                                        >
                                            {WH?.name}
                                        </p>
                                        <p
                                            className="text-[#666] text-[14px] md:text-[18px] md:truncate-cus mt-2 w-full"
                                            title={`${WHDetail?.width} x ${WHDetail?.depth} x ${WHDetail?.height} ${WHDetail?.unitType}`}
                                        >
                                            {`${WHDetail?.width} x ${WHDetail?.depth} x ${WHDetail?.height} ${WHDetail?.unitType}`}
                                        </p>
                                    </div>
                                    <div className="text-[18px] md:text-[24px] h-[80px] w-full md:w-[40%] text-center md:text-right">
                                        <p>{func.convertVND(WHDetail?.warehousePrice)}</p>
                                    </div>
                                </div>
                                <div className='w-full items-start justify-between flex'>
                                    <span className='text-[18px] md:text-[24px] md:truncate-cus'>Phí dịch vụ</span>
                                    <span className="text-[18px] md:text-[24px] h-[80px] w-full md:w-[40%] text-center md:text-right">{func.convertVND(WHDetail?.servicePrice)}</span>
                                </div>
                            </div>
                        </div>
                    )}

                    <div onClick={postOrder} className="lg:hidden mt-8 block w-full hover:bg-[#ff3333] text-center rounded-md bg-[#1773B0] text-white py-4 cursor-pointer button">
                        Thanh toán ngay
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Payment