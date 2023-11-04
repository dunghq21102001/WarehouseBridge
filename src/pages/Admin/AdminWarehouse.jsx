import { useCallback, useEffect, useMemo, useState } from 'react'
import { MantineReactTable } from 'mantine-react-table'
import API from '../../API'
import noti from '../../common/noti'
import { useDispatch } from 'react-redux'
import { changeLoadingState } from '../../reducers/SystemReducer'
import FormBase from '../../components/FormBase'
import FormUpdate from '../../components/FormUpdate'
import { AiOutlineEdit } from 'react-icons/ai'
import { MdDelete } from 'react-icons/md'
import { storage } from '../../firebase'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
function AdminWarehouse() {

  const [list, setList] = useState([])
  const [isShow, setIsShow] = useState(false)
  const [isShowUpdate, setIsShowUpdate] = useState(false)
  const [listProvider, setListProvider] = useState([])
  const [listCategory, setListCategory] = useState([])
  const [detailWH, setDetailWH] = useState(null)
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
    fetchListCategory()
  }, [])

  useEffect(() => {
    if (listProvider.length > 0 && listCategory.length > 0) {
      setFormData([
        { name: 'Tên', binding: 'name', type: 'input' },
        { name: 'Mô tả ngắn', binding: 'shortDescription', type: 'area' },
        { name: 'Mô tả chi tiết', binding: 'description', type: 'area' },
        { name: 'Địa chỉ', binding: 'address', type: 'input' },
        { name: 'Kinh độ', binding: 'longitudeIP', type: 'input' },
        { name: 'Vĩ độ', binding: 'latitudeIP', type: 'input' },
        { name: 'Hình ảnh', binding: 'image', type: 'file' },
        { name: 'Nhà cung cấp', binding: 'providerId', type: 'select', options: listProvider, defaultValue: listProvider[0] },
        { name: 'Danh mục', binding: 'categoryId', type: 'select', options: listCategory, defaultValue: listCategory[0] },
      ])
    }
  }, [listProvider, listCategory])

  const getDetailWH = (data) => {
    // console.log(data.original)
    let tmpData
    dispatch(changeLoadingState(true))
    API.warehouseById(data.original.id)
      .then(res => {
        dispatch(changeLoadingState(false))
        tmpData = res.data
        tmpData['image'] = []

        API.imageByWarehouseId(data.original.id)
          .then(res => {
            res.data.map(item => {
              tmpData.image.push(item?.imageURL)
            })
            setDetailWH(tmpData)
          })
          .catch(err => {
          })
      })
      .catch(err => {
        dispatch(changeLoadingState(false))
      })

    setIsShowUpdate(true)
  }

  async function updateWH(data) {
    if (Array.isArray(data?.image)) {
      // const imageUrls = []

      // for (const imageItem of data.image) {
      //   if (imageItem instanceof File) {
      //     // Đây là một object File, bạn có thể tải lên Firebase Storage
      //     const imageName = `${new Date().getTime()}_${imageItem.name}`
      //     const imageRef = ref(storage, `images/${imageName}`)
      //     await uploadBytes(imageRef, imageItem)
      //     const imageUrl = await getDownloadURL(imageRef)
      //     imageUrls.push(imageUrl)
      //   } else if (typeof imageItem === 'string') {
      //     // Đây là một URL hình ảnh, bạn có thể xử lý nó tùy ý
      //     imageUrls.push(imageItem)
      //   }
      // }
      // Bây giờ imageUrls sẽ chứa URL của tất cả các hình ảnh đã tải lên Firebase Storage.
      // có thể sử dụng imageUrls khi cần thiết.

      const finalData = {
        id: data?.id,
        providerId: data?.providerId,
        categoryId: data?.categoryId,
        name: data?.name,
        address: data?.address,
        description: data?.description,
        shortDescription: data?.shortDescription,
        longitudeIP: data?.longitudeIP,
        latitudeIP: data?.latitudeIP,
        isDisplay: true
      }
      dispatch(changeLoadingState(true))
      API.updateWarehouse(finalData)
        .then(res => {
          noti.success(res.data)
          dispatch(changeLoadingState(false))
          handleCancel()
          fetchListWarehouse()
        })
        .catch(err => {
          noti.error(err?.response?.data)
          dispatch(changeLoadingState(false))
        })
    }

  }

  function fetchListWarehouse() {
    dispatch(changeLoadingState(true))
    API.warehousesByAdmin()
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

  function fetchListCategory() {
    API.categories()
      .then(res => {
        setListCategory(res.data)
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
        accessorKey: 'name',
        header: 'Tên',
      },
      {
        accessorKey: 'shortDescription',
        header: 'Mô tả ngắn',
        size: 400
      },
      {
        accessorKey: 'description',
        header: 'Mô tả chi tiết',
        size: 800
      },
      {
        accessorKey: 'address',
        header: 'Địa chỉ',
        size: 300
      },
      {
        accessorKey: 'latitudeIP',
        header: 'Vĩ độ',
      },
      {
        accessorKey: 'longitudeIP',
        header: 'Kinh độ'
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

  const handleCancel = () => {
    setIsShow(false)
    setIsShowUpdate(false)
  }

  const actionAdd = () => {
    setIsShow(true)
  }

  const addWarehouse = async (data) => {
    const images = data.images
    if (images.length != 0) {
      dispatch(changeLoadingState(true))
      try {
        const imageUrls = await Promise.all(images.map(async (image) => {
          const imageName = `${new Date().getTime()}_${image.name}`
          const imageRef = ref(storage, `images/${imageName}`)
          await uploadBytes(imageRef, image)
          const imageUrl = await getDownloadURL(imageRef)
          return imageUrl
        }))

        const finalData = {
          warehourse: {
            providerId: data.providerId || listProvider[0]?.id,
            categoryId: data.categoryId || listCategory[0]?.id,
            name: data.name,
            address: data.address,
            description: data.description,
            shortDescription: data.shortDescription,
            longitudeIP: data.longitudeIP,
            latitudeIP: data.latitudeIP,
          },
          listImages: imageUrls,
        }

        API.addWarehouse(finalData)
          .then(res => {
            fetchListWarehouse()
            setIsShow(false)
            noti.success(res.data, 3000)
          })
          .catch(err => {
            noti.error(err.response?.data, 3000)
          })
        dispatch(changeLoadingState(false))
      } catch (error) {
        console.log("Lỗi khi tải lên ảnh" + error, 3000);
      }
    } else noti.error('Bạn phải thêm ít nhất 1 ảnh để tạo kho!', 2500)

  }

  const handleDeleteRow = useCallback(
    (row) => {
      if (
        !confirm(`Bạn có chắc muốn xoá kho ${row.getValue('name')}`)
      ) {
        return
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
  )

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
              <button onClick={() => getDetailWH(row)} className=''><AiOutlineEdit className='edit-icon' /></button>
              <button onClick={() => handleDeleteRow(row)} className=''><MdDelete className='del-icon' /></button>
            </div>
          )}
        />
      </div>
      {isShowUpdate ?
        <FormUpdate
          title={formData}
          onSubmit={updateWH}
          buttonName={'Chỉnh sửa'}
          initialData={detailWH}
          onCancel={handleCancel}
        />
        : null}
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