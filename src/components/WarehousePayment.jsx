import func from "../common/func"

function WarehousePayment({ wh, whDetail }) {
  return (
    <div className="w-full">
      <div className="w-[80%] mx-auto">
        <div className="w-full flex flex-col justify-between items-center rounded-lg mb-5" >
          <div className="flex flex-col items-center w-[80%]">
            <div className="w-[500px] rounded-lg h-[300px] relative">
              {/* <span className="absolute rounded-full text-center text-white top-[-10px] right-[-10px] w-[20px] bg-[#666] h-[20px] z-10">
                1
              </span> */}
              <div className="absolute top-0 left-0 overflow-hidden w-[500px] h-[300px] border-i rounded-lg">
                <img
                  className="w-full h-full object-fill"
                  src='https://www.frisbo.eu/hubfs/Warehouse%20vs.Fulfillment_ccexpress.jpeg'
                  alt=""
                />
              </div>
            </div>
            <div className="w-full flex-col md:flex-row flex items-start pt-5">
              <div className='w-full flex flex-col items-center'>
                <div className='w-full flex flex-wrap items-start'>
                  <div className="w-full md:w-[60%] h-[80px] text-center md:text-left">
                    <p
                      className="text-[18px] md:text-[24px] md:truncate-cus"
                      title={wh?.name}
                    >
                      {wh?.name}
                    </p>
                    <p
                      className="text-[#666] text-[14px] md:text-[18px] md:truncate-cus mt-2 w-full"
                      title={`${whDetail?.width} x ${whDetail?.depth} x ${whDetail?.height} ${whDetail?.unitType}`}
                    >
                      {`${whDetail?.width} x ${whDetail?.depth} x ${whDetail?.height} ${whDetail?.unitType}`}
                    </p>
                  </div>
                  <div className="text-[18px] md:text-[24px] h-[80px] w-full md:w-[40%] text-center md:text-right">
                    <p>{func.convertVND(whDetail?.warehousePrice)}</p>
                  </div>
                </div>
                <div className='w-full items-start justify-between flex mt-[30px]'>
                  <span className='text-[18px] md:text-[24px] md:truncate-cus'>Phí dịch vụ</span>
                  <span className="text-[18px] md:text-[24px] h-[80px] w-full md:w-[40%] text-center md:text-right">{func.convertVND(whDetail?.servicePrice)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WarehousePayment