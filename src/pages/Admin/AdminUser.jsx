import { MantineReactTable } from 'mantine-react-table'
import { useMemo } from "react"
import { useEffect, useState } from "react"
import API from '../../API'
import { useDispatch } from 'react-redux'
import { changeLoadingState } from '../../reducers/SystemReducer'
import { AiOutlineEdit } from 'react-icons/ai'
import { MdDelete } from 'react-icons/md'
import func from '../../common/func'


function AdminUser() {
    const dispatch = useDispatch()
    const [list, setList] = useState([])
    const [listStaff, setListStaff] = useState([])
    const [detailUser, setDetailUser] = useState({})
    const [detailStaff, setDetailStaff] = useState({})
    const [isAddUser, setIsAddUser] = useState(false)
    const [isAddStaff, setIsStaff] = useState(false)
    const [isUpdateUser, setIsUpdateUser] = useState(false)
    const [isUpdateStaff, setIsUpdateStaff] = useState(false)

    const [formDataUser, setFormDataUser] = useState([
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

      const [formDataStaff, setFormDataStaff] = useState([
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

    useEffect(() => {
        fetchUser()
        fetchStaff()
    }, [])

    const fetchUser = () => {
        dispatch(changeLoadingState(true))
        API.users()
            .then(res => {
                setList(res.data)
                dispatch(changeLoadingState(false))
            })
            .catch(er => dispatch(changeLoadingState(false)))
    }

    const fetchStaff = () => {
        dispatch(changeLoadingState(true))
        API.staffs()
            .then(res => {
                setListStaff(res.data)
                dispatch(changeLoadingState(false))
            })
            .catch(er => dispatch(changeLoadingState(false)))
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
                accessorKey: 'userName',
                header: 'Tên người dùng',
            },
            {
                accessorKey: 'fullname',
                header: 'Họ và tên',
            },
            {
                accessorKey: 'email',
                header: 'Email',
            },
            {
                accessorKey: 'emailConfirmed',
                header: 'Xác thực email',
                Cell: ({ cell, row }) => (
                    <div>
                        {cell.getValue() == true ? 'Đã xác thực' : 'Chưa xác thực'}
                    </div>
                ),
            },
            {
                accessorKey: 'phoneNumber',
                header: 'Số điện thoại'
            },
            {
                accessorKey: 'birthday',
                header: 'Sinh nhật',
                Cell: ({ cell, row }) => (
                    <div>
                        {func.convertDate(cell.getValue())}
                    </div>
                ),
            },
            {
                accessorKey: 'avatar',
                header: 'Ảnh đại diện',
                Cell: ({ cell, row }) => (
                    <div>
                        <img className="w-[100px] h-[100px] object-cover" src={cell.getValue() != 'null' ? cell.getValue() : 'https://images.are.na/eyJidWNrZXQiOiJhcmVuYV9pbWFnZXMiLCJrZXkiOiI4MDQwOTc0L29yaWdpbmFsX2ZmNGYxZjQzZDdiNzJjYzMxZDJlYjViMDgyN2ZmMWFjLnBuZyIsImVkaXRzIjp7InJlc2l6ZSI6eyJ3aWR0aCI6MTIwMCwiaGVpZ2h0IjoxMjAwLCJmaXQiOiJpbnNpZGUiLCJ3aXRob3V0RW5sYXJnZW1lbnQiOnRydWV9LCJ3ZWJwIjp7InF1YWxpdHkiOjkwfSwianBlZyI6eyJxdWFsaXR5Ijo5MH0sInJvdGF0ZSI6bnVsbH19?bc=0'} alt="avt staff" />
                    </div>
                ),
            }
        ],
        [],
    )

    const actionAdd = () => { }

    const getDetail = (data) => { }

    const handleDeleteRow = (data) => { }
    return (
        <div className='w-full'>
            {/* user */}
            <div className=' w-full md:w-[90%] mx-auto mt-10'>
                <button className='btn-primary px-3 py-1 my-2' onClick={actionAdd}>Thêm người dùng</button>
                <MantineReactTable
                    columns={columns}
                    initialState={{ columnVisibility: { id: false } }}
                    data={list}
                    enableEditing
                    renderRowActions={({ row, table }) => (
                        <div className='flex items-center'>
                            <button onClick={() => getDetail(row)} className=''><AiOutlineEdit className='edit-icon' /></button>
                            <button onClick={() => handleDeleteRow(row)} className=''><MdDelete className='del-icon' /></button>
                        </div>
                    )}
                />
            </div>

            {/* staff */}
            <div className=' w-full md:w-[90%] mx-auto mt-10'>
                <button className='btn-primary px-3 py-1 my-2' onClick={actionAdd}>Thêm quản lý</button>
                <MantineReactTable
                    columns={columns}
                    initialState={{ columnVisibility: { id: false } }}
                    data={listStaff}
                    enableEditing
                    renderRowActions={({ row, table }) => (
                        <div className='flex items-center'>
                            <button onClick={() => getDetail(row)} className=''><AiOutlineEdit className='edit-icon' /></button>
                            <button onClick={() => handleDeleteRow(row)} className=''><MdDelete className='del-icon' /></button>
                        </div>
                    )}
                />
            </div>
        </div>
    )
}

export default AdminUser