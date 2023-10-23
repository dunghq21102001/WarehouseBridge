import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import API from "../../API"
import { changeLoadingState } from "../../reducers/SystemReducer"
import { useMemo } from "react"
import { AiOutlineEdit } from "react-icons/ai"
import { MdDelete } from "react-icons/md"
import { MantineReactTable } from "mantine-react-table"
import func from '../../common/func'
import FormBase from "../../components/FormBase"
import noti from "../../common/noti"
function AdminWarehouseDetail() {
  const dispatch = useDispatch()
  const [list, setList] = useState([])
  const [isShow, setIsShow] = useState(false)
  const [isShowUpdate, setIsShowUpdate] = useState(false)
  const [listWH, setListWH] = useState([])
  const [formData, setFormData] = useState([
    { name: 'Giá kho', binding: 'warehousePrice', type: 'input' },
    { name: 'Giá dịch vụ', binding: 'servicePrice', type: 'input' },
    { name: 'Chiều rộng', binding: 'width', type: 'input' },
    { name: 'Chiều cao', binding: 'height', type: 'input' },
    { name: 'Chiều sâu', binding: 'depth', type: 'input' },
    { name: 'Đơn vị', binding: 'unitType', type: 'input' },
    { name: 'Số lượng', binding: 'quantity', type: 'input' },
    { name: 'Nhà kho', binding: 'warehouseId', type: 'select', options: [1, 2, 3], defaultValue: listWH[0] },
  ])


  useEffect(() => {
    fetchWH()
    fetchWHDetail()
  }, [])

  useEffect(() => {
    if (listWH.length > 0) {
      setFormData([
        { name: 'Giá kho', binding: 'warehousePrice', type: 'input' },
        { name: 'Giá dịch vụ', binding: 'servicePrice', type: 'input' },
        { name: 'Chiều rộng', binding: 'width', type: 'input' },
        { name: 'Chiều cao', binding: 'height', type: 'input' },
        { name: 'Chiều sâu', binding: 'depth', type: 'input' },
        { name: 'Đơn vị', binding: 'unitType', type: 'input' },
        { name: 'Số lượng', binding: 'quantity', type: 'input' },
        { name: 'Nhà kho', binding: 'warehouseId', type: 'select', options: listWH, defaultValue: '' },
      ])


      const warehouseNameMap = {}
      listWH.forEach(warehouse => {
        warehouseNameMap[warehouse.id] = warehouse.name
      })

      const updatedList = list.map(detail => ({
        ...detail,
        warehouseName: warehouseNameMap[detail.warehouseId],
      }))

      setList(updatedList)
    }
  }, [listWH])

  const fetchWHDetail = () => {
    dispatch(changeLoadingState(true))

    API.warehouseDetailsByAdmin()
      .then(res => {
        setList(res.data)
        dispatch(changeLoadingState(false))
      })
      .catch(err => {
        dispatch(changeLoadingState(false))
      })
  }

  const fetchWH = () => {
    dispatch(changeLoadingState(true))
    API.warehouses()
      .then(res => {
        dispatch(changeLoadingState(false))
        setListWH(res.data)
      })
      .catch(err => {
        dispatch(changeLoadingState(false))
      })
  }

  const showAdd = () => {
    setIsShow(true)
  }

  const addWarehouseDetail = (data) => {
    const fData = {
      warehouseId: data.warehouseId,
      warehousePrice: Number.parseInt(data.warehousePrice),
      servicePrice: Number.parseInt(data.servicePrice),
      width: Number.parseInt(data.width),
      height: Number.parseInt(data.height),
      depth: Number.parseInt(data.depth),
      unitType: Number.parseInt(data.unitType),
      quantity: Number.parseInt(data.quantity)
    }
    dispatch(changeLoadingState(true))
    API.addWarehouseDetail(fData)
      .then(res => {
        handleCancel()
        noti.success(res.data)
        dispatch(changeLoadingState(false))
      })
      .catch(err => {
        dispatch(changeLoadingState(false))
      })
  }


  const handleCancel = () => {
    setIsShow(false)
    setIsShowUpdate(false)
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
        accessorKey: 'warehouseName',
        header: 'Tên kho',
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
        accessorKey: 'width',
        header: 'Chiều rộng',
      },
      {
        accessorKey: 'height',
        header: 'Chiều cao',
      },
      {
        accessorKey: 'depth',
        header: 'Chiều sâu',
      },
      {
        accessorKey: 'unitType',
        header: 'Loại đơn vị'
      },
      {
        accessorKey: 'quantity',
        header: 'Số lượng'
      },
      {
        accessorKey: 'isDisplay',
        header: 'Trạng thái hiển thị',
        Cell: ({ cell, row }) => (
          <div>
            {cell.getValue() == true ? 'Đang hiển thị' : 'Đang ẩn'}
          </div>
        ),
      }
    ],
    [],
  )
  const getDetailWH = (row) => { }
  const handleDeleteRow = (row) => { 
    if (
      !confirm(`Bạn có chắc muốn xoá không?`)
    ) {
      return
    }
    API.deleteWarehouseDetailByID(row.getValue('id'))
    .then(res => {
      fetchWHDetail()
      noti.success(res.data)
    })
    .catch(err => {})
  }
  return (
    <div className="w-full">

      <div className="w-full md:w-[90%] mx-auto mt-10">
        <button onClick={showAdd} className="btn-primary px-3 py-1 my-2">Thêm</button>
        <MantineReactTable
          columns={columns}
          data={list}
          enableEditing
          renderRowActions={({ row, table }) => (
            <div className='flex items-center'>
              <button onClick={() => getDetailWH(row)} className=''><AiOutlineEdit className='edit-icon' /></button>
              <button onClick={() => handleDeleteRow(row)} className=''><MdDelete className='del-icon' /></button>
            </div>
          )}
        />
      </div>
      {isShow
        ? <FormBase title={formData}
          onSubmit={addWarehouseDetail}
          buttonName={'Thêm mới'}
          onCancel={handleCancel} />
        : null}
    </div>
  )
}

export default AdminWarehouseDetail