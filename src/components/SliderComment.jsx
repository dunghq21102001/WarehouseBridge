import { useState } from "react";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import Rating from "./Rating";
function SliderComment({ comments }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const commentsPerPage = 2;

  const handleNext = () => {
    const newIndex = currentIndex + commentsPerPage;
    if (newIndex < comments.length) {
      setCurrentIndex(newIndex);
    } else setCurrentIndex(0);
  };

  const handlePrev = () => {
    const newIndex = currentIndex - commentsPerPage;
    if (newIndex >= 0) {
      setCurrentIndex(newIndex);
    }
  };

  const visibleComments = comments
    ? comments.slice(currentIndex, currentIndex + commentsPerPage)
    : [];

  return (
    <div className="w-full flex items-center justify-between">
      <button onClick={handlePrev}>
        <AiFillCaretLeft className="btn-secondary text-[40px]" />
      </button>
      <div className="flex justify-around items-start w-full flex-col lg:flex-row mx-2">
        {Array.isArray(visibleComments) && visibleComments.map((comment, index) => (
          <div
            key={index}
            className="w-full max-h-[250px] lg:w-[45%] bg-white px-4 py-6 my-2"
          >
            <p
              title={comment?.feedbackText}
              className="text-[#666] max-h-[145px] overflow-hidden"
            >
              {comment?.feedbackText}
            </p>
            <div className="flex items-center mt-3">
              <img
                src={
                  comment?.applicationUser?.avatar == "null"
                    ? "https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png"
                    : comment?.applicationUser?.avatar
                }
                className="w-[60px] h-[60px]"
                alt=""
              />
              <div className="ml-6">
                <p className="text-primary text-[18px] font-bold">
                  {comment?.applicationUser?.userName}
                </p>
                {/* <p className="text-[#666]">Đã trải nghiệm: <span className="font-bold">{comment?.warehouse}</span></p> */}
                <Rating
                  numberRating={Number.parseInt(comment?.rating)}
                  readOnly={true}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <button onClick={handleNext}>
        <AiFillCaretRight className="btn-secondary text-[40px]" />
      </button>
    </div>
  );
}

export default SliderComment;
