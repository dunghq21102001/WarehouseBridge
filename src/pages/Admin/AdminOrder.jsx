import React, { useEffect, useMemo, useState } from "react";
import { changeLoadingState } from "../../reducers/SystemReducer";
import API from "../../API";
import { useDispatch } from "react-redux";
import { MantineReactTable, useMantineReactTable } from "mantine-react-table";
import { AiOutlineEdit } from "react-icons/ai";
import { BiSolidPhoneCall } from "react-icons/bi";
import { MdDelete, MdOutlineAssignmentInd } from "react-icons/md";
import { GrUpdate } from "react-icons/gr";
import { FaFileContract } from "react-icons/fa";
import func from "../../common/func";
import noti from "../../common/noti";
import { storage } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Textarea } from "@mantine/core";

function AdminOrder() {
  const dispatch = useDispatch();
  const [orderStatusSelected, setOrderStatusSelected] = useState("");
  const [orderIdSelected, setOrderIdSelected] = useState("");
  const [staffSelected, setStaffSelected] = useState("");
  const [listOrder, setListOrder] = useState([]);
  const [listStaff, setListStaff] = useState([]);
  const [listEnumOrder, setListEnumOrder] = useState([]);
  const [isShowAssign, setIsShowAssign] = useState(false);
  const [isShowAdd, setIsShowAdd] = useState(false);
  const [isShowUpdate, setIsShowUpdate] = useState(false);
  const [isShowUpdateStatus, setIsShowUpdateStatus] = useState(false);
  const [pickupDay, setPickupDay] = useState("");
  const [orderStaticObj, setOrderStaticObj] = useState({});
  const [isShowAddContract, setIsShowAddContract] = useState(false);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [fileContract, setFileContract] = useState("");
  const [description, setDescription] = useState("");
  useEffect(() => {
    fetchOrderEnum();
    fetchOrder();
    fetchStaff();
    fetchOrderStatic();
  }, []);

  const fetchOrderStatic = () => {
    dispatch(changeLoadingState(true));
    API.orderStatic()
      .then((res) => {
        dispatch(changeLoadingState(false));
        setOrderStaticObj(res.data);
      })
      .catch((err) => dispatch(changeLoadingState(false)));
  };

  const fetchOrder = () => {
    dispatch(changeLoadingState(true));
    API.getOrderAdmin()
      .then((res) => {
        setListOrder(res.data.reverse());
        dispatch(changeLoadingState(false));
      })
      .catch((err) => {
        dispatch(changeLoadingState(false));
      });
  };

  const fetchStaff = () => {
    dispatch(changeLoadingState(true));
    API.staffs()
      .then((res) => {
        dispatch(changeLoadingState(false));
        setListStaff(res.data);
      })
      .catch((err) => dispatch(changeLoadingState(false)));
  };

  const fetchOrderEnum = () => {
    API.enumOrdersStatus()
      .then((res) => {
        setListEnumOrder(res.data);
      })
      .catch((err) => {});
  };
  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        // Cell: ({ cell, row }) => (
        //   <div>
        //     ...
        //   </div>
        // ),
      },
      {
        accessorKey: "customer.userName",
        header: "Khách hàng",
      },
      {
        accessorKey: "warehouseDetail.warehouse.name",
        header: "Kho",
        size: 450,
      },
      {
        accessorKey: "customer.phoneNumber",
        header: "Số điện thoại",
      },
      {
        accessorKey: "deposit",
        header: "Cọc",
        Cell: ({ cell, row }) => <div>{func.convertVND(cell.getValue())}</div>,
      },
      {
        accessorKey: "warehousePrice",
        header: "Giá kho",
        Cell: ({ cell, row }) => <div>{func.convertVND(cell.getValue())}</div>,
      },
      {
        accessorKey: "servicePrice",
        header: "Giá dịch vụ",
        Cell: ({ cell, row }) => <div>{func.convertVND(cell.getValue())}</div>,
      },
      {
        accessorKey: "totalPrice",
        header: "Tổng giá",
        Cell: ({ cell, row }) => <div>{func.convertVND(cell.getValue())}</div>,
      },
      {
        accessorKey: 'creationDate',
        header: 'Ngày tạo',
        Cell: ({ cell, row }) => <div>{func.convertDate(cell.getValue())}</div>,
      },
      {
        accessorKey: 'deletionDate',
        header: 'Ngày lấy hàng',
        Cell: ({ cell, row }) => <div>{cell.getValue() ? func.convertDate(cell.getValue()) : 'Chưa lấy'}</div>,
      },
      {
        accessorKey: "depth",
        header: "Độ sâu",
      },
      {
        accessorKey: "height",
        header: "Chiều cao",
      },
      {
        accessorKey: "width",
        header: "Chiều rộng",
      },
      {
        accessorKey: "orderStatus",
        header: "Trạng thái đơn hàng",
      },
      {
        accessorKey: "paymentStatus",
        header: "Trạng thái thanh toán",
        size: 220,
      },
      {
        accessorKey: "totalCall",
        header: "Tổng cuộc gọi",
      },
      {
        accessorKey: "unitType",
        header: "Đơn vị",
      },
      {
        accessorKey: "cancelReason",
        header: "Lý do huỷ",
      },
      {
        accessorKey: "contactInDay",
        header: "Liên hệ trong ngày",
        Cell: ({ cell, row }) => (
          <div>{cell.getValue() == true ? "Có" : "Không"}</div>
        ),
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
    []
  );
  const actionAdd = () => {
    setIsShowAdd(false);
  };
  const getDetail = (data) => {
    setIsShowUpdate(false);
  };
  const handleDeleteRow = (data) => {};
  const handleCancel = () => {
    setIsShowAdd(false);
    setIsShowUpdate(false);
  };

  const cancelAll = () => {
    setStartTime("");
    setEndTime("");
    setFileContract("");
    setDescription("");
    setIsShowAddContract(false);
  };
  const changeLoadingStatus = (data) => {
    setOrderIdSelected(data.getValue("id"));
    setIsShowUpdateStatus(true);
  };
  const updateLoadingStatus = () => {
    dispatch(changeLoadingState(true));
    API.updateOrderStatus({
      id: orderIdSelected,
      orderStatus:
        orderStatusSelected != ""
          ? Number.parseInt(orderStatusSelected)
          : Number.parseInt(listEnumOrder[0]?.value),
      pickupDay: pickupDay,
    })
      .then((res) => {
        noti.success(res.data);
        dispatch(changeLoadingState(false));
        setIsShowUpdateStatus(false);
        setPickupDay("");
        fetchOrder();
      })
      .catch((err) => {
        noti.error(err?.response?.data);
        dispatch(changeLoadingState(false));
      });
  };

  const handleDateChange = (event) => {
    setPickupDay(event.target.value);
  };

  const assignStaff = (data) => {
    setIsShowAssign(true);
    setOrderIdSelected(data.getValue("id"));
  };

  const actionAssignStaff = () => {
    dispatch(changeLoadingState(true));
    API.assignOrder(
      orderIdSelected,
      staffSelected != "" ? staffSelected : listStaff[0]?.id
    )
      .then((res) => {
        dispatch(changeLoadingState(false));
        fetchOrder();
        noti.success(res.data);
        setIsShowAssign(false);
      })
      .catch((err) => {
        dispatch(changeLoadingState(false));
        noti.error("Giao phó kho thất bại! Vui lòng thử lại", 2500);
      });
  };

  const updateCall = (data) => {
    dispatch(changeLoadingState(true));
    API.orderUpdateCall(data.getValue("id"))
      .then((res) => {
        noti.success(res.data);
        fetchOrder();
        dispatch(changeLoadingState(false));
        window.location.href = "tel://" + data.getValue("customer.phoneNumber");
      })
      .catch((err) => {
        dispatch(changeLoadingState(false));
      });
  };

  const addContract = () => {
    if (startTime == "") return noti.error("Bạn phải chọn ngày bắt đầu");
    if (endTime == "") return noti.error("Bạn phải chọn ngày kết thúc");
    if (fileContract) {
      dispatch(changeLoadingState(true));
      const storageRef = ref(
        storage,
        `contracts/${Date.now() + fileContract.name}`
      );
      uploadBytes(storageRef, fileContract)
        .then((snapshot) => {
          getDownloadURL(storageRef)
            .then((downloadURL) => {
              dispatch(changeLoadingState(false));
              API.addContract({
                orderId: orderIdSelected,
                startTime: startTime,
                endTime: endTime,
                file: downloadURL,
                description: description,
              })
                .then((res) => {
                  noti.success("Tạo mới hợp đồng thành công");
                  cancelAll();
                })
                .catch((err) => {
                  noti.error(err.response?.data);
                });
            })
            .catch((error) => {
              dispatch(changeLoadingState(false));
              console.error("Error getting download URL:", error);
            });
        })
        .catch((error) => {
          console.error("Error uploading file:", error);
        });
    } else {
      noti.error("Bạn phải thêm 1 file PDF để hoàn thành việc tạo hợp đồng");
    }
  };
  return (
    <div className="w-full">
      {/* counting */}
      <div className="grid grid-cols-12 gap-3 w-[90%] mt-5 mx-auto">
        {/* 1 */}
        <div className="col-span-12 md:col-span-6 lg:col-span-3 bg-[#faf9f9] rounded-md hover:translate-y-[-5px] transition-transform h-[160px] shadow-lg">
          <p className="w-full text-[#878a99] text-[18px] m-4">Tổng đơn hàng</p>
          <p className="text-[24px] text-black mt-5 ml-4">
            {orderStaticObj?.totalOrder}
          </p>
          <div className="flex items-center w-full px-4 mt-5 justify-between">
            <span className="underline cursor-pointer text-[#687cfe]">
              Xem chi tiết
            </span>
            <div></div>
          </div>
        </div>

        {/* 2 */}
        <div className="col-span-12 md:col-span-6 lg:col-span-3 bg-[#faf9f9] rounded-md hover:translate-y-[-5px] transition-transform h-[160px] shadow-lg">
          <p className="w-full text-[#878a99] text-[18px] m-4">
            Đơn hàng thanh toán thành công
          </p>
          <p className="text-[24px] text-black mt-5 ml-4">
            {orderStaticObj?.successPaymentOrder}
          </p>
          <div className="flex items-center w-full px-4 mt-5 justify-between">
            <span className="underline cursor-pointer text-[#687cfe]">
              Xem chi tiết
            </span>
            <div></div>
          </div>
        </div>

        {/* 3 */}
        <div className="col-span-12 md:col-span-6 lg:col-span-3 bg-[#faf9f9] rounded-md hover:translate-y-[-5px] transition-transform h-[160px] shadow-lg">
          <p className="w-full text-[#878a99] text-[18px] m-4">
            Đơn hàng thanh toán thất bại
          </p>
          <p className="text-[24px] text-black mt-5 ml-4">
            {orderStaticObj?.failPaymentOrder}
          </p>
          <div className="flex items-center w-full px-4 mt-5 justify-between">
            <span className="underline cursor-pointer text-[#687cfe]">
              Xem chi tiết
            </span>
            <div></div>
          </div>
        </div>

        {/* 4 */}
        <div className="col-span-12 md:col-span-6 lg:col-span-3 bg-[#faf9f9] rounded-md hover:translate-y-[-5px] transition-transform h-[160px] shadow-lg">
          <p className="w-full text-[#878a99] text-[18px] m-4">
            Đơn hàng chờ xử lý
          </p>
          <p className="text-[24px] text-black mt-5 ml-4">
            {orderStaticObj?.pendingOrder}
          </p>
          <div className="flex items-center w-full px-4 mt-5 justify-between">
            <span className="underline cursor-pointer text-[#687cfe]">
              Xem chi tiết
            </span>
            <div></div>
          </div>
        </div>

        {/* 5 */}
        <div className="col-span-12 md:col-span-6 lg:col-span-3 bg-[#faf9f9] rounded-md hover:translate-y-[-5px] transition-transform h-[160px] shadow-lg">
          <p className="w-full text-[#878a99] text-[18px] m-4">
            Tổng doanh thu
          </p>
          <p className="text-[24px] text-black mt-5 ml-4">
            {func.convertVND(orderStaticObj?.totalRevenue)}
          </p>
          <div className="flex items-center w-full px-4 mt-5 justify-between">
            <span className="underline cursor-pointer text-[#687cfe]">
              Xem chi tiết
            </span>
            <div></div>
          </div>
        </div>

        {/* 6 */}
        <div className="col-span-12 md:col-span-6 lg:col-span-3 bg-[#faf9f9] rounded-md hover:translate-y-[-5px] transition-transform h-[160px] shadow-lg">
          <p className="w-full text-[#878a99] text-[18px] m-4">
            Tổng tiền dịch vụ
          </p>
          <p className="text-[24px] text-black mt-5 ml-4">
            {func.convertVND(orderStaticObj?.serviceRevenue)}
          </p>
          <div className="flex items-center w-full px-4 mt-5 justify-between">
            <span className="underline cursor-pointer text-[#687cfe]">
              Xem chi tiết
            </span>
            <div></div>
          </div>
        </div>

        {/* 7 */}
        <div className="col-span-12 md:col-span-6 lg:col-span-3 bg-[#faf9f9] rounded-md hover:translate-y-[-5px] transition-transform h-[160px] shadow-lg">
          <p className="w-full text-[#878a99] text-[18px] m-4">Tổng tiền kho</p>
          <p className="text-[24px] text-black mt-5 ml-4">
            {func.convertVND(orderStaticObj?.warehouseRevenue)}
          </p>
          <div className="flex items-center w-full px-4 mt-5 justify-between">
            <span className="underline cursor-pointer text-[#687cfe]">
              Xem chi tiết
            </span>
            <div></div>
          </div>
        </div>
      </div>

      <div className=" w-full md:w-[90%] mx-auto mt-10">
        {/* <button className='btn-primary px-3 py-1 my-2' onClick={actionAdd}>Thêm</button> */}
        <MantineReactTable
          columns={columns}
          data={listOrder}
          initialState={{ columnVisibility: { id: false } }}
          enableEditing
          renderRowActions={({ row, table }) => (
            <div className="flex items-center">
              <button
                title="Cập nhật tình trạng đơn hàng"
                onClick={() => changeLoadingStatus(row)}
              >
                <GrUpdate className="text-primary text-[18px] mr-2" />
              </button>
              <button
                title="Phân công nhân viên cho kho"
                onClick={() => assignStaff(row)}
              >
                <MdOutlineAssignmentInd className="text-secondary text-[22px] ml-2" />
              </button>
              <button
                title="Gọi cho khách hàng"
                className="text-primary text-[22px] mx-3"
                onClick={() => updateCall(row)}
              >
                <BiSolidPhoneCall />
              </button>
              <button
                title="Tạo hợp đồng"
                onClick={() => {
                  setOrderIdSelected(row.getValue("id"));
                  setIsShowAddContract(true);
                }}
              >
                <FaFileContract className="text-secondary text-[22px] ml-2" />
              </button>
              {/* <button onClick={() => getDetail(row)} className=''><AiOutlineEdit className='edit-icon' /></button>
              <button onClick={() => handleDeleteRow(row)} className=''><MdDelete className='del-icon' /></button> */}
            </div>
          )}
        />
      </div>
      {isShowUpdateStatus ? (
        <div className="bg-fog-cus">
          <div className="rounded-lg bg-white p-5 w-[30%] flex flex-col items-end">
            <select
              className="block w-full mx-auto bg-gray-300 rounded-md py-2 my-2 px-1"
              onChange={(e) => setOrderStatusSelected(e.target.value)}
            >
              {listEnumOrder.map((i) => (
                <option key={i?.value} value={i?.value}>
                  {i?.display}
                </option>
              ))}
            </select>
            <input
              type="date"
              value={pickupDay}
              onChange={handleDateChange}
              className="w-full mx-auto bg-gray-300 rounded-md py-2 my-2 px-1"
            />
            <div>
              <button
                className="btn-cancel px-3 py-1 rounded-md mr-2"
                onClick={() => setIsShowUpdateStatus(false)}
              >
                Huỷ
              </button>
              <button
                className="btn-primary px-3 py-1 rounded-md"
                onClick={() => updateLoadingStatus()}
              >
                Lưu
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {isShowAssign ? (
        <div className="bg-fog-cus">
          <div className="rounded-lg bg-white p-5 w-[30%] flex flex-col items-end">
            <select className="block w-full mx-auto bg-gray-300 rounded-md py-2 my-2 px-1">
              {listStaff.map((i) => (
                <option
                  key={i?.id}
                  id={i?.value}
                  onChange={() => setStaffSelected(i?.id)}
                >
                  {i?.userName}
                </option>
              ))}
            </select>
            <div>
              <button
                className="btn-cancel px-3 py-1 rounded-md mr-2"
                onClick={() => setIsShowAssign(false)}
              >
                Huỷ
              </button>
              <button
                className="btn-primary px-3 py-1 rounded-md"
                onClick={() => actionAssignStaff()}
              >
                Lưu
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {isShowAddContract ? (
        <div className="bg-fog-cus">
          <div className="hide-scroll bg-white p-4 rounded-lg w-[95%] md:w-[70%] lg:w-[50%] max-h-[80vh] overflow-y-scroll">
            <div className="flex w-[80%] flex-col md:flex-row mx-auto my-4 md:my-2 justify-between">
              <label>File</label>
              <input
                type="file"
                onChange={(e) => setFileContract(e.target.files[0])}
              />
            </div>
            <div className="flex w-[80%] flex-col md:flex-row mx-auto my-4 md:my-2 justify-between">
              <label>Ngày bắt đầu</label>
              <input
                type="datetime-local"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
            </div>
            <div className="flex w-[80%] flex-col md:flex-row mx-auto my-4 md:my-2 justify-between">
              <label>Ngày kết thúc</label>
              <input
                type="datetime-local"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              />
            </div>
            <div className="flex w-[80%] flex-col md:flex-row mx-auto my-4 md:my-2 justify-between">
              <label>Mô tả</label>
              <Textarea
                className={` w-full md:w-[50%]`}
                rows={10}
                cols={20}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Textarea>
            </div>
            <div className="w-[80%] flex items-center mx-auto mt-3 justify-between">
              <button className="btn-cancel px-3 py-1" onClick={cancelAll}>
                Huỷ
              </button>
              <button className="btn-primary px-3 py-1" onClick={addContract}>
                Lưu
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default AdminOrder;
