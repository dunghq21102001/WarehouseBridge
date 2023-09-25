import { useNavigate } from 'react-router-dom'
import '../css/Partner.css'
import { BiLogoFacebook, BiLogoInstagramAlt, BiLogoTwitter } from 'react-icons/bi'
function Partner() {

    const navigate = useNavigate()
    const listPartner = [
        {
            name: 'YERIOADS',
            description: 'This is basic card with image on top, title, description and button.',
            img: 'https://img.freepik.com/premium-vector/world-logistic-company-logo-vector-design-transport-logistic-logo_518759-206.jpg?w=2000'
        },
        {
            name: 'Logistic Express',
            description: 'This is basic card with image on top, title, description and button.',
            img: 'https://t4.ftcdn.net/jpg/02/04/50/03/360_F_204500351_3yjXe5AipM4OKQMZzQJGwG81NMVKGyy9.jpg'
        },
        {
            name: 'Mohamed',
            description: 'This is basic card with image on top, title, description and button.',
            img: 'https://bcassetcdn.com/public/blog/wp-content/uploads/2019/06/18095407/time-freight.jpg'
        },
    ]


    const changeRoute = (name) => {
        navigate(`/profile/${name}`)
    }


    return (
        <div className="w-full bg-[#eeeeee] min-h-screen pt-10">
            <div className='w-[80%] mx-auto grid grid-cols-12 gap-3'>
                {listPartner.map(item => (
                    <div key={item.name} className='col-span-12 md:col-span-6 lg:col-span-4 bg-white'>
                        <div className="myCard w-full h-[360px] bg-white">
                            <div className="innerCard">
                                <div className="frontSide">
                                    <div className='w-full h-[200px] overflow-hidden'>
                                        <img src={item.img} className='w-full' alt="" />
                                    </div>
                                    <p className='text-primary text-[20px] mt-5'>
                                        {item.name}
                                    </p>
                                    <p className='text-[#666] text-[14px]'>{item.description}</p>
                                </div>
                                <div className="backSide">
                                    <p className='text-primary text-[20px] mt-10'>
                                        {item.name}
                                    </p>
                                    <p className='text-[#666] text-[14px]'>{item.description}</p>
                                    <div className='flex w-[80%] mx-auto items-center justify-around mt-10'>
                                        <BiLogoFacebook className='icon' />
                                        <BiLogoTwitter className='icon' />
                                        <BiLogoInstagramAlt className='icon' />
                                    </div>
                                    <button onClick={() => changeRoute(item.name)} className='btn-primary w-[80%] mt-10 py-2'>Xem thông tin</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Partner