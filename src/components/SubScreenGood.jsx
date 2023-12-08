import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { changeLoadingState } from "../reducers/SystemReducer";
import API from "../API";
import { AiOutlineCloseSquare } from "react-icons/ai";
import { MantineReactTable } from "mantine-react-table";
import { MdDelete } from "react-icons/md";
import noti from "../common/noti";
import { confirmAlert } from "react-confirm-alert";

function SubScreenGood({ rentID, setIsShowGood }) {
  const dispatch = useDispatch();
  const [showListGood, setShowListGood] = useState([]);

  useEffect(() => {
    fetchGoodByRentID();
  }, [rentID]);

  const fetchGoodByRentID = () => {
    dispatch(changeLoadingState(true));
    API.getGoodsById(rentID)
      .then((res) => {
        dispatch(changeLoadingState(false));
        setShowListGood(res.data);
      })
      .catch((err) => dispatch(changeLoadingState(false)));
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        Cell: ({ cell, row }) => <div>...</div>,
      },
      {
        accessorKey: "rentWarehouseId",
        header: "rent ID",
        Cell: ({ cell, row }) => <div>...</div>,
      },
      {
        accessorKey: "goodName",
        header: "Tên hàng hoá",
      },
      {
        accessorKey: "goodUnit",
        header: "Đơn vị",
      },
      {
        accessorKey: "quantity",
        header: "Số lượng",
      },
      {
        accessorKey: "description",
        header: "Mô tả",
        size: 300,
      },
      {
        accessorKey: "goodImages",
        header: "Hình ảnh",
        Cell: ({ cell, row }) => (
          <div>
            <img src={cell.getValue()[0]?.imageUrl} alt="image good" />
          </div>
        ),
      },
    ],
    []
  );

  const handleCancel = () => {
    setIsShowGood(false);
  };

  const handleDeleteRow = (row) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="bg-[#f7f7f7] rounded-md p-4 shadow-md">
            <p className="text-[24px]">
              Bạn có chắc chắn muốn xoá món hàng hoá này không?
            </p>
            <div className="w-full flex justify-end mt-3">
              <button
                className="px-3 py-1 mr-2 rounded-md btn-cancel"
                onClick={onClose}
              >
                Huỷ
              </button>
              <button
                className="px-3 py-1 rounded-md btn-primary"
                onClick={() => {
                  deletePost(
                    row.getValue("id"),
                    row.getValue("rentWarehouseId")
                  );
                  onClose();
                }}
              >
                Xoá
              </button>
            </div>
          </div>
        );
      },
    });
  };

  const deletePost = (id, rentWHID) => {
    API.deleteGood(rentWHID, id)
      .then((res) => {
        fetchGoodByRentID();
        noti.success("Xoá thành công");
      })
      .catch((err) => {
        noti.error("Có lỗi xảy ra, vui lòng thử lại");
      });
  };
  return (
    <div className="w-full bg-fog-cus">
      <div className=" w-full md:w-[90%] mx-auto bg-white relative">
        <button className="absolute top-5 right-5">
          <AiOutlineCloseSquare
            onClick={handleCancel}
            className="text-[24px] text-primary"
          />
        </button>
        <div className="w-full max-h-[600px] overflow-y-scroll mt-14">
          <MantineReactTable
            columns={columns}
            data={showListGood}
            initialState={{
              columnVisibility: { id: false, rentWarehouseId: false },
            }}
            enableEditing
            renderRowActions={({ row, table }) => (
              <div className="flex items-center">
                <button onClick={() => handleDeleteRow(row)} className="">
                  <MdDelete className="del-icon" />
                </button>
              </div>
            )}
          />
        </div>
      </div>
    </div>
  );
}

export default SubScreenGood;
