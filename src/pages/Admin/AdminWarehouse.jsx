import { useEffect, useMemo, useState } from 'react';
import { MantineReactTable } from 'mantine-react-table';
import API from '../../API'
import noti from '../../common/noti'
import { useDispatch } from 'react-redux';
import { changeLoadingState } from '../../reducers/SystemReducer'


function AdminWarehouse() {

  const [list, setList] = useState([])
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(changeLoadingState(true))
    API.warehouses()
      .then(res => {
        dispatch(changeLoadingState(false))
        setList(res.data)
      })
      .catch(err => {
        dispatch(changeLoadingState(false))
        noti.error(err.response?.data)
      })
  }, [])
  const columns = useMemo(
    () => [
      {
        name: "isDisplay",
        header: 'Hiển thị',
      },
      {
        accessorKey: 'shortDescription',
        header: 'Mô tả ngắn',
      },
      {
        accessorKey: 'description',
        header: 'Mô tả chi tiết',
      },
      {
        accessorKey: 'address',
        header: 'Địa chỉ',
      },
      {
        accessorKey: 'latitudeIP',
        header: 'Vĩ độ',
      },
      {
        accessorKey: 'longitudeIP',
        header: 'Kinh độ'
      }
    ],
    [],
  )

  return (
    <div className=' w-full md:w-[90%] mx-auto mt-10'>
      <MantineReactTable
        columns={columns}
        data={list}
      />
    </div>
  )
}

export default AdminWarehouse