import { useCallback, useEffect, useMemo, useState } from "react"
import { useDispatch } from "react-redux"
import { changeLoadingState } from "../../reducers/SystemReducer"
import API from "../../API"
import noti from "../../common/noti"
import FormBase from '../../components/FormBase';
import { MantineReactTable } from "mantine-react-table"
import { MdDelete } from 'react-icons/md'
import FormUpdate from '../../components/FormUpdate'
import '../../css/AdminBody.css'
import { AiOutlineEdit } from "react-icons/ai"
import { confirmAlert } from 'react-confirm-alert'

const AdminRequest = () => {

  const [list, setList] = useState([])
  const [isShow, setIsShow] = useState(false)
  const [listRQStatus, setListRQStatus] = useState([])
  const [formData, setFormData] = useState([
    { name: 'Khách hàng', binding: 'customerId', type: 'input' },
    { name: 'Nhân viên', binding: 'staffId', type: 'input' },
    { name: 'Yêu cầu trạng thái', binding: 'requestStatus', type: 'select', options: [1, 2, 3], defaultValue: '' },
    { name: 'Lí do', binding: 'denyReason', type: 'input' },
    { name: 'Thể loại yêu cầu', binding: 'requestType', type: 'input' },
    { name: 'Ngày yêu cầu', binding: 'completeDate', type: 'input' },
  ])
  const dispatch = useDispatch()

  useEffect(() => {
    fetchListRequest()
    fetchRequestStatus()
  }, [])

  function fetchListRequest() {
    dispatch(changeLoadingState(true))
    API.getRequests()
      .then(res => {
        console.log(res);
        dispatch(changeLoadingState(false))
        setList(res.data)
      })
      .catch(err => {
        dispatch(changeLoadingState(false))
        noti.error(err.response?.data)
      })
  }

  const fetchRequestStatus = () => {
    dispatch(changeLoadingState(true))
    API.getRequestStatus()
      .then(res => {
        dispatch(changeLoadingState(false))
        setListRQStatus(res.data)
      })
      .catch(err => {
        dispatch(changeLoadingState(false))
      })
  }

  const getRequestStatus = () => {
    const requestStaus = {}
    listRQStatus.forEach(status => {
      requestStaus[status.value] = status.display
    })
  }
  useEffect(() => {
    if (setListRQStatus.length > 0) {
      setFormData([
        { name: 'Khách hàng', binding: 'customerId', type: 'input' },
        { name: 'Nhân viên', binding: 'staffId', type: 'input' },
        { name: 'Yêu cầu trạng thái', binding: 'requestStatus', type: 'select', options: listRQStatus, defaultValue: listRQStatus[0] },
        { name: 'Lí do', binding: 'denyReason', type: 'input' },
        { name: 'Thể loại yêu cầu', binding: 'requestType', type: 'input' },
        { name: 'Ngày yêu cầu', binding: 'completeDate', type: 'input' },
      ])

      getRequestStatus()
    }
  }, [listRQStatus])

  const actionAdd = () => {
    setIsShow(true)
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
        accessorKey: 'customerName',
        header: 'Tên khách hàng',
      },
      {
        accessorKey: 'staffName',
        header: 'Tên nhân viên'
      },
      {
        accessorKey: 'requestStatus',
        header: 'Yêu cầu trạng thái',
      },
      {
        accessorKey: 'denyReason',
        header: 'Lí do',
      },
      {
        accessorKey: 'requestType',
        header: 'Thể loại yêu cầu',
      },
      {
        accessorKey: 'completeDate',
        header: 'Ngày yêu cầu',
      },
    ],
    [],
  )

  return (
    <div className='w-full'>
      <div className=' w-full md:w-[90%] mx-auto mt-10'>
      <button className='btn-primary px-3 py-1 my-2' onClick={actionAdd} >Thêm mới</button>
        <MantineReactTable
          columns={columns}
          initialState={{ columnVisibility: { id: false } }}
          data={list}
          enableEditing
          renderRowActions={({ row, table }) => (
            <div className='flex items-center'>
              {/* <button onClick={() => getDetailHastag(row)} className=''><AiOutlineEdit className='edit-icon' /></button>
              <button onClick={() => handleDeleteRow(row)} className=''><MdDelete className='del-icon' /></button> */}
            </div>
          )}
        />
      </div>
      {isShow ?
        <FormBase title={formData}
          // onSubmit={addHastag}
          buttonName={'Thêm mới'}
          //onCancel={handleCancel}
        /> : ''
      }
    </div>
  )
}

export default AdminRequest
