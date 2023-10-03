import { useCallback, useEffect, useMemo, useState } from 'react';
import { MantineReactTable } from 'mantine-react-table';
import API from '../../API'
import noti from '../../common/noti'
import { useDispatch } from 'react-redux';
import { changeLoadingState } from '../../reducers/SystemReducer'
import FormBase from '../../components/FormBase';
import { Button } from '@mantine/core';
import { AiOutlineEdit } from 'react-icons/ai'
import { MdDelete } from 'react-icons/md'
function AdminWarehouse() {
  const [list, setList] = useState([])
  const [isShow, setIsShow] = useState(false)
  const [listProvider, setListProvider] = useState([])
  const [listCategory, setListCategory] = useState([])
  const [formData, setFormData] = useState([
    { name: 'Tên', binding: 'name', type: 'input' },
    { name: 'Mô tả ngắn', binding: 'shortDescription', type: 'area' },
    { name: 'Mô tả chi tiết', binding: 'description', type: 'area' },
    { name: 'Địa chỉ', binding: 'address', type: 'input' },
    { name: 'Kinh độ', binding: 'longitudeIP', type: 'input' },
    { name: 'Vĩ độ', binding: 'latitudeIP', type: 'input' },
    { name: 'Hình ảnh', binding: 'image', type: 'file' },
    { name: 'Nhà cung cấp', binding: 'providerId', type: 'select', options: [1, 2, 3], defaultValue: '' },
    { name: 'Danh mục', binding: 'categoryId', type: 'select', options: [1, 2, 3], defaultValue: '' },
  ])
  const dispatch = useDispatch()

  useEffect(() => {
    fetchListWarehouse()
    fetchListProvider()
  }, [])

  function fetchListWarehouse() {
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
  }

  function fetchListProvider() {
    API.provider()
      .then(res => {
        setListProvider(res.data)
      })
      .catch(err => {
        noti.error(err.response?.data)
      })
  }

  const getCommonEditTextFieldProps = useCallback(
    (cell) => {
      return {
       
      }
    },
    [],
  );

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
        accessorKey: 'name',
        header: 'Tên',
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
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

  const handleCancel = () => {
    setIsShow(false)
  }

  const actionAdd = () => {
    setIsShow(true)
  }

  const addWarehouse = (data) => {
    const finalData = {
      warehourse: {
        providerId: '6667b930-9fc3-46e2-b99c-08dbc0c63a22',
        categoryId: 'ad16f379-a7f6-4ed3-ae9f-08dbc0c673a1',
        name: data.name,
        address: data.address,
        description: data.description,
        shortDescription: data.shortDescription,
        longitudeIP: data.longitudeIP,
        latitudeIP: data.latitudeIP
      },
      listImages: [
        'https://scontent.fsgn19-1.fna.fbcdn.net/v/t39.30808-6/385460867_872705701083005_6731573408211292098_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=5614bc&_nc_ohc=QUwviCyTJdgAX_xlgEu&_nc_ht=scontent.fsgn19-1.fna&_nc_e2o=f&oh=00_AfCKK8mDKlOdRwOz4hytUzaxLWE4put248HXW5bqSjklXA&oe=651E77C3'
      ]
    }

    API.addWarehouse(finalData)
      .then(res => {
        fetchListWarehouse()
        setIsShow(false)
        // noti.success(res.data, 3000)
      })
      .catch(err => {
        noti.error(err.response?.data, 3000)
      })
  }

  const handleDeleteRow = useCallback(
    (row) => {
      if (
        !confirm(`Bạn có chắc muốn xoá kho ${row.getValue('name')}`)
      ) {
        return;
      }
      API.deleteWarehouse(row.getValue('id'))
      .then(res => {
        fetchListWarehouse()
        noti.success(res.data)
      })
      .catch(err => {
        noti.error(err.response?.data)
      })
    },
    [],
  );

  return (
    <div className='w-full'>
      <div className=' w-full md:w-[90%] mx-auto mt-10'>
        <button className='btn-primary px-3 py-1 my-2' onClick={actionAdd}>Thêm</button>
        <MantineReactTable
          columns={columns}
          data={list}
          enableEditing
          renderRowActions={({ row, table }) => (
            <div className='flex items-center'>
              <button onClick={() => table.setEditingRow(row)} className=''><AiOutlineEdit className='edit-icon' /></button>
              <button onClick={() => handleDeleteRow(row)} className=''><MdDelete className='del-icon' /></button>
            </div>
          )}
        />
      </div>
      {isShow ?
        <FormBase title={formData}
          onSubmit={addWarehouse}
          buttonName={'Thêm mới'}
          onCancel={handleCancel}
        /> : ''}
    </div>
  )
}

export default AdminWarehouse