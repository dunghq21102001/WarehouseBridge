import { useEffect, useMemo, useState } from "react";
import { FcMoneyTransfer } from "react-icons/fc";
import { GrGroup } from "react-icons/gr";
import { MdOutlineGroups2 } from "react-icons/md";
import { FaWarehouse } from "react-icons/fa";
import PieChart from "../../components/charts/PieChart";
import API from "../../API";
import { MantineReactTable } from "mantine-react-table";
import { useDispatch } from "react-redux";
import { changeLoadingState } from "../../reducers/SystemReducer";
import func from "../../common/func";
import BarChart from "../../components/charts/BarChart";
import LineChart from "../../components/charts/LineChart";
import { downloadExcel } from "react-export-table-to-excel";

function Dashboard() {
  const dispatch = useDispatch();
  const [deposit, setDeposit] = useState([]);
  const [WH, setWH] = useState(0);
  const [user, setUser] = useState(0);
  const [partner, setPartner] = useState(0);
  const [listCounting, setListCounting] = useState([]);
  const [listDepositTmp, setListDepositTmp] = useState([]);
  const [listTransaction, setListTransaction] = useState([]);
  const [transactionTmp, setTransactionTmp] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [listServicePayment, setListServicePayment] = useState([]);
  const [servicePaymentTmp, setServicePaymentTmp] = useState([]);
  useEffect(() => {
    fetchDeposit();
    fetchListWarehouse();
    fetchUser();
    fetchListProvider();
    fetchTransaction();
    fetchTotalRevenue();
    fetchServicePayment();
    setListCounting([
      {
        id: 1,
        name: "Doanh thu",
        number: func.convertVND(totalRevenue),
        icon: <FcMoneyTransfer className="text-[26px]" />,
      },
      {
        id: 4,
        name: "Kho",
        number: WH,
        icon: <FaWarehouse className="text-[26px] text-[#0f1728]" />,
      },
      {
        id: 2,
        name: "Khách hàng",
        number: user,
        icon: <GrGroup className="text-[26px] text-[#ff7f61]" />,
      },
      {
        id: 3,
        name: "Đối tác",
        number: partner,
        icon: <MdOutlineGroups2 className="text-[26px] text-[#efae4e]" />,
      },
    ]);
  }, [WH, user, partner]);

  const fetchServicePayment = () => {
    dispatch(changeLoadingState(true));
    API.servicePaymentAdmin()
      .then((res) => {
        dispatch(changeLoadingState(false));
        setListServicePayment(res.data);
        let tmpList = [];

        res.data.map((item) => {
          tmpList.push({
            month: item?.monthPayment,
            year: item?.yearPayment,
            servicePrice: func.convertVND(item?.servicePrice),
            warehousePrice: func.convertVND(item?.warehousePrice),
            totalPrice: func.convertVND(item?.totalPrice),
            creationDate: func.convertDate(item?.creationDate),
            deadline: func.convertDate(item?.deadline),
            paymentDate: item?.paymentDate
              ? func.convertDate(item?.paymentDate)
              : "Chưa thanh toán",
          });
        });

        setServicePaymentTmp(tmpList)
      })
      .catch((err) => dispatch(changeLoadingState(false)));
  };

  const fetchTransaction = () => {
    dispatch(changeLoadingState(true));
    API.transaction()
      .then((res) => {
        setListTransaction(res.data);
        let tmpList = [];
        res.data.map((item) => {
          tmpList.push({
            time: func.convertDate(item?.creationDate),
            name:
              item?.servicePayment?.contract?.customer?.fullname ||
              item?.servicePayment?.contract?.customer?.userName,
            price: func.convertVND(item?.amount),
            status:
              item?.status == 1
                ? "Thành công"
                : item?.status == 2
                ? "Thất bại"
                : "Đang đợi",
          });
        });

        setTransactionTmp(tmpList);
        dispatch(changeLoadingState(false));
      })
      .catch((err) => dispatch(changeLoadingState(false)));
  };

  const fetchTotalRevenue = () => {
    dispatch(changeLoadingState(true));
    API.totalRevenue()
      .then((res) => {
        setTotalRevenue(res.data);
        dispatch(changeLoadingState(false));
      })
      .catch((err) => dispatch(changeLoadingState(false)));
  };

  const fetchDeposit = () => {
    dispatch(changeLoadingState(true));
    API.deposit()
      .then((res) => {
        dispatch(changeLoadingState(false));
        let tmpList;
        if (Array.isArray(res.data)) tmpList = res.data.reverse();
        setDeposit(tmpList);
        let listExcel = [];
        res.data.map((item) => {
          listExcel.push({
            time: func.convertDate(item?.creationDate),
            name: item?.order?.customer?.fullname,
            price: func.convertVND(item?.amount),
            status: item?.status == 1 ? "Thành công" : "Thất bại",
          });
        });
        setListDepositTmp(listExcel);
      })
      .catch((err) => {
        dispatch(changeLoadingState(false));
      });
  };

  function fetchListWarehouse() {
    dispatch(changeLoadingState(true));
    API.warehousesByAdmin()
      .then((res) => {
        dispatch(changeLoadingState(false));
        setWH(res.data.length);
      })
      .catch((err) => {
        dispatch(changeLoadingState(false));
      });
  }

  const fetchUser = () => {
    dispatch(changeLoadingState(true));
    API.users()
      .then((res) => {
        setUser(res.data.length);
        dispatch(changeLoadingState(false));
      })
      .catch((er) => dispatch(changeLoadingState(false)));
  };

  function fetchListProvider() {
    dispatch(changeLoadingState(true));
    API.providers()
      .then((res) => {
        setPartner(res.data.length);
        dispatch(changeLoadingState(false));
      })
      .catch((err) => {
        dispatch(changeLoadingState(false));
      });
  }

  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        Cell: ({ cell, row }) => <div>...</div>,
      },
      {
        accessorKey: "order.customer.fullname",
        header: "Khách hàng",
      },
      {
        accessorKey: "order.customer.userName",
        header: "Tên tài khoản",
      },
      {
        accessorKey: "order.customer.email",
        header: "Email",
      },
      {
        accessorKey: "orderInfo",
        header: "Thông tin đơn hàng",
      },
      {
        accessorKey: "paymentMethod",
        header: "Phương thức thanh toán",
      },
      {
        accessorKey: "amount",
        header: "Số tiền",
        Cell: ({ cell, row }) => <div>{func.convertVND(cell.getValue())}</div>,
      },
      {
        accessorKey: "creationDate",
        header: "Ngày tạo",
        Cell: ({ cell, row }) => <div>{func.convertDate(cell.getValue())}</div>,
      },
      {
        accessorKey: "status",
        header: "Trạng thái giao dịch",
        Cell: ({ cell, row }) => (
          <div>{cell.getValue() == 1 ? "Thành công" : "Thất bại"}</div>
        ),
      },
    ],
    []
  );

  const columnsTransaction = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        Cell: ({ cell, row }) => <div>...</div>,
      },
      {
        accessorKey: "info",
        header: "Thông tin đơn hàng",
      },
      {
        accessorKey: "servicePayment.contract.customer.fullname",
        header: "Khách hàng",
      },
      {
        accessorKey: "servicePayment.contract.customer.userName",
        header: "Tên tài khoản",
      },
      {
        accessorKey: "servicePayment.contract.customer.email",
        header: "Email",
      },
      {
        accessorKey: "amount",
        header: "Số tiền",
        Cell: ({ cell, row }) => <div>{func.convertVND(cell.getValue())}</div>,
      },

      {
        accessorKey: "message",
        header: "Tin nhắn",
      },
      {
        accessorKey: "orderType",
        header: "Phương thức đặt hàng",
      },
      {
        accessorKey: "payType",
        header: "Loại tài khoản",
      },
      {
        accessorKey: "paymentMethod",
        header: "Phương thức thanh toán",
      },
      {
        accessorKey: "creationDate",
        header: "Ngày tạo",
        Cell: ({ cell, row }) => <div>{func.convertDate(cell.getValue())}</div>,
      },
      {
        accessorKey: "status",
        header: "Trạng thái",
        Cell: ({ cell, row }) => (
          <div>
            {cell.getValue() == 1
              ? "Thành công"
              : cell.getValue() == 2
              ? "Thất bại"
              : "Đang đợi"}
          </div>
        ),
      },
    ],
    []
  );

  const columnsServicePayment = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        Cell: ({ cell, row }) => <div>...</div>,
      },
      {
        accessorKey: "contract.customer.fullname",
        header: "Khách hàng",
      },
      {
        accessorKey: "contract.customer.userName",
        header: "Tên tài khoản",
      },
      {
        accessorKey: "contract.customer.email",
        header: "Email",
      },
      {
        accessorKey: "monthPayment",
        header: "Tháng",
      },
      {
        accessorKey: "yearPayment",
        header: "Năm",
      },
      {
        accessorKey: "servicePrice",
        header: "Giá dịch vụ",
        Cell: ({ cell, row }) => <div>{func.convertVND(cell.getValue())}</div>,
      },
      {
        accessorKey: "warehousePrice",
        header: "Giá kho",
        Cell: ({ cell, row }) => <div>{func.convertVND(cell.getValue())}</div>,
      },
      {
        accessorKey: "totalPrice",
        header: "Tổng tiền",
        Cell: ({ cell, row }) => <div>{func.convertVND(cell.getValue())}</div>,
      },
      {
        accessorKey: "deadline",
        header: "Hạn chót",
        Cell: ({ cell, row }) => <div>{func.convertDate(cell.getValue())}</div>,
      },
      {
        accessorKey: "paymentDate",
        header: "Ngày trả",
        Cell: ({ cell, row }) => (
          <div>
            {cell.getValue()
              ? func.convertDate(cell.getValue())
              : "Chưa thanh toán"}
          </div>
        ),
      },
    ],
    []
  );

  const header = ["time", "name", "price", "status"];
  const headerSP = [
    "month",
    "year",
    "servicePrice",
    "warehousePrice",
    "totalPrice",
    "creationDate",
    "deadline",
    "paymentDate",
  ];
  const exportExcelTransaction = () => {
    downloadExcel({
      fileName: "transaction-data",
      sheet: "transaction-data",
      tablePayload: {
        header,
        body: transactionTmp,
      },
    });
  };

  const exportExcel = () => {
    downloadExcel({
      fileName: "deposit-data",
      sheet: "deposit-data",
      tablePayload: {
        header,
        body: listDepositTmp,
      },
    });
  };

  const exportExcelSP = () => {
    downloadExcel({
      fileName: "service-payment-data",
      sheet: "service-payment-data",
      tablePayload: {
        header: headerSP,
        body: servicePaymentTmp,
      },
    });
  };

  return (
    <div className="w-[90%] mx-auto mt-[40px]">
      {/* counting */}
      <div className="grid grid-cols-12 gap-3 w-full">
        {listCounting.map((i) => (
          <div
            className="col-span-12 md:col-span-6 lg:col-span-3 bg-[#faf9f9] rounded-md hover:translate-y-[-5px] transition-transform h-[160px] shadow-lg"
            key={i.id}
          >
            <p className="w-full text-[#878a99] text-[18px] m-4">{i.name}</p>
            <p className="text-[24px] text-black mt-5 ml-4">{i.number}</p>
            <div className="flex items-center w-full px-4 mt-5 justify-between">
              <span className="underline cursor-pointer text-[#687cfe]">
                Xem chi tiết
              </span>
              {i.icon}
            </div>
          </div>
        ))}
      </div>
      {/* chart */}
      {/* <div className="w-full flex flex-col md:flex-row flex-wrap mt-10 justify-between">
        <div className="w-full md:w-[40%] rounded-md shadow-lg p-4 bg-[#faf9f9] flex items-center justify-center">
          <PieChart />
        </div>
        <div className="w-full md:w-[55%] mt-4 md:mt-0 rounded-md shadow-lg p-4 bg-[#faf9f9] flex items-center justify-center">
          <BarChart />
        </div>
        <div className="w-full mt-6 max-h-[500px] rounded-md shadow-lg p-4 bg-[#faf9f9] flex items-center justify-center">
          <LineChart />
        </div>
      </div> */}

      {/* deposit */}
      <div className="w-full mt-10">
        <span className="text-[36px] text-primary font-bold">
          Giao dịch thanh toán đơn hàng
        </span>
        <br />
        <button
          className="btn-primary px-3 py-1 rounded-lg my-2"
          onClick={exportExcel}
        >
          Xuất Excel
        </button>
        <div className="w-full mx-auto mt-2">
          <MantineReactTable
            columns={columns}
            initialState={{ columnVisibility: { id: false } }}
            data={deposit}
          />
        </div>
      </div>

      {/* transaction */}
      <div className="w-full mt-10">
        <span className="text-[36px] text-primary font-bold">
          Giao dịch thanh toán hóa đơn hàng tháng
        </span>
        <br />
        <button
          className="btn-primary px-3 py-1 rounded-lg my-2"
          onClick={exportExcelTransaction}
        >
          Xuất Excel
        </button>
        <div className="w-full mx-auto mt-2">
          <MantineReactTable
            columns={columnsTransaction}
            initialState={{ columnVisibility: { id: false } }}
            data={listTransaction}
          />
        </div>
      </div>

      {/* service payment */}
      <div className="w-full mt-10">
        <span className="text-[36px] text-primary font-bold">
          Quản lý hóa đơn hàng tháng
        </span>
        <br />
        <button
          className="btn-primary px-3 py-1 rounded-lg my-2"
          onClick={exportExcelSP}
        >
          Xuất Excel
        </button>
        <div className="w-full mx-auto mt-2">
          <MantineReactTable
            columns={columnsServicePayment}
            initialState={{ columnVisibility: { id: false } }}
            data={listServicePayment}
          />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
