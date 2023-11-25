import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { changeLoadingState } from "../../reducers/SystemReducer";
import API from "../../API";
import noti from "../../common/noti";
import FormBase from "../../components/FormBase";
import { MantineReactTable } from "mantine-react-table";
import { MdDelete } from "react-icons/md";
import FormUpdate from "../../components/FormUpdate";
import "../../css/AdminBody.css";
import { AiOutlineEdit } from "react-icons/ai";
import { confirmAlert } from "react-confirm-alert";
import func from "../../common/func";

const AdminRequest = () => {
  const [list, setList] = useState([]);
  const [isShow, setIsShow] = useState(false);
  const [listUser, setListUser] = useState([]);
  const [listStaff, setListStaff] = useState([]);
  const [listRQStatus, setListRQStatus] = useState([]);
  const [listRQType, setListRQType] = useState([]);
  const [isShowUpdate, setIsShowUpdate] = useState(false)
  const [request, setRequest] = useState(null)
  const [formData, setFormData] = useState([
    {
      name: "Khách hàng",
      binding: "customerId",
      type: "select",
      options: [1, 2, 3],
      defaultValue: "",
    },
    {
      name: "Nhân viên",
      binding: "staffId",
      type: "select",
      options: [1, 2, 3],
      defaultValue: "",
    },
    {
      name: "Yêu cầu trạng thái",
      binding: "requestStatus",
      type: "select",
      options: [1, 2, 3],
      defaultValue: "",
    },
    { name: "Lí do", binding: "denyReason", type: "input" },
    {
      name: "Thể loại yêu cầu",
      binding: "requestType",
      type: "select",
      options: [1, 2],
      defaultValue: "",
    },
  ]);

  const [formData2, setFormData2] = useState([
    {
      name: "Yêu cầu trạng thái",
      binding: "requestStatus",
      type: "select",
      options: [1, 2, 3],
      defaultValue: "",
    },
    {
      name: "Thể loại yêu cầu",
      binding: "requestType",
      type: "select",
      options: [1, 2],
      defaultValue: "",
    },
  ]);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchListRequest();
    fetchRequestStatus();
    fetchRequestType();
    fetchListUser();
    fetchListStaff();
  }, []);

  function fetchListRequest() {
    dispatch(changeLoadingState(true));
    API.getRequests()
      .then((res) => {
        dispatch(changeLoadingState(false));
        setList(res.data);
      })
      .catch((err) => {
        dispatch(changeLoadingState(false));
        noti.error(err.response?.data);
      });
  }

  const fetchRequestType = () => {
    dispatch(changeLoadingState(true));
    API.getRequestType()
      .then((res) => {
        dispatch(changeLoadingState(false));
        setListRQType(res.data);
      })
      .catch((err) => {
        dispatch(changeLoadingState(false));
      });
  };

  const fetchListStaff = () => {
    dispatch(changeLoadingState(true));
    API.staffs()
      .then((res) => {
        dispatch(changeLoadingState(false));
        setListStaff(res.data);
      })
      .catch((err) => {
        dispatch(changeLoadingState(false));
      });
  };

  const fetchListUser = () => {
    dispatch(changeLoadingState(true));
    API.users()
      .then((res) => {
        dispatch(changeLoadingState(false));
        setListUser(res.data);
      })
      .catch((err) => {
        dispatch(changeLoadingState(false));
      });
  };

  const fetchRequestStatus = () => {
    dispatch(changeLoadingState(true));
    API.getRequestStatus()
      .then((res) => {
        dispatch(changeLoadingState(false));
        setListRQStatus(res.data);
      })
      .catch((err) => {
        dispatch(changeLoadingState(false));
      });
  };

  const getRequestStatus = () => {
    const requestStatus = {}; 
    listRQStatus.forEach((status) => {
      requestStatus[status.value] = status.display;
    });
  };
  
  const getRequestType = () => {
    const requestType = {};
    listRQType.forEach((status) => {
      requestType[status.value] = status.display;
    });
  };

  const getUser = () => {
    const user = {};
    listUser.forEach((status) => {
      user[status.id] = status.fullname;
    });
  };
  const getStaff = () => {
    const user = {};
    listUser.forEach((status) => {
      user[status.id] = status.fullname;
    });
  };

  const addRequest = (data) => {
    const finalData = {
      customerId: data?.customerId || listUser[0]?.id,
      staffId: data?.staffId || listStaff[0]?.id,
      requestStatus: data?.requestStatus == "Pending" ? 1 : data?.requestStatus == "Canceled" ? 2 : 3 || listRQStatus[0]?.value, 
      denyReason: data?.denyReason,
      requestType: data?.requestType == "PickUp" ? 1 : 2 || listRQType[0]?.value,
    };
    API.addRequest(finalData)
      .then((res) => {
        fetchListRequest();
        setIsShow(false);
        noti.success(res.data, 3000);
      })
      .catch((err) => {
        noti.error(err.response?.data, 3000);
      });
  };


  useEffect(() => {
    if (setListRQStatus.length > 0 && setListUser.length > 0 && setListStaff.length > 0 && setListRQType.length > 0) {
      setFormData([
        {
          name: "Khách hàng",
          binding: "customerId",
          type: "select",
          options: listUser,
          defaultValue: listUser[0], 
        },
        {
          name: "Nhân viên",
          binding: "staffId",
          type: "select",
          options: listStaff,
          defaultValue: listStaff[0], 
        },
        {
          name: "Yêu cầu trạng thái",
          binding: "requestStatus",
          type: "select",
          options: listRQStatus,
          defaultValue: listRQStatus[0],
        },
        { name: "Lí do", binding: "denyReason", type: "input" },
        {
          name: "Thể loại yêu cầu",
          binding: "requestType",
          type: "select",
          options: listRQType,
          defaultValue: listRQType[0],
        },
      ]);

      // getRequestStatus();
    }
  }, [listRQStatus, listUser, listStaff, listRQType])

  useEffect(() => {
    if (setListRQStatus.length > 0 && setListUser.length > 0 && setListStaff.length > 0 && setListRQType.length > 0) {
      setFormData2([
        {
          name: "Yêu cầu trạng thái",
          binding: "requestStatus",
          type: "select",
          options: listRQStatus,
          defaultValue: listRQStatus[0],
        },     
        {
          name: "Thể loại yêu cầu",
          binding: "requestType",
          type: "select",
          options: listRQType,
          defaultValue: listRQType[0],
        },
      ]);

      // getRequestStatus();
    }
  }, [listRQStatus, listUser, listStaff, listRQType])

  const handleCancel = () => {
    setIsShow(false);
    setIsShowUpdate(false)
  };

  const getRequest = (data) => {
    setRequest({
      id: data.original.id,
      customerId: data.original.customerId,
      staffId: data.original.staffId,
      requestStatus: data.original.requestStatus,
      denyReason: data.original.denyReason,
      requestType: data.original.requestType,
    })
    setIsShowUpdate(true)
  }

  const updateRequest = (data) => {
    dispatch(changeLoadingState(true))
    API.updateRequest({
      id: data?.id,
      customerId: data?.customerId || listUser[0]?.id,
      staffId: data?.staffId || listStaff[0]?.id,
      requestStatus: data?.requestStatus == "Pending" ? 1 : data?.requestStatus == "Canceled" ? 2 : 3 || listRQStatus[0]?.value, 
      denyReason: data?.denyReason,
      requestType: data?.requestType == "PickUp" ? 1 : 2 || listRQType[0]?.value,
    })
      .then(res => {
        handleCancel()
        dispatch(changeLoadingState(false))
        fetchListRequest()
        noti.success(res.data)
      })
      .catch(err => {
        noti.error(err?.response?.data?.errors[0])
        dispatch(changeLoadingState(false))
      })
  }

  const handleDeleteRow = (data) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className='bg-[#f7f7f7] rounded-md p-4 shadow-md'>
            <p className="text-[24px]">Bạn có chắc chắn muốn xoá request này</p>
            <div className="w-full flex justify-end mt-3">
              <button className="px-3 py-1 mr-2 rounded-md btn-cancel" onClick={onClose}>Huỷ</button>
              <button
                className="px-3 py-1 rounded-md btn-primary"
                onClick={() => {
                  deleteRequest(data.getValue('id'))
                  onClose()
                }}
              >
                Xoá
              </button>
            </div>
          </div>
        )
      }
    })
  }

  const deleteRequest = (id) => {
    API.deleteRequest(id)
      .then(res => {
        fetchListRequest()
        noti.success(res.data)
      })
      .catch(err => {
        noti.error(err.response?.data)
      })
  }

  // const actionAdd = () => {
  //   setIsShow(true);
  // };

  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        Cell: ({ cell, row }) => <div>...</div>,
      },
      {
        accessorKey: "customerName",
        header: "Tên khách hàng",
      },
      // {
      //   accessorKey: "staffName",
      //   header: "Tên nhân viên",
      // },
      {
        accessorKey: "requestStatus",
        header: "Yêu cầu trạng thái",
      },
      {
        accessorKey: "denyReason",
        header: "Lí do",
      },
      {
        accessorKey: "requestType",
        header: "Thể loại yêu cầu",
      },
      {
        accessorKey: "completeDate",
        header: "Ngày yêu cầu",
        Cell: ({ cell, row }) => <div>{func.convertDate(cell.getValue())}</div>,
      },
    ],
    []
  );

  return (
    <div className="w-full">
      <div className=" w-full md:w-[90%] mx-auto mt-10">
        {/* <button className="btn-primary px-3 py-1 my-2" onClick={actionAdd}>
          Thêm mới
        </button> */}
        <MantineReactTable
          columns={columns}
          initialState={{ columnVisibility: { id: false } }}
          data={list}
          enableEditing
          renderRowActions={({ row, table }) => (
            <div className="flex items-center">
              <button onClick={() => getRequest(row)} className=''><AiOutlineEdit className='edit-icon' /></button>
              <button onClick={() => handleDeleteRow(row)} className=''><MdDelete className='del-icon' /></button>
            </div>
          )}
        />
      </div>
      {isShow ? (
        <FormBase
          title={formData}
          onSubmit={addRequest}
          buttonName={"Thêm mới"}
          onCancel={handleCancel}
        />
      ) : (
        ""
      )}
      {isShowUpdate ?
        <FormUpdate
          title={formData2}
          buttonName={'Chỉnh sửa'}
          initialData={request}
          onSubmit={updateRequest}
          onCancel={handleCancel}
        />
        : null}
    </div>
  );
};

export default AdminRequest;
