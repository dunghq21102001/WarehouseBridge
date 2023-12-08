import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import noti from "../common/noti";
import func from "../common/func";
import API from "../API";
import { useNavigate, useParams } from "react-router-dom";
import { changeLoadingState } from "../reducers/SystemReducer";
function NewDetail() {
  const [detail, setDetail] = useState({});
  const { id } = useParams();
  const navigator = useNavigate()
  const dispatch = useDispatch();
  useEffect(() => {
    fetchDetail();
  }, [id]);

  const fetchDetail = () => {
    dispatch(changeLoadingState(true));
    API.getPostById(id)
      .then((res) => {
        dispatch(changeLoadingState(false));
        setDetail(res.data);
      })
      .catch((err) => {
        dispatch(changeLoadingState(false));
        navigator("/news");

      });
  };
  return (
    <div className="w-full">
      <div className="w-full">
        <p className="text-[40px] text-center text-gray-400">{detail?.name}</p>
        <div className="w-full md:w-[350px] justify-between flex-wrap flex items-center mx-auto">
          <p>Tác giả: {detail?.fullnameAuthor}</p>
          <p>Ngày tạo: {func.convertDate(detail?.creationDate)}</p>
        </div>
        <div className="w-full">
          <img
            src={detail?.image}
            alt=""
            className="w-full my-3 md:w-[70%] mx-auto"
          />
          <p className="w-[90%] mx-auto text-[24px]">
            {detail?.shortDescription}
          </p>
          <p className="w-[90%] mx-auto text-[20px] mb-5">
            {detail?.description}
          </p>
          {/* <div className="w-[90%] md:w-[60%] mx-auto flex justify-end my-3">
            <button className="btn-secondary px-3 py-1 rounded-md">
              Quay lại
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default NewDetail;
