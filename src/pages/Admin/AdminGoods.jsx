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
import { storage } from '../../firebase'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { AiOutlineEdit } from "react-icons/ai"
import { confirmAlert } from 'react-confirm-alert'

function AdminGoods() {

  const [list, setList] = useState([])
  const [listRentWareHouse, setListRentWareHouse] = useState([])
  const [isShow, setIsShow] = useState(false)
  const [formData, setFormData] = useState([
    { name: 'Kho', binding: 'rentWarehouseId', type: 'select', options: [1, 2, 3], defaultValue: '' },
    { name: 'Tên', binding: 'goodName', type: 'input' },
    { name: 'Số lượng', binding: 'quantity', type: 'input' },
    { name: 'Đơn', binding: 'quantity', type: 'input' },
    { name: 'Mô tả', binding: 'description', type: 'input' },
    { name: 'Hình ảnh', binding: 'image', type: 'file' },
  ])


  const dispatch = useDispatch()
  useEffect(() => {
    fetchListGood()
    fetchListRentWareHouse()
  }, [])

  useEffect(() => {
    if (listRentWareHouse.length > 0) {
      const options = listRentWareHouse.map(warehouse => ({
        value: warehouse.id,
        label: warehouse.information,
      }));
      setFormData([
        { name: 'Kho', binding: 'rentWarehouseId', type: 'select', options, defaultValue: options[0].value },
        { name: 'Tên', binding: 'goodName', type: 'input' },
        { name: 'Số lượng', binding: 'quantity', type: 'input' },
        { name: 'Đơn', binding: 'quantity', type: 'input' },
        { name: 'Mô tả', binding: 'description', type: 'input' },
        { name: 'Hình ảnh', binding: 'image', type: 'file' },
      ])
    }
  }, [listRentWareHouse])

  const actionAdd = () => {
    setIsShow(true)
  }

  const handleCancel = () => {
    setIsShow(false)
    // setIsShowUpdate(false)
  }

  function fetchListGood() {
    dispatch(changeLoadingState(true))
    API.getGoods()
      .then(res => {
        dispatch(changeLoadingState(false))
        setList(res.data)
      })
      .catch(err => {
        dispatch(changeLoadingState(false))
        noti.error(err.response?.data)
      })
  }


  function fetchListRentWareHouse() {
    API.rentWareHouseAdmin()
      .then(res => {
        console.log('====================================');
        console.log(res);
        console.log('====================================');
        setListRentWareHouse(res.data)
      })
      .catch(err => { })
  }

  const addGood = async (data) => {
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
          goodCreateModel: {
            rentWarehouseId: data.rentWarehouseId || listRentWareHouse[0]?.id,
            goodName: data.goodName,
            quantity: data.quantity,
            goodUnit: data.goodUnit,
            description: data.description,
          },
          images: imageUrls,
        }

        API.addGood(finalData)
          .then(res => {
            fetchListGood()
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
        accessorKey: 'rentWarehouseId',
        header: 'Kho'
      },
      {
        accessorKey: 'goodName',
        header: 'Tên',
      },
      {
        accessorKey: 'quantity',
        header: 'Số lượng',
      },
      {
        accessorKey: 'goodUnit',
        header: 'Đơn',
      },
      {
        accessorKey: 'description',
        header: 'Mô tả',
      },
      {
        accessor: 'goodImages', // Access the array of images
        header: 'Image Url',
        Cell: ({ cell }) => (
          <div>
            {cell.row.original.goodImages.map((image) => (
              <img key={image.id} src={image.imageUrl} alt="Good Image" />
            ))}
          </div>
        ),
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
      {/* {isShowUpdate ?
        <FormUpdate
          title={formData}
          buttonName={'Chỉnh sửa'}
          initialData={detailHastag}
          onSubmit={updateHastag}
          onCancel={handleCancel}
        />
        : null} */}
      {isShow ?
        <FormBase title={formData}
          onSubmit={addGood}
          buttonName={'Thêm mới'}
          onCancel={handleCancel}
        /> : ''
      }
    </div>
  )
}

export default AdminGoods