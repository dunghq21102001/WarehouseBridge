
import { useCallback, useEffect, useMemo, useState } from "react"
import { useDispatch } from "react-redux"
import { changeLoadingState } from "../../reducers/SystemReducer"
import API from "../../API"
import noti from "../../common/noti"
import FormBase from '../../components/FormBase';
import { MantineReactTable } from "mantine-react-table"
import { MdDelete } from 'react-icons/md'
import '../../css/AdminBody.css'
import { AiOutlineEdit } from "react-icons/ai"

function AdminHashtag() {

  useEffect(() => {
    fetchListHastag()
  }, [])

  const dispatch = useDispatch()

  const [list, setList] = useState([])

  function fetchListHastag() {
    dispatch(changeLoadingState(true))
    API.getHastags()
      .then(res => {
        dispatch(changeLoadingState(false))
        setList(res.data)
      })
      .catch(err => {
        dispatch(changeLoadingState(false))
        noti.error(err.response?.data)
      })
  }
  return (
    <div>AdminHashtag</div>
  )
}

export default AdminHashtag