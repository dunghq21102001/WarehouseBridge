import { useEffect, useMemo, useState } from "react";
import { MantineReactTable } from "mantine-react-table";
import API from "../../API";
import noti from "../../common/noti";
import { useDispatch } from "react-redux";
import { changeLoadingState } from "../../reducers/SystemReducer";
import FormBase from "../../components/FormBase";
import FormUpdate from "../../components/FormUpdate";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { AiOutlineEdit, AiOutlineCloseSquare } from "react-icons/ai";
import { MdDelete, MdMoveToInbox } from "react-icons/md";
import { BiDetail } from "react-icons/bi";
import { storage } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import SubWHPage from "./SubWHPage";
import SubScreenGood from "../../components/SubScreenGood";

function AdminRentWH() {
  const dispatch = useDispatch();
  const [rentWH, setRentWH] = useState([]);
  const [isShowAddGood, setIsShowAddGood] = useState(false);
  const [rentWHId, setRentWHId] = useState("");
  const [formDataGood, setFormDataGood] = useState([
    { name: "Tên", binding: "goodName", type: "input" },
    { name: "Số lượng", binding: "quantity", type: "input" },
    { name: "Mô tả", binding: "description", type: "input" },
    { name: "Hình ảnh", binding: "image", type: "file" },
  ]);

  const [isShowGood, setIsShowGood] = useState(false);
  const [rentWHByShowGood, setRentWHByShowGood] = useState("");

  useEffect(() => {
    fetchRentWH();
  }, []);

  const fetchRentWH = () => {
    dispatch(changeLoadingState(true));

    API.rentWareHouseAdmin()
      .then((res) => {
        setRentWH(res.data);
        dispatch(changeLoadingState(false));
      })
      .catch((err) => {
        dispatch(changeLoadingState(false));
      });
  };

  const handleCancel = () => {
    setIsShowAddGood(false);
    setRentWHId("");
  };

  const addGood = (data) => {
    setIsShowAddGood(true);
    setRentWHId(data.getValue("id"));
  };

  const columnsRentWH = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        Cell: ({ cell, row }) => <div>...</div>,
      },
      {
        accessorKey: "information",
        header: "Thông tin kho",
      },
      {
        accessorKey: "rentStatus",
        header: "Trạng thái thuê",
        Cell: ({ cell, row }) => (
          <div>{cell.getValue() == 1 ? "Đang thuê" : "Hết hạn"}</div>
        ),
      },
    ],
    []
  );

  const handleAddGood = async (data) => {
    const images = data.images;
    if (images.length != 0) {
      dispatch(changeLoadingState(true));
      try {
        const imageUrls = await Promise.all(
          images.map(async (image) => {
            const imageName = `${new Date().getTime()}_${image.name}`;
            const imageRef = ref(storage, `images/${imageName}`);
            await uploadBytes(imageRef, image);
            const imageUrl = await getDownloadURL(imageRef);
            return imageUrl;
          })
        );

        const finalData = {
          goodCreateModel: {
            rentWarehouseId: rentWHId,
            goodName: data.goodName,
            quantity: data.quantity,
            goodUnit: 1,
            description: data.description,
          },
          images: imageUrls,
        };

        API.addGood(finalData)
          .then((res) => {
            handleCancel();
            noti.success(res.data);
            fetchRentWH()
          })
          .catch((err) => {
            noti.error(err.response?.data);
          });
        dispatch(changeLoadingState(false));
      } catch (error) {
        console.log("Lỗi khi tải lên ảnh" + error, 3000);
      }
    } else noti.error("Bạn phải thêm ít nhất 1 ảnh để tạo hàng hoá!", 2500);
  };

  return (
    <div className="w-full">
      <div className=" w-full md:w-[90%] mx-auto mt-10">
        <MantineReactTable
          columns={columnsRentWH}
          data={rentWH}
          initialState={{ columnVisibility: { id: false } }}
          enableEditing
          renderRowActions={({ row, table }) => (
            <div className="flex items-center">
              <button onClick={() => addGood(row)} className="mr-3">
                <MdMoveToInbox className="text-[24px] text-primary" />
              </button>
              <button
                onClick={() => {
                  setIsShowGood(true);
                  setRentWHByShowGood(row.getValue("id"));
                }}
              >
                <IoIosInformationCircleOutline className="text-[24px] text-secondary" />
              </button>
            </div>
          )}
        />
      </div>

      {isShowAddGood ? (
        <FormBase
          title={formDataGood}
          onSubmit={handleAddGood}
          buttonName={"Thêm mới"}
          onCancel={handleCancel}
          totalImage={1}
        />
      ) : (
        ""
      )}

      {isShowGood ? <SubScreenGood setIsShowGood={setIsShowGood} rentID={rentWHByShowGood} /> : null}
    </div>
  );
}

export default AdminRentWH;
