import React, { useEffect, useMemo, useState } from 'react'
import { changeLoadingState } from "../../reducers/SystemReducer"
import API from '../../API'
import { useDispatch } from "react-redux"
import { MantineReactTable } from 'mantine-react-table'
import { AiOutlineEdit } from 'react-icons/ai'
import { MdDelete, MdOutlineAssignmentInd } from 'react-icons/md'
import { GrUpdate } from 'react-icons/gr'
import func from '../../common/func'
import noti from '../../common/noti'

function AdminOrder() {
  const dispatch = useDispatch()
  const [orderStatusSelected, setOrderStatusSelected] = useState('')
  const [orderIdSelected, setOrderIdSelected] = useState('')
  const [listOrder, setListOrder] = useState([])
  const [listEnumOrder, setListEnumOrder] = useState([])
  const [isShowAssign, setIsShowAssign] = useState(false)
  const [isShowAdd, setIsShowAdd] = useState(false)
  const [isShowUpdate, setIsShowUpdate] = useState(false)
  const [isShowUpdateStatus, setIsShowUpdateStatus] = useState(false)
  const [pickupDay, setPickupDay] = useState('')
  useEffect(() => {
    fetchOrderEnum()
    fetchOrder()
  }, [])

  const fetchOrder = () => {
    dispatch(changeLoadingState(true))
    API.getOrderAdmin()
      .then(res => {
        setListOrder(res.data)
        dispatch(changeLoadingState(false))
      })
      .catch(err => {
        dispatch(changeLoadingState(false))
      })
  }


  const fetchOrderEnum = () => {
    API.enumOrdersStatus()
      .then(res => {
        setListEnumOrder(res.data)
      })
      .catch(err => { })
  }
  const columns = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        Cell: ({ cell, row }) => (
          <div>
            ...
          </div>
        ),
      },
      {
        accessorKey: 'deposit',
        header: 'Số tiền đóng',
        Cell: ({ cell, row }) => (
          <div>
            {func.convertVND(cell.getValue())}
          </div>
        ),
      },
      {
        accessorKey: 'warehousePrice',
        header: 'Giá kho',
        Cell: ({ cell, row }) => (
          <div>
            {func.convertVND(cell.getValue())}
          </div>
        ),
      },
      {
        accessorKey: 'servicePrice',
        header: 'Giá dịch vụ',
        Cell: ({ cell, row }) => (
          <div>
            {func.convertVND(cell.getValue())}
          </div>
        ),
      },
      {
        accessorKey: 'totalPrice',
        header: 'Tổng giá',
        Cell: ({ cell, row }) => (
          <div>
            {func.convertVND(cell.getValue())}
          </div>
        ),
      },
      {
        accessorKey: 'depth',
        header: 'Độ sâu',
      },
      {
        accessorKey: 'height',
        header: 'Chiều cao',
      },
      {
        accessorKey: 'width',
        header: 'Chiều rộng',
      },
      {
        accessorKey: 'orderStatus',
        header: 'Trạng thái đơn hàng',
      },
      {
        accessorKey: 'paymentStatus',
        header: 'Trạng thái thanh toán',
        size: 220
      },
      {
        accessorKey: 'totalCall',
        header: 'Tổng cuộc gọi',
      },
      {
        accessorKey: 'unitType',
        header: 'Đơn vị',
      },
      {
        accessorKey: 'cancelReason',
        header: 'Lý do huỷ',
      },
      {
        accessorKey: 'contactInDay',
        header: 'Liên hệ trong ngày',
      },

      // {
      //   accessorKey: 'isDisplay',
      //   header: 'Trạng thái hiển thị',
      //   Cell: ({ cell, row }) => (
      //     <div>
      //       {cell.getValue() == true ? 'Đang hiển thị' : 'Đang ẩn'}
      //     </div>
      //   ),
      // }
    ],
    [],
  )
  const actionAdd = () => {
    setIsShowAdd(false)
  }
  const getDetail = (data) => {
    setIsShowUpdate(false)
  }
  const handleDeleteRow = (data) => { }
  const handleCancel = () => {
    setIsShowAdd(false)
    setIsShowUpdate(false)
  }
  const changeLoadingStatus = (data) => {
    setOrderIdSelected(data.getValue('id'))
    setIsShowUpdateStatus(true)
  }
  const updateLoadingStatus = () => {
    dispatch(changeLoadingState(true))
    API.updateOrderStatus({
      id: orderIdSelected,
      orderStatus: orderStatusSelected != '' ? orderStatusSelected : listEnumOrder[0]?.value,
      // pickupDay: new Date().toISOString()
      pickupDay: '2023-12-01T13:15:11.999Z'
    })
      .then(res => {
        noti.success(res.data)
        dispatch(changeLoadingState(false))
        setIsShowUpdateStatus(false)
      })
      .catch(err => {
        noti.error(err?.response?.data)
        dispatch(changeLoadingState(false))
      })
  }
  const assignStaff = (data) => { }
  return (
    <div className='w-full'>
      <div className=' w-full md:w-[90%] mx-auto mt-10'>
        <button className='btn-primary px-3 py-1 my-2' onClick={actionAdd}>Thêm</button>
        <MantineReactTable
          columns={columns}
          data={listOrder}
          enableEditing
          renderRowActions={({ row, table }) => (
            <div className='flex items-center'>
              <button onClick={() => changeLoadingStatus(row)}><GrUpdate className='text-primary text-[18px] mr-2' /></button>
              <button onClick={() => assignStaff(row)}><MdOutlineAssignmentInd className='text-secondary text-[22px] ml-2' /></button>
              <button onClick={() => getDetail(row)} className=''><AiOutlineEdit className='edit-icon' /></button>
              <button onClick={() => handleDeleteRow(row)} className=''><MdDelete className='del-icon' /></button>
            </div>
          )}
        />
      </div>
      {isShowUpdateStatus
        ? <div className='bg-fog-cus'>
          <div className='rounded-lg bg-white p-5 w-[30%] flex flex-col items-end'>
            <select className='block w-full mx-auto bg-gray-200 rounded-md py-2 my-2'>
              {listEnumOrder.map(i => (
                <option key={i?.value} value={i?.value} onChange={() => setOrderStatusSelected(i?.value)}>
                  {i?.display}
                </option>
              ))}
            </select>
            <button className='btn-primary px-3 py-1 rounded-md' onClick={() => updateLoadingStatus()}>Lưu</button>
          </div>
        </div>
        : null}
    </div>
  )
}

export default AdminOrder